import "./FooterStyles.css"

const Footer = () =>{
    return(
        <div className="footer">
            <div className="top">
                <div>
                    <h1>Food Link</h1>
                    <p>Nurturing Lives with Kindness and Honor</p>
                </div>
                <div>
                    <a href="/">
                        <i className="fa-brands fa-facebook-square"></i>
                    </a>

                    <a href="/">
                        <i className="fa-brands fa-instagram-square"></i>
                    </a>

                    <a href="/">
                        <i className="fa-brands fa-twitter-square"></i>
                    </a>

                    <a href="/">
                        <i className="fa-brands fa-youtube-square"></i>
                    </a>
                </div>
            </div>

            <div className="bottom">
                <div>
                    <h4>About</h4>
                    <a href="/">About Us</a>
                    <a href="/">Delivery Information</a>
                    <a href="/">Privacy Policy</a>
                    <a href="/">Terms & Conditions</a>
                    <a href="/">Contact Us</a>
                </div>
                <div>
                    <h4>Get Involved</h4>
                    <a href="/">Donate</a>
                    <a href="/">Food Drives</a>
                    <a href="/">Volunteer</a>
                    <a href="/">Training & Empowerment</a>
                </div>
                <div>
                    <h4>Programs</h4>
                    <a href="/">School Feeding Programs</a>
                    <a href="/">Farmers' Support Initiative</a>
                    <a href="/">Food Redistribution Partnership</a>
                    <a href="/">Emergency Food Relief Response</a>
                    <a href="/">Community Nutrition Workshops</a>
                </div>
                <div>
                    <h4>Contact</h4>
                    <p><strong>Address: </strong> 9th Floor, Fortis Tower, Woodvale Grove, Nairobi, Kenya</p>
                    <p><strong>Phone:</strong> +254 721 298 631/ +254 725 406 694</p>
                    <p><strong>Hours:</strong> 10:00 - 17:30, Mon - Sat</p>
                </div>
                <div className="copyright">
                <p>© 2024 by Foodlink KE</p>
            </div>
            </div>
        </div>
    )
}

export default Footer;