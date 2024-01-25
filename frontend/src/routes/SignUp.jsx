import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

function SignUp () {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const [errors, setErrors] = useState(null)

    const {setUser, setToken} = useStateContext()
    


    const onSubmit = (ev) =>{
        ev.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }

        axiosClient.post("/guest/signup", payload)  //making request to the server
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token)   //whenever token information is available the app will rerender and user directed to dashboard
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors)
                }
            })
    }

  return (
    <div className="login-signup-form animated fadeindown">
    <div className="form">
        <form onSubmit={onSubmit}>
            <h1 className="title">
                SignUp for free
            </h1>
            {
                errors && <div className="alert">
                    {Object.keys(errors).map(key=>(
                        <p key={key} >{errors[key][0]}</p>
                    ))}
                </div>
            }

            <input ref={nameRef} placeholder="Full Name"/>
            <input ref={emailRef} type="email" placeholder="Email Address"/>
            <input ref={passwordRef} type="password" placeholder="Password"/>
            <input ref={passwordConfirmationRef} type="password" placeholder="Confirm Password"/>
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
