import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/productCard/ProductCard";

function Detail() {

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


    return (
        <>
            {
                newData && <ProductCard
                    title={newData.title}
                    price={newData.price}
                    description={newData.description}
                    category={newData.category}
                    img={newData.image}
                    id={newData.id}
                />
            }
        </>
    )
}

export default Detail;