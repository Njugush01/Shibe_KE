import Navbar from "../components/Navbar"
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Contactimg from "../assets/4.jpg"
import ContactForm from "../components/ContactForm";


function Contact(){
    return(
        <>
        <Navbar/>
        <Hero
        cName="hero-mid"
        heroImg={Contactimg}
        title="#let's_talk"
        text="LEAVE A MESSAGE, We love to hear from you!"
        btnClass="hide"      
        />
        <ContactForm/>
        <Footer/>
        </>
    )
}

export default Contact;