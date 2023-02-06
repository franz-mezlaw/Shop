import { useEffect, useState } from "react";
import Formular from "../components/formular/Formular";




const Admin = () => {

    const [moebel, setMoebel] = useState([]) // hier stehen alle unsere Freunde drin
    const [refresh, setRefresh] = useState(true) // wir nutzen diesenm state um bei einem neuen Freund ein fetch zu triggern und so die Seite zu aktuallisieren mit neuen Daten


    useEffect(() => {
        fetch(`http://localhost:9999/api/moebel`)
            .then(res => res.json())
            .then(data => setMoebel(data))
            .catch(err => console.log(err))
    }, [refresh]) // refresh ist jetzt eine dependency vom useEffect, wenn refresh ein neuen wert bekommt wird useEffect ausgeführt
    console.log(moebel);


    //Hier werden die Hinzugefügten Daten auch dargestellt
    return (
        <>
            <Formular setRefresh={setRefresh} />
            <div className="eintrag">
                {moebel.map((freund, index) => {
                    return (
                        <div key={index}>
                            <p >{`${index + 1} ${freund.title} ${freund.size}`}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Admin