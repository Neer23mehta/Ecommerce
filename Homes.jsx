import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { additems } from "./Store/StoreR";
import "../EcommerseUI/Homes.css";

const Api = "https://fakestoreapi.com/products";

export const Homes = ({ isloggedIn }) => {
    const [data, setdata] = useState([]);

    const getapis = async () => {
        try {
            const res = await fetch(Api);
            const data = await res.json();
            console.log(data);
            setdata(data);
        } catch (error) {
            console.error(error);
        }
    };

    const dispatch = useDispatch();

    const handleclick = (curElem) => {
        dispatch(additems(curElem));
    };

    useEffect(() => {
        getapis();
    }, []);

    return (
        <div className="Main-Container">
            <ul className="Main-ul">
                {data.map((curElem) => {
                    const { price, category, rating, image, title, id } = curElem;
                    const newprice = Math.round(price*86.7)
                    return (
                        <li key={id}>
                            <div className="Main-card">
                                <div className="Image">
                                    <img src={image} alt={title} />
                                </div>
                                <div className="content">
                                    <div className="content-elem"></div>
                                    <h1>{title.length > 15 ? title.slice(0, 15) + "..." : title}</h1>
                                    <h1>Price: {newprice}Rs</h1>
                                    <h3>Ratings: {rating.rate}</h3>
                                    <div className="Btn-content">
                                        <NavLink to={`/${id}`}>
                                            <button>Click</button>
                                        </NavLink>
                                        <button onClick={() => handleclick(curElem)}>
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
