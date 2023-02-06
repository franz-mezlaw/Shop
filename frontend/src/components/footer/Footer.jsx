import "./Footer.css";
import PIC from "../../../src/assets/img/pizza.jpeg";





const Footer = () => {
    return (
        <footer className="footer">
            <div>
                <img src={PIC} alt="PIC" />
                <p>Created by Franz & Steffi</p>
                <img src={PIC} alt="PIC" />
            </div>
        </footer>
    );
}

export default Footer;