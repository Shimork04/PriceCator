import HeroCarousel from "@/components/HeroCarousel";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import { getAllProducts } from "@/lib/actions";
import ProductCard from "@/components/ProductCard";

// THis is Primary home Component
const Home = async() => {
const allProducts = await getAllProducts();


  return (
    <>
      <section className="px-6 md:px-28 py-20">
        {/* border-2 border-purple-500 */}
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart shopping starts here.
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-img"
                width={16}
                height={16}
              />
            </p>
            <h1 className="head-text">
              Unleash the power of{" "}
              <span className="text-primary"> PriceCator</span>
            </h1>
            <p className="mt-6">
              Price-Cator is a powerful Amazon ecommerce scrapper tool, that lets you track the price of your favourite purchase and you can get notified when the price hits your set target. 
            </p>
            <SearchBar/>
            {/* <a href="#trending-section" className="text-black text-lg font-30">Recent Searches</a> */}
          </div>
          <HeroCarousel/>
        </div>
      </section>
      <section className="trending-section ">
        <h1 className="text-[32px] font-bold text-primary"> Recent Searches </h1>


        <div className="flex flex-wrap gap-x-8 gay-y-16">
          {allProducts?.map((product) =>(
            <ProductCard key={product._id} product={product}/>
            
           ))}

        </div>
      </section>
    </>
  );
};

export default Home;
