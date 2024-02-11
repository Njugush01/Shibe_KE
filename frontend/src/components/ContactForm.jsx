import "./ContactFormStyles.css"

function ContactForm(){
    return(
        <div className="form-container"> 
            <div className="text-center">
                <span>GET IN TOUCH</span>
                <h2 className="font-bold text-2xl">Visit one of our agency locations or contact us today</h2>
            </div>
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