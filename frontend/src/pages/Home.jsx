
import { Link } from "react-router-dom";
import flower1 from "../assets/img/flower1.svg";
import flower2 from "../assets/img/flower2.svg";
import flower3 from "../assets/img/flower3.svg";
import flower4 from "../assets/img/flower4.svg";
import flower5 from "../assets/img/flower5.svg";
import flower6 from "../assets/img/flower6.svg";

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {


    //! Slider

    // return (
    //     <main className="main_home">
    //         <Slider {...sliderSettings}>
    //             <img src={flower1} alt="flower1" />
    //             <img src={flower2} alt="flower2" />
    //             <img src={flower3} alt="flower3" />
    //             <img src={flower4} alt="flower4" />
    //             <img src={flower5} alt="flower5" />
    //             <img src={flower6} alt="flower6" />
    //         </Slider>
    //         {/* <article>
    //             <h1>Products, 🪑👕👜 what our Visitors need</h1>
    //             <p>Browse between hundrets of Cool Stuff</p>
    //             <Link to="/shop"> <button>Explore</button> </Link>
    //         </article>
    //         <div className="flowers">
    //             <img src={flower1} />
    //             <img src={flower2} />
    //             <img src={flower3} />
    //             <img src={flower4} />
    //             <img src={flower5} />
    //             <img src={flower6} />
    //         </div> */}


    //     </main>
    // )



    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };


    return (
        <main className="main_home">
            <article>
                <h1>Products, 🪑👕👜 what our Visitors need</h1>
                <p>Browse between hundrets of Cool Stuff</p>
                <Link to="/shop"> <button>Explore</button> </Link>
            </article>
            <Slider {...settings} className="sliderBox">
                <img src={flower1} alt="flower1" />
                <img src={flower2} alt="flower2" />
                <img src={flower3} alt="flower3" />
                <img src={flower4} alt="flower4" />
                <img src={flower5} alt="flower5" />
                <img src={flower6} alt="flower6" />
            </Slider>
        </main>
    );
}


export default Home;