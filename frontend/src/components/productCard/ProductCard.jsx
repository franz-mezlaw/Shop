import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard(props) {
    console.log(props);
    return (
        <Link to={`/detail/${props.id}`} className="productCard">
            <img src={props.img} />
            <p className="product_title">{props.title}</p>
            <p>{props.description}</p>
            <div >
                <p>{`${props.price} €`}</p>
                <p>Add to Basket</p>
            </div>
        </Link>
    )
}

export default ProductCard;