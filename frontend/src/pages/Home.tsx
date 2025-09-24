import  Testimonials  from "@/components/Home/Testimonials";
import Hero from "@/components/Home/Hero";
import Courses from "@/components/Home/Courses";
import AboutUs from "@/components/Home/AboutUs";
import OutTeam from "@/components/Home/OutTeam";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <Hero/>
      <AboutUs/>
      <OutTeam/>
      <Courses/>
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
