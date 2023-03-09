import express from 'express';
import cors from 'cors';
import multer from 'multer';
//Importiert die config.js Datei, die die Konfigurationen enthalten sollte, wie z.B. die Datenbankverbindungsdetails.
import './config/config.js';
//Importiert die Funktion "getDb" aus dem db.js Modul, die verwendet wird, um eine Verbindung zur MongoDB-Datenbank herzustellen.
import { getDb } from './database/db.js';
import { ObjectId } from 'mongodb';

const app = express();
//Den Port holen wir aus der .env-Datei
const PORT = process.env.PORT;
//Man braucht multer damit die FormData Daten aus dem Frontend ohne Probleme verwendet werden können
const upload = multer({ dest: "./public" });


//Der Browser blockt alle Adressen die auf den Server zugreifen wollen außer sich selbst. Mit Cors kann man das beheben
app.use(cors());
//Fügt die Middleware hinzu, die verwendet wird, um den Request-Body in ein JSON-Objekt zu parsen.
app.use(express.json());
//Hat etwas mit Multer und dem Bild zutun
app.use('/public', express.static('./public'));



//! -------- Alle Objekte bekommen -------------
app.get('/api/moebel', (req, res) => {
    //Ruft die Funktion "getDb" auf, um eine Verbindung zur MongoDB-Datenbank herzustellen
    getDb()
        //Wenn die Verbindung hergestellt wurde, sucht es die Sammlung "meineMoebel"
        .then(db => db.collection('meineMoebel').find())
        //Wandelt pointer in ein Array um.
        .then(pointer => pointer.toArray())
        //Sendet das Array als Antwort des HTTP-Requests mit dem HTTP-Status-Code 200 
        .then(array => res.status(200).json(array))
})

//!------------Ein Objekt bekommen ---------------
app.get('/api/moebel/:id', (req, res) => {
    //Ruft die Funktion "getDb" auf, um eine Verbindung zur MongoDB-Datenbank herzustellen
    getDb()
        //Wenn die Verbindung hergestellt wurde, sucht es in der Sammlung "meineMoebel" nach dem Objekt mit dieser ObjectId
        .then(db => db.collection('meineMoebel').findOne({ _id: new ObjectId(req.params.id) }))
        //Sendet das gefundene Objekt als Antwort des HTTP-Requests mit dem HTTP-Status-Code 200 oder 404, wenn kein Objekt gefunden wurde
        .then(item => item ? res.status(200).json(item) : res.status(404).json({ message: 'Objekt nicht gefunden' }))
});

//!----Neuen Eintrag hinzufügen (Mit Bild) ------------
app.post('/api/moebel', upload.single("image"), (req, res) => {

    const moebel = req.body;
    console.log(moebel);
    getDb()
        //Fügt das freund Objekt in die 'freundesliste' collection.
        .then(db => db.collection('meineMoebel').insertOne(moebel))
        .then(ark => res.status(200).json(ark))
})

//!------Eintrag verändern-------------------
app.put('/api/moebel/:id', async (req, res) => {
    const params = req.params.id;
    const item = req.body
    console.log("The Item:", item);
    const id = req.body.id
    delete item.id // ich lösche die id proberty aus meinem object

    const db = await getDb() //Verbindung zur Datenbank aufbauen
    //Das Objekt mit der ID aus der URL mit dem neuen Inhalt von item ändern
    const result = await db.collection("meineMoebel").updateOne(
        { _id: new ObjectId(params) }, 
        { $set: { ...item } }
        )

    res.json(result)
})

//!------Eintrag löschen-------------------
app.delete('/api/moebel/:id', (req, res) => {
    //Hole die die Info id aus der URL
    const params = req.params.id;
    console.log(params);
    getDb()
        .then(db => db.collection('meineMoebel').deleteOne({ "_id": ObjectId(params) }))
        .then(result => {
            if (result.deleteCount === 0) {
                res.status(400).json({ message: "Objekt nicht gefunden" });
            } else {
                res.status(200).json({ message: "Objekt erfolgreich gelösch!" });
            }
        })
        .catch(err => console.log(err))
})





app.listen(PORT, () => console.log("PORT: ", PORT));