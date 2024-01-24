import {Outlet} from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import {Navigate} from "react-router-dom"
import {Link} from "react-router-dom"
import "./DefaultLayout.css"

export default function DefaultLayout() {
    const {user, token} = useStateContext()

    if(!token) {
        return <Navigate to="/guest/signin"/>
    }

    const onLogout = (ev) =>{
        ev.preventDefault()
    }

  return (
    <div className='defaultLayout'>
        <aside>
            <Link to="/auth/dashboard">Dashboard</Link>
            <Link to="/auth/users">Users</Link>
        </aside> 
        <div className='content'>
            <header>
                <div>
                  Admin
                </div>
                <div>
                  {user.name}
                  <a href='#' onClick={onLogout} className='btn-logout'>Logout</a>
                </div>
            </header>
            <main>
            <Outlet/>
            </main>
        </div>
    </div>
  )
}
