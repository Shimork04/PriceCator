"use server";
import { scrapeAmazonProduct } from "../scrapper";

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) {
    console.log("Some error in Product Url");
    return;
  }

  try {
    const scrapedProduct = await scrapeAmazonProduct(productUrl);

  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`);
  }
}
