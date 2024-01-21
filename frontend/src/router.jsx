import {createBrowserRouter} from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Service from "./routes/Service";
import Contact from "./routes/Contact";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import Users from "./routes/Users";
import Dashboard from "./routes/Dashboard";
import NotFound from "./routes/NotFound";
import DefaultLayout from "./layouts/DefaultLayout";
import GuestLayout from "./layouts/GuestLayout";
import {Navigate} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/home"/>
            },
            {
                path: '/users',
                element: <Users/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/signin',
                element: <SignIn/>
            },
            {
                path: '/signup',
                element: <SignUp/>
            },
        ]
    },
    {
        path: '/home',
        element: <Home/>
    },
    
    {
        path: '/about',
        element: <About/>
    },
    {
        path: '/service',
        element: <Service/>
    },{
        path: '/contact',
        element: <Contact/>
    },
    
    {
        path: '*',
        element: <NotFound/>
    },
    

])

export default router;