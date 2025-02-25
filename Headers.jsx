import { NavLink } from "react-router-dom";
import "/home/tristate/Desktop/Neer/neer/src/EcommerseUI/Headers.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export const Headers = ({ isLoggedIn, setIsLoggedIn }) => {
    const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
    const [select, Setselect] = useState("");

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    const fetchProduct = async (product) => {
        try {
            const res = await fetch(`https://fakestoreapi.com/products?category=${product}`); 
            const data = await res.json();
            console.log(data);  
        } catch (error) {
            console.error(error);
        }
    };

    // useEffect(() => {
    //     if (select) {
    //         fetchProduct(select);
    //     }
    // }, [select]); 

    const handlesearchchange = (e) => {
        Setselect(e.target.value.toLowerCase()); 
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault(); 
        if (select) {
            fetchProduct(select);
        }
    };

    return (
        <div className="Main-Nav">
            <nav>
                <div className="Logo">
                    <h1>Neer Mehta</h1>
                </div>
                <div className="List">
                    {/* <div>
                        <form onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                value={select}
                                onChange={handlesearchchange}
                                placeholder="Search Products"
                            />
                        </form>
                    </div> */}
                    <li>
                        <NavLink to="/" style={({ isActive }) => ({ color: isActive ? "Green" : "white" })}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" style={({ isActive }) => ({ color: isActive ? "Green" : "white" })}>
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" style={({ isActive }) => ({ color: isActive ? "Green" : "white" })}>
                            Contact
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/cart" style={({ isActive }) => ({ color: isActive ? "Green" : "white" })}>
                            Cart
                        </NavLink>
                    </li>
                    <li>
                        {isAuthenticated && <a>{user.name}</a>}
                    </li>
                    {
                        isAuthenticated ? (
                            <li>
                                <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                                    Log Out
                                </button>
                            </li>
                        ) : (
                            <li>
                                <button onClick={() => loginWithRedirect()}>Log In</button>
                            </li>
                        )
                    }
                </div>
            </nav>
        </div>
    );
};
