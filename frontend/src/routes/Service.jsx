import Navbar from "../components/Navbar"
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Serviceimg from "../assets/volunteer.jpg";
import Help from "../components/Help";

function Service(){
    return(
        <>
        <Navbar/>
        <Hero
        cName="hero-mid"
        heroImg={Serviceimg}
        title="Service"
        btnClass="hide"      
        />
        <Help/>
        <Footer/>
        </>
    )
}

export default Service;