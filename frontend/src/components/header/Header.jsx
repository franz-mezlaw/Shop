import { Link } from "react-router-dom";
import "./Header.css";
import einkaufswagen from "../../assets/img/einkaufswagen.svg"
import person from "../../assets/img/person.svg"

function Header() {
    return (
        <header>
            <h1>Hotel <span>Shop</span></h1>
            <section className="nav">
                <Link to="/"> <p>Home</p> </Link>
                <Link to="/shop"> <p>Shop</p> </Link>
                <Link to="/about"> <p>About</p> </Link>
                <Link to="/admin"> <p>Admin</p> </Link>
            </section>
            <section className="icons">
                <img alt="person_pic" src={`${person}`} />
                <img alt="einkaufswagen_pic" src={`${einkaufswagen}`} />
            </section>
        </header>
    );
};

export default Header;