//import "./RegisterStyles.css"
import { Link } from "react-router-dom"

function Register (){

    const onSubmit = (ev) =>{
        ev.preventDefault()
    }


return (

    <div className="login-signup-form animated fadeindown">
        <div className="form">
            <form onSubmit={onSubmit}>
                <h1 className="title">
                    Login into your account
                </h1>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <button className="btn btn-block">Login</button>
                <p className="message">
                    Not Registered? <Link to="/guest/signup">Create an account</Link>
                </p>
            </form>
        </div>
      
    </div>
  )
}

export default Register;