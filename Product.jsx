import { useLoaderData, useNavigate } from "react-router-dom"
import "../EcommerseUI/Product.css"

export const Product = () => {
    const productdetail = useLoaderData();
    const navigate = useNavigate();

    const handlegoback = () => {
        navigate(-1)
    }
    const{id,title,description,rating,price,image,category} = productdetail;
    return (
        <div className="Products-Main">
            <div className="Images">
        <img src={image} alt={title}/>
            </div>
            <div>
                <h3>{title}</h3>
                <h4>About Product:{description}</h4>
                <h2>Price:{price}$</h2>
                <h3>Rating:{rating.rate}</h3>
            </div>
            <button onClick={handlegoback}>Go Back</button>
        </div>
    )
}