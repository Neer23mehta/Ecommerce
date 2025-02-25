import { useState } from "react";
import { useSelector } from "react-redux"
import { persistor } from "./Store/StoreR";
import { NavLink } from "react-router-dom";
import "../EcommerseUI/Order.css"

export const Order = () => {
    const items = useSelector((state)=>state.items);
    const [state,setstate] = useState(false)
    const totalprice = (items.reduce((acc,item)=>acc+item.price*item.quantity,0))
    const newtotal = Math.round(totalprice*86.7)
    const totalQuantity = items.reduce((acc,item)=>acc+item.quantity,0)

    const handleconfirm = () => {
       const userinfo = window.confirm("Your Order Is Confirm")
        if(userinfo === true)
        {
            setstate(true)
            persistor.purge();
        }
        else {
            setstate(false)
        }

    }
    if(state === true) {
        return <p>Your Order Is Placed</p>
    }
    return (
        <div className="order-container">
        <p id="p1">Total Amount: {newtotal}Rs</p>
        <ul className="order-detail">
            {
                items.map((curval,index)=>{
                    const {id,title,description,price} =curval 
                    const newprice = Math.round(price*86.7)
                    return (
                        <li key={index}>
                            <p>Name:{title} </p>
                            <p>Price: {newprice}Rs</p>
                            <NavLink to={`/${id}`}><button>Detail</button></NavLink>
                        </li>
                    )
                })
            }
        </ul>
            <button onClick={handleconfirm}>Confirm</button>
        </div>
    )

}