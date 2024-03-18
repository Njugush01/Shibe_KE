import {createBrowserRouter} from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Service from "./routes/Service";
import Contact from "./routes/Contact";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import Users from "./admin/Users";
import Dashboard from "./dashboards/Dashboard";
import NotFound from "./routes/NotFound";
import DefaultLayout from "./layouts/DefaultLayout";
import GuestLayout from "./layouts/GuestLayout";
import UserForm from "./admin/UserForm";
import ListedFoods from "./admin/ListedFoods";
import VolunteerListed from "./volunteer/VolunteerListed";
import Report from "./admin/Report";
import FoodListings from "./donor/FoodListings";
import ListingsForm from "./donor/ListingsForm";
import DonorProfile from "./donor/DonorProfile";
import AdminDashboard from "./dashboards/AdminDashboard";
import DonorReport from "./donor/DonorReport";
import DataView from "../src/core/DataView";
import DataViewListing from "./core/DataViewListings";
import DataViewDonor from "./core/DataViewDonor";
//import DataViewVolunteer from "./core/DataViewVolunteer";
import MyClaims from "./volunteer/MyClaims";
import SchedulePickup from "./donor/SchedulePickup";
import PendingListings from "./admin/Pending";
import AcceptedListings from "./admin/Accepted";
import RejectedListingsListings from "./admin/Rejected";
import ScheduledPickups from "./volunteer/ScheduledPickups";


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
                path: 'admin-dashboard',
                element: <AdminDashboard/>
            },
            {
                path: 'listed',
                element: <ListedFoods/>
            },
            {
                path: 'v-listed',
                element: <VolunteerListed/>
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
            {
                path: 'donor-report',
                element: <DonorReport/>
            },
            {
                path: 'pending',
                element: <PendingListings/>
            },
            {
                path: 'accepted',
                element: <AcceptedListings/>
            },
            {
                path: 'rejected',
                element: <RejectedListingsListings/>
            },
            {
                path: 'data-view',
                element: <DataView/>
            },
            {
                path: 'dataView-L',
                element: <DataViewListing/>
            },
            {
                path: 'dataView-D',
                element: <DataViewDonor/>
            },
            {
                path:'my-claims',
                element: <MyClaims/>
            },
            {
                path:'pickup-schedules',
                element: <SchedulePickup/>
            },
            {
                path:'scheduled-pickups',
                element: <ScheduledPickups/>
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