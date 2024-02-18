import { createContext, useContext, useState } from "react";

const ACCESS_TOKEN = '';

const StateContext = createContext({
    user: null,
    token:null,
    listing: null,
    notification:null,
    setUser: () =>{},
    setToken: () =>{},
    setListing: () =>{},
    setNotification:() =>{}
})

export const ContextProvider = ({children})=>{

    const[user, setUser] =useState({});
    const[token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const[listing, setListing] = useState({});
    const[notification, _setNotification] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const setNotification = (message) =>{
        _setNotification(message);  //This will set the message
        setTimeout(() => {
            _setNotification('')   //After 5 sec this will reset the message
        }, 5000);
    }

    const setToken = (token) =>{  //Accepts the token and calls useState _setToken to set the token inside the state
        _setToken(token)
        if (token){
            localStorage.setItem('ACCESS_TOKEN', token);
        } else{
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }
    return(
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            listing,
            setListing,
            notification,
            setNotification,
            isLoggedIn, 
            setIsLoggedIn
        }}>
            {children}

        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)