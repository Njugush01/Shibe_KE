import {createBrowserRouter} from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Service from "./routes/Service";
import Contact from "./routes/Contact";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import Users from "./admin/Users";
import Dashboard from "./admin/Dashboard";
import NotFound from "./routes/NotFound";
import DefaultLayout from "./layouts/DefaultLayout";
import GuestLayout from "./layouts/GuestLayout";
import UserForm from "./admin/UserForm";
import ListedFoods from "./admin/ListedFoods";
import Report from "./admin/Report";
import FoodListings from "./donor/FoodListings";
import ListingsForm from "./donor/ListingsForm";
import DonorProfile from "./donor/DonorProfile";

//import { Route } from "react-router-dom";
//import {Navigate} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/auth',
        element: <DefaultLayout/>,
        children: [
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
            {
                path: 'listed',
                element: <ListedFoods/>
            },
            {
                path: 'listing',
                element: <FoodListings/>
            },
            
            {
                path: 'listing/new',
                element: <ListingsForm key="listingCreate"/>
            },
            {
                path: 'listing/:id',
                element: <ListingsForm key="listingUpdate"/>
            },
            {
                path: 'profile',
                element: <DonorProfile/>
            },
            {
                path: 'report',
                element: <Report/>
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