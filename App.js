import { createBrowserRouter, RouterProvider, Navigate, NavLink } from 'react-router-dom';
import { Layout } from "./Ecommerse/Layout"
import { Homes } from "./Ecommerse/Homes"
import { signinData, SignUP } from "./Ecommerse/SignIn"
import { LogIN } from "./Ecommerse/LogIN"
import { Cart } from "./Ecommerse/Cart"
import { Error } from "./Ecommerse/Error"
import { Product } from "./Ecommerse/Product"
import { getbuydetails, getcartdetails, getproductdetails } from "./Ecommerse/Products"
import  { useState, useEffect } from 'react';
import { PrivateRoute } from './Ecommerse/Private';
import { Contact, contactData } from '/home/tristate/Desktop/Neer/neer/src/Ecommerse/Contact.jsx';
import { About } from '/home/tristate/Desktop/Neer/neer/src/Ecommerse/About.jsx';
import { CartDetails } from './Ecommerse/CartDetails';
import { useAuth0 } from '@auth0/auth0-react';
import { Buynow, buynowdetails } from './Ecommerse/Buynow';
import { Order } from './Ecommerse/Order';


function App () {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { loginWithRedirect } = useAuth0();


   useEffect(()=>{
    const usertoken = localStorage.getItem('userToken');
    if(usertoken){
      setIsLoggedIn(true)
    }
    else{
      setIsLoggedIn(false)
    }
   },[])

  const Router = createBrowserRouter([{
    path:"/",
    element:<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>,
    errorElement:<Error/>,
    children:[{
      path:"/",
      element: <Homes/>,
    },
    {
      path:"/:productid",
      element: <Product/>,
      loader:getproductdetails,
    },
    {
      path:"/cart",
      // element: <PrivateRoute element={<Cart/>}/>,
      element: isAuthenticated ? <Cart /> : (
        <li><button onClick={() => loginWithRedirect()}>Log In</button></li>
      ),
  loader:getcartdetails,
    },
    {
      path:"/buynow",
      element:<Buynow/>,
      action: buynowdetails,
      // loader:getbuydetails,
    },
    {
      path:"/buynow/:buynowid",
      element:<Order/>,
    },
    {
      path:"about",
      element:<About/>,
    },
    {
      path:"contact",
      element:<Contact/>,
      action:contactData,
    },
   
    {
      path:"/signin",
      element:<SignUP/>,
      action:signinData,
    },
    {
      path:"/log-in",
      element:<LogIN setIsLoggedIn={setIsLoggedIn}/>,
    },
  
  ]
  }])
return (
  <>
  <RouterProvider router={Router}/>
  </>
)
     
}
export default App