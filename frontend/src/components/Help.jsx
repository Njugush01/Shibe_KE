import "./HelpStyles.css";
import HelpData from "./HelpData";
import Help1 from "../assets/1.jpg"
import Help2 from "../assets/2.jpg"
import Help3 from "../assets/3.jpg"


function Help(){
    return(
        <div className="details">
            <h1>Meet Our Volunteer Team</h1>
            <div className="detailcard">
                <HelpData
                image={Help1}
                heading="Jack - Community Advocate"
                text="Jack, our passionate community advocate, tirelessly connects with local residents, ensuring their needs are heard and addressed. With a heart for service, he plays a vital role in bridging the gap between surplus food providers and those in need, making our mission a community-driven success."
                />
                <HelpData
                image={Help3}
                heading="Alex - Logistics Enthusiast"
                text="Meet Alex, our dedicated logistics enthusiast who ensures the smooth flow of surplus food from donors to distribution centers. With a keen eye for efficiency, Alex plays a crucial role in optimizing our operations, making sure no edible resource goes to waste on its journey to those facing food insecurity."
                />

                <HelpData
                image={Help2}
                heading="Emily - Outreach Coordinator"
                text="As our outreach coordinator, Emily is the friendly face connecting Food Link Kenya with potential partners, donors, and the broader community. Her excellent communication skills and genuine passion for our mission help us expand our network, fostering new relationships that contribute to a stronger, more resilient food distribution system."
                />
            </div>
        </div>
    )
}

export default Help;