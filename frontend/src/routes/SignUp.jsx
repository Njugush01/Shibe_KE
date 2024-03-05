import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import Signupimg from "../assets/signup.jpg";
import toast, { Toaster } from "react-hot-toast";

function SignUp() {
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  //const account_typeRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const idNumberRef = useRef();
  const addressRef = useRef();
  const privacyPolicyRef = useRef();


  const [errors, setErrors] = useState(null);

  const { setUser, setToken } = useStateContext();
  //const navigate = useNavigate();

  const [accountType, setAccountType] = useState("");
  

  const handleNameChange = (event) => {
    const inputValue = event.target.value;
    // inputValue = inputValue.replace(/[^A-Za-z\s]/g, "");
    // event.target.value = inputValue; // Update input field value
    if (/^[A-Za-z\s]+$/.test(inputValue) || inputValue === "") {
      setErrors((prevErrors) => ({ ...prevErrors, name: null }));
    } else {
      toast.error("Only letters and spaces are allowed!", { duration: 4000 });
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
      toast.error("Phone number cannot exceed 12 digits!", { duration: 4000 });
    }
  };

  const handleRoleChange = (event) => {
    setAccountType(event.target.value);
  };

  // const generateRandomPassword = () => {
  //   const symbols = "!@#$%^&*()_+{}:<>?|[];',./`~";
  //   const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  //   const passwordLength = 8;
  //   let password = "";
  //   for (let i = 0; i < passwordLength; i++) {
  //     password += letters.charAt(Math.floor(Math.random() * letters.length));
  //   }
  //   return password;
  // };

  // const sendEmail = (name,email, password) => {
  //   axiosClient.post("/send-email", {name, email, password})
  //   .then(()=>{
  //     toast.success(`Email sent to ${email}`);
  //   })
  //   .catch((error)=>{
  //     console.error("Error sending email:", error);
  //       toast.error("Failed to send email");
  //   })
  // }

  const onSubmit = (ev) => {
    ev.preventDefault();
    let payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      account_type: accountType,
      //password: passwordRef.current.value,
      //password_confirmation: passwordConfirmationRef.current.value,
      id_number: '',
      address: '',
      privacy_policy: privacyPolicyRef.current.checked,
    };

    if (accountType === "2") { // Donor
      payload = {
          ...payload,
          password: passwordRef.current.value,
          password_confirmation: passwordConfirmationRef.current.value,
      };
  } else if (accountType === "3") { // Volunteer
      payload = {
          ...payload,
          id_number: idNumberRef.current.value,
          address: addressRef.current.value,
          privacy_policy: privacyPolicyRef.current.checked,
      };
  }
    //console.log("Checkbox status:", privacyPolicyRef.current.checked);
    console.log(payload)

    axiosClient
      .post("/guest/signup", payload) 
      .then(({ data }) => {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        //setToken(data.token);

        if (accountType === "3") {
          //sendEmail(data.user.name, data.user.email);
          toast.success("Account created successfully", { duration: 4000 });
          toast.success(" Your log in password has been sent to your email", { duration: 4000 });
          //navigate("/guest/signin");
        }
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  const isVolunteer = accountType === "3";

  return (
    <div
      className="login-signup-form animated fadeindown"
      style={{
        backgroundImage: `url(${Signupimg})`, 
        backgroundSize: "cover", 
        backgroundPosition: "center", 
      }} 
    >
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title font-bold text-3xl">Sign Up for free</h1>
          {/* {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key] && errors[key][0]}</p>
              ))}
            </div>
          )} */}

          <select
            //ref={account_typeRef}
            value={accountType}
            onChange={handleRoleChange}
            id="role"
            defaultValue=""
            className="outline-none bg-white w-full border-2 border-gray-300 my-0 mb-6 py-3 px-4 box-border text-base transition-all duration-300 focus:border-purple-600"
          >
            <option value="" disabled hidden>
              Select Role
            </option>
            {/* <option value="1">Admin</option>  */}
            <option value="3">Volunteer</option>
            <option value="2">Donor</option>
          </select>

          <input
            ref={nameRef}
            value={nameRef.current?.value}
            placeholder={isVolunteer ? "John Doe" : "Organization Name"}
            onChange={handleNameChange}
          />
          {errors?.name && <p className="error-message text-red-500 text-sm">{errors.name[0]}</p>}

          <input ref={emailRef} type="email" placeholder="Email Address" />
          {errors?.email && <p className="error-message text-red-500 text-sm">{errors.email[0]}</p>}
          <input
            ref={phoneRef}
            type="tel"
            placeholder="Mobile Number: 254712345678"
            onChange={handlePhoneChange}
          />
          {errors?.phone && <p className="error-message text-red-500 text-sm">{errors.phone[0]}</p>}

          {/* <label htmlFor="role">Select Role:</label> */}

          
            <div className={!isVolunteer ? "hidden" : ''}>
              <input ref={idNumberRef || 0} type="text" placeholder="ID Number" />
              {errors?.id_number && <p className="error-message text-red-500 text-sm">{errors.id_number[0]}</p>}
              <input
                ref={addressRef || 0}
                type="text"
                placeholder="Kahawa, wendani"
              />
               {errors?.address && <p className="error-message text-red-500 text-sm">{errors.address[0]}</p>}
              <label
                style={{
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <input
                  ref={privacyPolicyRef}
                  type="checkbox"
                  style={{ marginRight: "0.1rem", marginBottom: "0rem" }}
                />
                <span style={{ marginLeft: "-1rem" }}>
                  I agree to the privacy policy
                </span>
              </label>
            </div>
          

          <div className={isVolunteer ? "hidden" : ""}>
            <input ref={passwordRef} type="password" placeholder="Password" />
            {errors?.password && <p className="error-message text-red-500 text-sm">{errors.password[0]}</p>}
            <input
              ref={passwordConfirmationRef}
              type="password"
              placeholder="Confirm Password"
            />
          </div>

          {/* <input
            className={accountType == "3" ? "" : hide}
            placeholder="ID Number"
          />
          <input
            className={accountType == "3" ? "" : hide}
            checked={policy}
            onChange={handleCheckboxChange}
            type="checkbox"
          /> */}
          <button className="btn btn-block">
            {isVolunteer ? "Register" : "Sign up"}
          </button>
          <p className="message">
            Already Registered? <Link to="/guest/signin">Sign in</Link>
          </p>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
export default SignUp;
