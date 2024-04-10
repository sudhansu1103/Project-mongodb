import React from 'react'
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
import Home from './components/Home';

import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';
import RegistrationForm from './components/RegistrationForm';
import Upload from './components/Upload';

import { AuthorizeUser, ProtectRoute } from './middleware/auth';
import SelectSem from './components/Selectsem';

import Sem1 from './components/Sem1';
import Sem2 from './components/Sem2';
import Sem3 from './components/Sem3';
import Sem4 from './components/Sem4';
import Sem5 from './components/Sem5';
import Sem6 from './components/Sem6';
import Rating from './components/Rating';
import Feedback from './components/Feedback';
const router = createBrowserRouter([
    {
        path : '/login',
        element : <Username></Username>
    },
    {
        path : '/home',
        element : <Home></Home>
    },
    {
        path : '/register',
        element : <Register></Register>
    },
    {
        path : '/password',
        element : <ProtectRoute><Password /></ProtectRoute>
    },
    {
        path : '/feedback',
        element : <Feedback></Feedback>
    },
    {
        path : '/profile',
        element : <AuthorizeUser><Profile /></AuthorizeUser>
    },
    {
        path : '/recovery',
        element : <Recovery></Recovery>
    },
    {
        path : '/rate',
        element : <Rating></Rating>
    },
    {
        path : '/reset',
        element : <Reset></Reset>
    },
    {
        path : '/validate',
        element : <RegistrationForm></RegistrationForm>
    },
    {
        path : '*',
        element : <PageNotFound></PageNotFound>
    },
    {
        path : '/upload',
        element : <Upload></Upload>
    },
  
    {
        path : '/select',
        element : <SelectSem></SelectSem>
    },
    {
        path : '/',
        element : <Home></Home>
    },
    {
        path : '/sem1',
        element : <Sem1></Sem1>
    },
    {
        path : '/sem6',
        element : <Sem6></Sem6>
    },
    {
        path : '/sem5',
        element : <Sem5></Sem5>
    },
    {
        path : '/sem4',
        element : <Sem4></Sem4>
    },
    {
        path : '/sem3',
        element : <Sem3></Sem3>
    },
    {
        path : '/sem2',
        element : <Sem2></Sem2>
    },
    
])



export default function App() {
   
    return (
        
      <main>
       
        <RouterProvider router={router}></RouterProvider>
      </main>
    );
  }
