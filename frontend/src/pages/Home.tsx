import  Testimonials  from "@/components/Home/Testimonials";
import Hero from "@/components/Home/Hero";
import Courses from "@/components/Home/Courses";
import AboutUs from "@/components/Home/AboutUs";
import OutTeam from "@/components/Home/OutTeam";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero/>
      <AboutUs/>
      <OutTeam/>
      <Courses/>
      <Testimonials />
    </div>
  );
};

export default Home;
