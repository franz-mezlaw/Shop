import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../components/productCard/ProductCard";
import { ThemeContext } from "../App.js";

function Detail() {
  const theme = useContext(ThemeContext);
  const nav = useNavigate();
  const [newData, setNewData] = useState();
  const params = useParams(); //Hole die ID von der URL
  let theID = params.id; //Speichere diese in die Variable theID
  console.log(theID);
  
  useEffect(() => {
    async function getData() {
      const data = await fetch(`${REACT_APP_BACKEND_URL}/api/moebel/${theID}`);
      const dataJS = await data.json();
      setNewData(dataJS);
    }
    getData();
  }, [theme.updatePage,theID]);

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
    fetch(`${REACT_APP_BACKEND_URL}/api/moebel/${theID}`, {
      method: "DELETE",
    }).then((response) => {
      //Hole die Methode aus dem Context
      //Ändere den aktuellen Wert auf das Gegenteil
      /*   theme.setUpdatePage((prev) => !prev) */
      nav(-1);
    });
  };

  const editData = (event) => {
    event.preventDefault(); //Verhindert, dass die Seite neu geladen wird, wenn das Formular abgesendet wird
    console.log("Edit Knopf geht");

    //Holt die Werte aus den Formulareingaben
    const title = event.target.title.value;
    const size = event.target.size.value;
    const price = event.target.price.value;
    const description = event.target.description.value;

    //Erstellt ein leeres Objekt, um nur die veränderten Felder zu speichern
    const updatedFields = {};

    //Überprüft, ob die einzelnen Eingabefelder verändert wurden
    //Wenn ja, wird das entsprechende Feld im updatedFields-Objekt gespeichert
    if (title.trim() !== "") {
      updatedFields.title = title;
    }

    // .trim Überprüft, ob der Wert des size-Input-Feldes nicht nur aus Leerzeichen besteht
    // Wenn ja, füge den size-Wert dem updatedFields-Objekt hinzu, ansonsten ignoriere ihn
    if (size.trim() !== "") {
      updatedFields.size = size;
    }

    if (price.trim() !== "") {
      updatedFields.price = price;
    }

    if (description.trim() !== "") {
      updatedFields.description = description;
    }

    //Wenn keine Felder verändert wurden, wird die Funktion beendet
    if (Object.keys(updatedFields).length === 0) {
      console.log("No fields updated");
      return;
    }

    //Schickt die aktualisierten Daten an die API
    fetch(`${REACT_APP_BACKEND_URL}/api/moebel/${theID}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    }).then((response) => {
      //Hole die Methode aus dem Context
      //Ändere den aktuellen Wert auf das Gegenteil
      theme.setUpdatePage((prev) => !prev);
    });
  };

  return (
    <>
      {newData && (
        <ProductCard
          title={newData.title}
          price={newData.price}
          description={newData.description}
          img={newData.image}
          size={newData.size}
          id={newData.id}
        />
      )}

      <button onClick={deleteData}>DELETE</button>

      <form onSubmit={editData}>
        <p>Ändere Einträge</p>
        <input type="text" name="title" placeholder="Title" />
        <input type="text" name="size" placeholder="Size" />
        <input type="number" name="price" placeholder="Price" />
        <input
          type="description"
          name="description"
          placeholder="description"
        />
        <input type="submit" value="Change" />
      </form>
    </>
  );
}

export default Detail;
