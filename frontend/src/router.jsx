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
import UserForm from "./routes/UserForm";

//import { Route } from "react-router-dom";
//import {Navigate} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/auth',
        element: <DefaultLayout/>,
        children: [
            // {
            //     index: true,
            //     element: <Users/>
            // },
            {
                path: 'users',
                element: <Users/>
            },
            {
                path: 'users/new',
                element: <UserForm key="userCreate"/>
            },
            {
                path: 'users/:id',
                element: <UserForm key="userUpdate"/>
            },
            {
                path: 'dashboard',
                element: <Dashboard/>
            },
        ]
    },
    {
        path: '/guest',
        element: <GuestLayout/>,
        children: [
            {
                path: 'signin',
                element: <SignIn/>
            },
            {
                path: 'signup',
                element: <SignUp/>
            },
        ]
    },
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/about',
        element: <About/>
    },
    {
        path: '/service',
        element: <Service/>
    },
    {
        path: '/contact',
        element: <Contact/>
    },
    
    {
        path: '*',
        element: <NotFound/>
    },  

])

export default router; 