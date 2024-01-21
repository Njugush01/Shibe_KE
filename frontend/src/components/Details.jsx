import "./DetailsStyles.css";
import DetailsData from "./DetailsData";
import Detail1 from "../assets/woman.jpg"
import Detail2 from "../assets/Storage.jpg"
import Detail3 from "../assets/empower.jpg"


function Details(){
    return(
        <div className="details">
            <h1>Empowering Lives with Compassion and Dignity</h1>
            <p>Your contribution matters—make a difference in someone's life today</p>
            <div className="detailcard">
                <DetailsData
                image={Detail1}
                heading="Food Donations"
                text="By converting tons of donations into meaningful moments, Food Link Kenya utilizes the strength of everyone pitching in. Quickly changing the generosity of restaurants and supermarkets into food for those who need it, we create a positive impact in the community."
                />

                <DetailsData
                image={Detail3}
                heading="Community Empowerment"
                text="Community Empowerment is at the heart of our mission. We believe in fostering self-reliance and collaboration within neighborhoods. Through educational initiatives, skill-building programs, and local partnerships, we empower individuals to contribute actively to their communities. Join us in creating a stronger, more resilient society where everyone has the opportunity to thrive."
                />

                <DetailsData
                image={Detail2}
                heading="Infrastructural Development"
                text="Infrastructural Development is a cornerstone of our commitment to efficient food distribution. We prioritize building essential infrastructure, including state-of-the-art cold rooms for storage. These facilities ensure that donated food remains fresh and reaches those in need promptly. By investing in robust infrastructure, we enhance our capacity to make a lasting impact on food security in communities."
                />
            </div>
        </div>
    )
}

export default Details;