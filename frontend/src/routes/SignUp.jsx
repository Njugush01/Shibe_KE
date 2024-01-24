
import { Link } from "react-router-dom"

function SignUp () {
    const onSubmit = (ev) =>{
        ev.preventDefault()
    }

  return (
    <div className="login-signup-form animated fadeindown">
    <div className="form">
        <form onSubmit={onSubmit}>
            <h1 className="title">
                SignUp for free
            </h1>
            <input placeholder="Full Name"/>
            <input type="email" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
            <input type="password" placeholder="Confirm Password"/>
            <button className="btn btn-block">SignUp</button>
            <p className="message">
                Already Registered? <Link to="/guest/signin">SignIn</Link>
            </p>
        </form>
    </div>
</div>
  )
}

export default SignUp;
