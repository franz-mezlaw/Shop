import { useState } from "react";

function Formular(props) {
//base64 ist das Format in dem Das Bild als String umgewandelt und an MongoDB geschickt wird
    const [base64, setBase64] = useState('');


    const sendData = (e) => {
        e.preventDefault()
        //Das braucht man um auf das Formular zugreifen zu können.
        //Mit e.target bekommt man das <form>
        //Und dann packt man es in den body vom Request
        const form = new FormData(e.target);
  // Add the base64-encoded image to the FormData object
  form.append("image", base64);
        //Hier wird nun gefetched mit einem POST req an den Server
        fetch('http://localhost:9999/api/moebel', {
            method: 'POST',
            body: form
        })
            .then((response) => {
                if (response.ok) {
                    props.setRefresh(prev => !prev); // hier wird refresh ein neuer wert zugewiesen. Dadurch wird die Seite wo das Formular ist, neu gerendert
                }
              return response.json();
            })
            .then((data) => {
                console.log(data);
            })
    }

    const handleReaderLoaded = (event) => {
        setBase64(event.target.result);
    }


    //! Das benutzen wir wenn wir Bilder als base64 string abspeichern wollen
    const picConverter = (event) => {
         // Extrahiere das erste ausgewählte File aus dem "event.target.files" Array und speichere es in der Variablen "file"
        const file = event.target.files[0];
        const fr = new FileReader();
        fr.onload = handleReaderLoaded;
        fr.readAsDataURL(file);
      }
      
    

    return (
        //Bilder und Texte, also Daten, müssen noch an den Server gesendet werden
        <form encType="multipart/form-data"  onSubmit={sendData}>
            <p>Neue Einträge in die Datenbank</p>
            <input type="text" name="title" placeholder="Title" />
            {/* multer wird nach "picture" Bildern suchen */}
            {/* <input type="file" name="postPic" placeholder="Beitragsbild" /> */}
            <input type="text" name="size" placeholder="Size" />
            <input type="number" name="price" placeholder="Price" />
            <input type="description" name="description" placeholder="description" />
            <input type="submit" value="Publish" />
            <input type="file" name="image" onChange={picConverter}/>
            <img alt="product_pic" src={base64}/>
        </form>
    )
}

export default Formular;