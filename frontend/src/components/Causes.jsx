import CausesData from "./CausesData";
import "./CausesStyles.css"
import Hand from "../assets/Hand.jpg"
import Donation1 from "../assets/Donation1.jpg"
import Donation2 from "../assets/Donation2.jpg"
import kids from "../assets/kids.jpg"

const Causes = () =>{
    return(
        <div className="causes">
            <h1>Why We Exist</h1>
            <p>Connecting surplus food providers with those in need effortlessly.</p>

            <CausesData
            className="first-des"

            heading= "Turning Surplus into Support"
            text= "At Food Link Kenya, we believe every little bite matters. Our mission is all about turning surplus into sustenance, making sure no one goes hungry while good food goes to waste. With a wide-reaching network connecting farms, retailers, individuals, and businesses, we're actively reducing food loss and waste, one meal at a time. Join a movement that positively impacts the lives of food-insecure individuals across Kenya, from children to the elderly. Be a part of the change—whether through donations, volunteering, or both—and let's come together to fill every bowl, working towards a future where everyone has enough to eat."
            img1={Hand}
            img2={Donation1}
            />
             <CausesData
             className="first-des-reverse"

            heading= "Empowering Programs"
            text= "At Food Link Kenya, we’ve curated a suite of impactful programs tailored to address food insecurity at its root. From tapping into the heart of agriculture to emergency outreach, our initiatives span the entire food journey. Discover how we’re reviving agriculture, driving community participation, feeding our future generations, and extending a hand during crises. Dive in, and see how you can be a part of this transformative mission."
            img1={Donation2}
            img2={kids}
            />

        </div>
    )
}

export default Causes;