import React from 'react';
import ReactDOM from 'react-dom';
import AppNews from './app-news';
import AppWeather from './app-weather';
import AppPrice from './app-price';
import Profile from './components/Profile/Signup';
import Login from './components/Profile/login';
import Forgot from './components/Profile/forgot';
import Landing from './components/Dashboard/landing';
import Prediction from './components/Dashboard/prediction';
import Prediction2 from './components/Dashboard/Prediction2';
import Ins from './components/Dashboard/ins';
import Ins2 from './components/Dashboard/ins2';
import Logout from './components/loggedout';
import './globals.css';
import App from './app';

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
    },
    {
        path: "/news",
        element: <AppNews/>,
      }
      ,
    {
        path: "/weather",
        element: <AppWeather/>,
      },
      {
        path:"/price",
        element : <AppPrice/>
      }
      ,
      {
        path:"/signup",
        element : <Profile/>
      }
      ,
      {
        path:"/login",
        element : <Login/>
      }
      ,
      {
        path:"/forgot",
        element : <Forgot/>
      }
      ,
      {
        path:"/dashboard",
        element : <Landing/>
      }
      ,
      {
        path:"/loggedout",
        element : <Logout/>
      },
      {
        path:"/prediction",
        element : <Prediction/>
      },
      {
        path:"/ins",
        element : <Ins/>
      },
      {
        path:"/prediction2",
        element : <Prediction2/>
      },{
        path:"/ins2",
        element : <Ins2/>
      }

  ]);


ReactDOM.render(<RouterProvider router={router}/>,document.querySelector("#root"));

