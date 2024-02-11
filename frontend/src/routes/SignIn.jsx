import Navbar from "../components/Navbar";
import Login from "../components/Login";
import Loginimg from "../assets/login.jpg";
import Hero from "../components/Hero";


function SignIn (){
    return(
        <>
         <Navbar/>
         <Login/>
         {/* <Hero
         cName="hero"
         heroImg={Loginimg}
        /> */}
       
         
         
        </>
    )
}

export default SignIn;