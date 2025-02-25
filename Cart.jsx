import { useDispatch, useSelector } from "react-redux";
import { additems, deleteitems, persistor, updateQuantity } from "./Store/StoreR";
import { useLoaderData } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "/home/tristate/Desktop/Neer/neer/src/EcommerseUI/Cart.css";
import { useState } from "react";
import { Buynow, BUynow } from "./Buynow";

export const Cart = () => {
    const items = useSelector((state) => state.items);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteitems(id));
    };

    const handleQuantityChange = (id, quantity) => {
        if (quantity > 0) {
            dispatch(updateQuantity(id, quantity));
        }
    };

    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const newtotal = Math.round(totalPrice*86.7)
    const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

    const handleclick = () => {
        window.location.href = "/buynow"
        // localStorage.removeItem("root")
        // persistor.purge();  
    }
    return (
        <div className="Cart-Main">
            <h1>Cart</h1>
            <div className="Cart-ul">
                <ul>
                    {items.map((curItem) => {
                        const { id, title, price, image, quantity } = curItem;
                        const newprice = Math.round(price*86.7)
                        return (
                            <li key={id}>
                                <div className="Image">
                                    <img src={image} alt={title} width="100" />
                                </div>
                                <div className="Content">
                                    <h2>{title}</h2>
                                    <h3>Price: {newprice}Rs</h3>
                                    <p>Quantity: {quantity}</p>
                                </div>
                                <button onClick={() => handleDelete(id)}>Delete</button>
                                <NavLink to={`/${id}`}>
                                    <button>Details</button>
                                </NavLink>

                                <button onClick={() => handleQuantityChange(id, quantity + 1)}>Add</button>
                                <button onClick={() => handleQuantityChange(id, quantity - 1)} disabled={quantity <= 1}>
                                    Less
                                </button>
                                {/* <NavLink to={`${id}`}>
              <button><Buynow/></button>
                </NavLink>  */}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="Total">
                <h2>Total Price: {newtotal}Rs</h2>
                <h2>Total Quantity: {totalQuantity}</h2>
                <button onClick={handleclick} disabled={totalQuantity<=0}>{totalQuantity>0?"Buynow":null}</button>
               
            </div>
        </div>
    );
};
