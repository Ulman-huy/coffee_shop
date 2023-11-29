import News from "./News";
import Advantages from "./Advantages";
import ProductSuggest from "./ProductSuggest";
import Reviews from "./Reviews";
import Slider from "./Slider";
import Trademark from "./Trademark";

function Home() {
  return (
    <div className="min-h-screen">
      <Slider />
      <Trademark />
      <Advantages />
      <ProductSuggest />
      <Reviews />
      <News />
    </div>
  );
}

export default Home;
