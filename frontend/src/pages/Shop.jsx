import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ThemeContext } from "../App";
import filter from "../assets/img/filter.svg"
import ProductCard from "../components/productCard/ProductCard";




function Shop() {
    const theme = useContext(ThemeContext);
    const [newData, setNewData] = useState();
    const [inputValue, setInputValue] = useState();
    console.log(theme);

    //! Fetch einbauen und an ProductCard übergeben
    // useEffect(() => {
    //     async function getData() {
    //         const data = await fetch(`https://fakestoreapi.com/products`);
    //         const dataJS = await data.json();
    //         setNewData(dataJS)

    //         console.log(dataJS);
    //     }
    //     getData();
    // }, [])

    useEffect(() => {
        console.log("im useeffect")
        fetch(`${REACT_APP_BACKEND_URL}/api/moebel`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setNewData(data)
            })
            .catch(err => console.log(err))
    }, [theme.updatePage])





    //! Objekt finden dass den title hat, den man ins Input eingegeben hat
    const resultFilter = newData?.filter(object => {
        //Prüfe ob zunächst object.title und inputValue Werte haben
        if (object.title && inputValue) {
            //Prüfe ob der Titel vom Objekt den eingegebenen Wert vom Input enthält.
            //Falls ja, gib jedes Objekt das passt in ein Array (resultFilter)
            return object.title?.toLowerCase().includes(inputValue.toLowerCase());
        } else {
            return false
        }
    })




    return (
        <main className="main_shop">
            <form>
                <div>
                    <img alt="filter_img" src={filter} />
                </div>
                {/* //! Daten aus Input in inputValue speichern */}
                <input
                    onChange={(e) => setInputValue(e.target.value)}
                    id="searchInput"
                    placeholder="Search...">
                </input>
            </form>

            <section>

                {
                    //- Wert && Wird ausgeführt wenn Wert true ist
                    //- !Wert && Wird ausgeführt wenn Wert false ist

                    //Wenn kein Input Wert da ist wird über das Array gemappt von allen Daten (dem Fetch)
                    !inputValue && newData?.map((object, index) => {
                        // console.log(object.image);
                        return <ProductCard
                            key={index}
                            title={object.title}
                            price={object.price}
                            // description={object.description}
                            img={object.image}
                            id={object._id}
                        />
                    })
                }
                {
                    //Wenn ein Input Wert da ist wird über das Array von dem Filter verwendet um zu mappen
                    inputValue && resultFilter?.map((object, index) => {
                        // console.log(object.image);
                        return <ProductCard
                            key={index}
                            title={object.title}
                            price={object.price}
                            // description={object.description}
                            img={object.image}
                            id={object._id}
                        />
                    })
                }
            </section>
        </main>
    )
}

export default Shop;