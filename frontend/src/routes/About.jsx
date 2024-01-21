import Navbar from "../components/Navbar"
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";
import Aboutimg from "../assets/about.jpg"
function About(){
    return(
        <>
        <Navbar/>
        <Hero
        cName="hero-mid"
        heroImg={Aboutimg}
        title="#KnowUs"
        text="Eradicating Hunger, Empowering Lives"
        btnClass="hide"      
        />
        <AboutUs/>
        <Footer/>
        </>
    )
}

export default About;