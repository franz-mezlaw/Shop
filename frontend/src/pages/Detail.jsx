import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../components/productCard/ProductCard";
import { ThemeContext } from "../App.js"

function Detail() {
    const theme = useContext(ThemeContext);
    const nav = useNavigate();
    const [newData, setNewData] = useState();
    const params = useParams(); //Hole die ID von der URL
    let theID = params.id;  //Speichere diese in die Variable theID
    console.log(theID);



    useEffect(() => {
        async function getData() {
            const data = await fetch(`http://localhost:9999/api/moebel/${theID}`);
            const dataJS = await data.json();
            setNewData(dataJS)
        }
        getData();
    }, [])

    // //TODO---  Objekt mit der ID aus URL finden
    // let foundRightObject = newData?.find((object) => {
    //     console.log("ObjectID: ", object.id);
    //     console.log("ParamsID: ", theIDNumber);
    //     return object.id === theIDNumber;
    // });

    // console.log("Found: ", foundRightObject);

    const deleteData = (event) => {
        event.preventDefault();
        console.log("Delete Knopf geht");
        console.log(theme.updatePage);
        fetch(`http://localhost:9999/api/moebel/${theID}`,
            {
                method: "DELETE"
            })
            .then(response => {
                theme.setUpdatePage((prev) => !prev)
                nav(-1);
            })
        //Lade das komplette Objekt aus dem Kontext
        //Hole die Methode die ich vorher reingepackt habe raus


    }

    return (
        <>
            {
                newData && <ProductCard
                    title={newData.title}
                    price={newData.price}
                    description={newData.description}
                    img={newData.image}
                    size={newData.size}
                    id={newData.id}
                />
            }

            <button onClick={deleteData}>DELETE</button>
        </>
    )
}

export default Detail;