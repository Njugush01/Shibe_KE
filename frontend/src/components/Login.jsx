//import "./RegisterStyles.css"
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import Loginimg from "../assets/login2.jpg";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const { setUser, setToken, setIsLoggedIn } = useStateContext();

  const onSubmit = (ev) => {
    ev.preventDefault();
    setLoading(true);
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
      .post("/guest/signin", payload) //making request to the server
      .then(({ data }) => {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        setToken(data.token); //whenever token information is available the app will rerender and user directed to dashboard
        setIsLoggedIn(true);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            console.log(response.data.errors);
            setErrors(response.data.errors);
          } else {
            setErrors({ email: [response.data.message] });
          }
          //setErrors(response.data.errors)
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
      className="login-signup-form animated fadeindown"
      style={{
        backgroundImage: `url(${Loginimg})`, // Specifies the path to the image
        backgroundSize: "cover", // Adjusts the background image size to cover the entire container
        backgroundPosition: "center", // Centers the background image
      }}
    >
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title font-bold text-3xl">Log in into your account</h1>

          {loading && (
            <div className="flex justify-center items-center my-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>{" "}
              <span className="text-gray-600 ml-2">Loading...</span>
            </div>
          )}

          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}

          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <button className="btn btn-block">Login</button>
          <p className="message">
            Not Registered? <Link to="/guest/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
