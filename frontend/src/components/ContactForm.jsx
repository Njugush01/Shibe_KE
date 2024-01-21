import "./ContactFormStyles.css"

function ContactForm(){
    return(
        <div className="form-container"> 
            <span>GET IN TOUCH</span>
            <h2>Visit one of our agency locations or contact us today</h2>
            <form>
                <input placeholder="Your Name"/>
                <input placeholder="Email"/>
                <input placeholder="Subject"/>
                <textarea placeholder="Message" rows="10"></textarea>
                <button>Submit</button>
            </form>   
        </div>

        
        
        
        
    )
}

export default ContactForm;