import HeroCarousel from "@/components/HeroCarousel";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";

// THis is Primary home Component
const Home = () => {
  return (
    <>
      <section className="px-6 md:px-28 py-24">
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
              Powerful, self-server product and growth analytics to help you
              convert, engage, and retain more.
            </p>
            <SearchBar/>
          </div>
          <HeroCarousel/>
        </div>
      </section>
      <section className="trending-section">
        <h2 className="section-text"> Trending </h2>
        <div className="flex flex-wrap gap-x-8 gay-y-16">
          {
           ['Apple IPhone 15', 'Book', 'Sneakers'].map((product) =>(
            <div>
              {product}
            </div>
           )) 
          }

        </div>
      </section>
    </>
  );
};

export default Home;
