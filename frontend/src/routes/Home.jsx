import Navbar from "../components/Navbar"
import Hero from "../components/Hero";
import Causes from "../components/Causes"
import Details from "../components/Details";
import Footer from "../components/Footer";
function Home(){
    return(
        <>
        <Navbar/>
        <Hero
        cName="hero"
        heroImg="https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Nourishing Communities, One Donation at a Time"
        text="Transform excess into empathy, building a stronger community."  
        buttonText="Donate"
        url="/guest/signup"
        btnClass="show"    
        additionalButton={{
            buttonText: "Become a volunteer",
            url: "/guest/signup",
            btnClass: "bg-white hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border  rounded"
        }}       
        />
        
        <Causes/>
        <Details/>
        <Footer/>
        </>
    )
}

export default Home;