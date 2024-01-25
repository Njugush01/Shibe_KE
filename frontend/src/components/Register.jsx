//import "./RegisterStyles.css"
import { Link } from "react-router-dom"
import { useRef, useState } from "react"
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

function Register (){
    const emailRef = useRef();
    const passwordRef = useRef();

    const [errors, setErrors] = useState(null)

    const {setUser, setToken} = useStateContext()

    const onSubmit = (ev) =>{
        ev.preventDefault()
        const payload = {
            email:emailRef.current.value,
            password:passwordRef.current.value,
        }
    
        axiosClient.post("/guest/signin", payload)  //making request to the server
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token)   //whenever token information is available the app will rerender and user directed to dashboard
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        console.log(response.data.errors);
                        setErrors(response.data.errors)
                    } else{
                        setErrors({email:[response.data.message]})
                    }
                    setErrors(response.data.errors)
                }
            })
    }


return (

    <div className="login-signup-form animated fadeindown">
        <div className="form">
            <form onSubmit={onSubmit}>
                <h1 className="title">
                    Login into your account
                </h1>
                {
                errors && <div className="alert">
                    {Object.keys(errors).map(key=>(
                        <p key={key} >{errors[key][0]}</p>
                    ))}
                </div>
                }

                
                <input ref={emailRef} type="email" placeholder="Email"/>
                <input ref={passwordRef} type="password" placeholder="Password"/>
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