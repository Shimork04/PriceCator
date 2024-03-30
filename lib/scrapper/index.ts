import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractPrice } from "./utils";

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;

  //brightdata proxy configuration
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (100000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superprozy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    //Fetch the product page
    const response = await axios.get(url, options);
    // console.log(response.data);
    const $ = cheerio.load(response.data);

    //Extract product title
    const title = $("#productTitle").text().trim();

    //it maybe discounted or not
    const currentPrice = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $("a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base"),
      $(".a-price.a-text-price")
    );

    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealPrice"),
      $(".a-size-base.a-color-price")
    );

    const outOfStock =
      $("#availability span").text().trim().toLowerCase() ===
      "currently unavailable";

    const productImages =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "{}";

    // parsing product iamges
    const imageUrls = Object.keys(JSON.parse(productImages));

    //extracting currencies
    const currency = extractCurrency($(".a-price-symbol"));
    const discountRate = $(".savingsPercentage").text().replace(/[-%]/g, "");

    // console.log({
    //   title,
    //   currentPrice,
    //   originalPrice,
    //   outOfStock,
    //   imageUrls,
    //   currency
    // });

    //construct data object with scrapped information
    const data = {
      url,
      currency: currency ||
       '$',
      currentPrice: Number(currentPrice),
      originalPrice: Number(originalPrice),
      status: outOfStock ? "unavailable" : "in-stock",
      image: imageUrls[0],
      savings: discountRate,
    };
  } catch (error: any) {
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}
