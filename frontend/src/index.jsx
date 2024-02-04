import React from 'react';
import ReactDOM from 'react-dom/client';
//import {BrowserRouter} from "react-router-dom";
import {RouterProvider} from 'react-router-dom';
import './index.css';
import App from './App';
import './components/HeroStyles.css'
import router from './router';
import { ContextProvider } from './contexts/ContextProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.StrictMode>
   <ContextProvider>
      <RouterProvider router={router}/>
   </ContextProvider>
 </React.StrictMode>
);
