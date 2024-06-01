import { getProductById, getSimilarProducts } from "@/lib/actions";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatNumber } from "@/lib/utils";
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import Modal from "@/components/Modal";

type Props = {
  params: { id: string };
};

const ProductDetails = async ({ params: { id } }: Props) => {
  const product: Product = await getProductById(id);

  if (!product) redirect("/");

  const similarProducts = await getSimilarProducts(id);

  return (
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.title}
            width={580}
            height={400}
            className="mx-auto"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-black font-semibold">
                {product.title}
              </p>

              <Link
                href={product.url}
                target="_blank"
                className="text-base text-black opacity-50"
              >
                {" "}
                Amazon Link{" "}
              </Link>
            </div>

            {/* for emojis of heart and other stuffs */}
            <div className="flex items-center gap-3">
              {/* div for heart emoji */}
              <div className="product-hearts">
                <Image
                  src={"/assets/icons/red-heart.svg"}
                  alt={"heart"}
                  width={20}
                  height={20}
                />
                <p className="text-base font-semibold text-[#D46F77]">
                  {product.reviewsCount}
                </p>
              </div>

              {/* div for bookmark emoji */}
              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src={"/assets/icons/bookmark.svg"}
                  alt="bookmark"
                  height={20}
                  width={20}
                />
              </div>

              {/* div for share emoji */}
              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src={"/assets/icons/share.svg"}
                  alt="share"
                  height={20}
                  width={20}
                />
              </div>
            </div>
          </div>
          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-[23px] font-semibold">
                {product.currency} {formatNumber(product.currentPrice)}
              </p>
              <p className="text-[15px] opacity-75 line-through">
                {product.currency} {formatNumber(product.originalPrice)}
              </p>
            </div>

            {/* giving star/ reviews */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="product-stars">
                  <Image
                    src={"/assets/icons/star.svg"}
                    alt="ratings"
                    height={16}
                    width={16}
                  />
                  <p className="text-sm font-semibold text-[#D46F77]">
                    {product.stars || 35}
                  </p>
                </div>

                {/* product review */}
                <div className="product-reviews">
                  <Image
                    src={"/assets/icons/comment.svg"}
                    alt="comment"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm font-semibold">
                    {product.reviewsCount} Reviews
                  </p>
                </div>
              </div>

              <p className="text-sm opacity-50">
                <span className="text-primary font-semibold">83%</span> of
                buyers recommend this.
              </p>
            </div>
          </div>
          {/* Price cards */}
          <div className="my-7 flex flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <PriceInfoCard
                title="Current Price"
                iconSrc="/assets/icons/price-tag.svg"
                value={`${product.currency} ${formatNumber(
                  product.currentPrice
                )}`}
                borderColor="#b6dbff"
              />

              <PriceInfoCard
                title="Average Price"
                iconSrc="/assets/icons/chart.svg"
                value={`${product.currency} ${formatNumber(
                  product.averagePrice
                )}`}
                borderColor="#b6dbff"
              />

              <PriceInfoCard
                title="Highest Price"
                iconSrc="/assets/icons/arrow-up.svg"
                value={`${product.currency} ${formatNumber(product.originalPrice) }`}
                borderColor="#b6dbff"
              />

              <PriceInfoCard
                title="Lowest Price"
                iconSrc="/assets/icons/arrow-down.svg"
                value={`${product.currency} ${formatNumber(
                  product.lowestPrice
                )}`}
                borderColor="#b6dbff"
              />
            </div>
          </div>


          <Modal productId={id}/>


        </div>


      </div>

      {/* description and details */}
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-semibold">Product Description</h2>

          <div className="flex flex-col gap-4">
            {product?.description?.split("\n")}
          </div>
        </div>

        <button className="btn w-fit mx-auto flex items-center justify-center gap-3 mmin-w-[200px]">
          <Image
            src={"/assets/icons/bag.svg"}
            alt="check"
            width={25}
            height={27}
          />

          <Link href={"/"} className="text-base text-white">
            Buy Now
          </Link>
        </button>
      </div>

      {/*Simmilar products  */}

      {similarProducts && similarProducts?.length > 0 && (
        <div className="py-14 flex flex-col gap-2 w-full">
          <p className="section-text"> Similar Products </p>
          <div className="flex flex-wrap gap-10 mt-7 w-full">
            {similarProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
