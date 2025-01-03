
import FeaturedRoom from '@/app/components/FeaturedRoom/FeaturedRoom';
import HeroSection from '@/app/components/HeroSection/HeroSection';
import NewsLetter from '@/app/components/NewLetter/NewLetter';
import PageSearch from '@/app/components/PageSearch/PageSearch';
import Gallery from '@/app/components/Gallery/Gallery';
import { getFeaturedRoom } from '@/libs/apis';


const Home = async () => {
  const featuredRoom = await getFeaturedRoom();


  return (
    <>
      <HeroSection />
      <PageSearch />
      <FeaturedRoom featuredRoom={featuredRoom} />
      <NewsLetter />
      <Gallery />
    </>
  );
};

export default Home;
