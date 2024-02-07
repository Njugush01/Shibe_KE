import {Outlet} from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import {Navigate} from "react-router-dom"
import {Link} from "react-router-dom"
import "./DefaultLayout.css"
import { useEffect, useState } from 'react'
import axiosClient from '../axios-client'
//import { useState } from 'react'


export default function DefaultLayout() {
    const {user, token, notification, setUser, setToken} = useStateContext()
    const [account_type, setAccountType]= useState(0);

    if(!token) {
        return <Navigate to="/guest/signin"/>
    }

    const onLogout = (ev) =>{
        ev.preventDefault()

        axiosClient.post('/logout')
        .then(() => {
          setUser({})
          setToken(null)
        })
    }

    useEffect(() => {
      // const data = await axiosClient.get('/user');
      // setAccountType(data.account_type);
      axiosClient.get('/user')
      .then(({data}) => {
        console.log(data);
        setAccountType(data.account_type);
        //localStorage.setItem("userData", JSON.stringify(data));
        setUser(data);
      })
    }, [])

  return (
    <div className='defaultLayout'>
        <aside>
            <h1>Food Link</h1>
            <Link to="/auth/dashboard">Dashboard</Link>
            <Link to="/auth/profile">My Profile</Link>
            {/* {account_type ==0? <></>:<></>} */}
            {account_type == 3 || account_type == 2  ? "":<Link to="/auth/users">Users</Link>}
            {account_type == 2  ? "":<Link to="/auth/listed">Listed Food</Link>}
            {account_type == 1 || account_type == 3  ? "":<Link to="/auth/listing">Food Listings</Link>}
            {account_type == 3 ? "":<Link to="/auth/report">Report</Link>}
        </aside> 
        <div className='content'>
            <header>
                <div>
                 <h3>{account_type == 1 ? "Admin": account_type == 2 ? "Donor": account_type == 3 ? "Volunteer":"Anonymous"}</h3>
                </div>
                <div>
                  {user.name} &nbsp; &nbsp; 
                  <a href='#' onClick={onLogout} className='btn-logout'>Logout</a>
                </div>
            </header>
            <main>
            <Outlet/>
            </main>
        </div>


        {notification &&
          <div className='notification'>
          {notification}
          </div>
        }  
    
    </div>
  )
}
