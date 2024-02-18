import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import Signupimg from "../assets/signup.jpg";
import toast, { Toaster } from 'react-hot-toast'; 

function SignUp () {
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const account_typeRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const [errors, setErrors] = useState(null)

    const {setUser, setToken} = useStateContext()

    const handleNameChange = (event) => {
        const inputValue = event.target.value;
        // inputValue = inputValue.replace(/[^A-Za-z\s]/g, ""); 
        // event.target.value = inputValue; // Update input field value
        if (/^[A-Za-z\s]+$/.test(inputValue) || inputValue === "") {
          setErrors((prevErrors) => ({ ...prevErrors, name: null }));
        } else {
          // setErrors((prevErrors) => ({
          //   ...prevErrors,
          //   // name: ["Only letters and spaces are allowed!"],
          // }));
          toast.error("Only letters and spaces are allowed!")
        }
      };
    
      const handlePhoneChange = (event) => {
        let inputValue = event.target.value;
        // Remove any non-digit characters
        inputValue = inputValue.replace(/\D/g, "");
        // Limit input to 12 digits
        if (inputValue.length <= 12 || inputValue === "") {
            setErrors((prevErrors) => ({ ...prevErrors, phone: null }));
        } else {
            // Trim input to 12 digits
            inputValue = inputValue.slice(0, 12);
            event.target.value = inputValue; // Update input field value
            // setErrors((prevErrors) => ({
            //     ...prevErrors,
            //     phone: ["Phone number cannot exceed 12 digits!"],
            // }));
            toast.error("Only letters and spaces are allowed!")
        }
    };
      



    const onSubmit = (ev) =>{
        ev.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email:emailRef.current.value,
            phone: phoneRef.current.value,
            account_type: account_typeRef.current.value,
            password:passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }

        axiosClient.post("/guest/signup", payload)  //making request to the server
            .then(({data}) => {
                setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                // console.log(data.user);
                //localStorage.setItem("userData", JSON.stringify(data.user)); 
                setToken(data.token); 
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    //console.log(response.data.errors);
                    setErrors(response.data.errors)
                }
            })
    }

  return (
    <div className="login-signup-form animated fadeindown"style={{
      backgroundImage: `url(${Signupimg})`, // Specifies the path to the image
      backgroundSize: "cover", // Adjusts the background image size to cover the entire container
      backgroundPosition: "center", // Centers the background image
      }}>
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title font-bold text-3xl">Sign Up for free</h1>
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key] && errors[key][0]}</p>
              ))}
            </div>
          )}

          <input
            ref={nameRef}
            value={nameRef.current?.value}
            placeholder="Full Name"
            onChange={handleNameChange}
          />
          {errors?.name && <p className="error-message">{errors.name[0]}</p>}
          
          <input ref={emailRef} type="email" placeholder="Email Address" />
          <input
            ref={phoneRef}
            type="tel"
            placeholder="Mobile Number: 254712345678"
            onChange={handlePhoneChange}
          />
          {errors?.phone && <p className="error-message">{errors.phone[0]}</p>}

          {/* <label htmlFor="role">Select Role:</label> */}
          <select ref={account_typeRef} id="role" defaultValue="">
            <option value="" disabled hidden>
              Choose Role
            </option>
             {/* <option value="1">Admin</option>  */}
            <option value="3">Volunteer</option>
            <option value="2">Donor</option>
          </select>
          <input ref={passwordRef} type="password" placeholder="Password" />
          <input
            ref={passwordConfirmationRef}
            type="password"
            placeholder="Confirm Password"
          />
          <button className="btn btn-block">Sign up</button>
          <p className="message">
            Already Registered? <Link to="/guest/signin">Sign in</Link>
          </p>
        </form>
      </div>
      <Toaster/>
    </div>
  );
}
export default SignUp;
