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

    useEffect(() => {
      // const data = await axiosClient.get('/user');
      // setAccountType(data.account_type);
      axiosClient.get('/user')
      .then(({data}) => {
        //console.log(data);
        setAccountType(data.account_type);
        //localStorage.setItem("userData", JSON.stringify(data));
        setUser(data);
      })
    }, [])

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

   
    const showSideBar=() =>{
    
      if(account_type == 1){
      return  adminSidePane()
      }

      if(account_type == 2){
        return  donorSidePane()
        }

        if(account_type == 3){
          return volunteerSidePane()
        }

        return <div/>

    }

    const adminSidePane=() =>{
      return <aside>
      <h1 className='font-bold text-3xl'>Food Link</h1>
      
      <Link to="/auth/admin-dashboard">Dashboard</Link> 
      <Link to="/auth/profile">My Profile</Link>
      <Link to="/auth/users">Users</Link>
      <Link to="/auth/listed">Listed Food</Link>
      <Link to="/auth/pending">Pending Listings</Link>
      <Link to="/auth/accepted">Accepted Listings</Link>
      <Link to="/auth/rejected">Rejected Listings</Link>
      <Link to="/auth/report">Reports</Link>
    
  </aside> 

    }

    const donorSidePane=() =>{
      return <aside>
      <h1 className='font-bold text-3xl'>Food Link</h1>
      <Link to="/auth/dashboard">Dashboard</Link>
      <Link to="/auth/profile">My Profile</Link>
      <Link to="/auth/listing">List Food</Link>
      <Link to="/auth/donor-report">Report</Link>     
     {/* <Link to="/auth/report">Report</Link> */}
  </aside> 

    }


    const volunteerSidePane=() =>{
      return <aside>
      <h1 className='font-bold text-3xl'>Food Link</h1>
      
      <Link to="/auth/profile">My Profile</Link>
      <Link to="/auth/v-listed">Listed Food</Link>
      <Link to="/auth/my-claims">My Claims</Link>
      <Link to="/auth/scheduled-pickups">Scheduled Pickups</Link>

  </aside> 
    }
  return (
    <div className='defaultLayout'>
{
  showSideBar()
}
        <div className='content bg-[#e9e8e6]'>
            <header>
                <div>
                 <h2 className='font-bold text-2xl'>{account_type == 1 ? "Admin": account_type == 2 ? "Donor": account_type == 3 ? "Volunteer":""}</h2>
                </div>
                <div>
                <Link to="/">Home</Link> | &nbsp; &nbsp;
                  {user.name} | &nbsp; &nbsp; 
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
