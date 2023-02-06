// Importiert die MongoClient-Klasse aus dem "mongodb" - Paket. Diese Klasse wird verwendet, um eine Verbindung zur MongoDB-Datenbank herzustellen.
import { MongoClient } from "mongodb";

//Diese Variablen enthalten die Verbindungs-URI und den Namen der Datenbank, die verwendet werden sollen. 
//Sie sind durch die Umgebungsvariable MONGO_URI und MONGO_DB gesetzt. Die Infos kommen aus der .env-Datei
const url = process.env.MONGO_URI;
const database = process.env.MONGO_DB;

//Erstellt eine neue InsStanz der MongoClient-Klasse und speichert sie in der Variablen "client". Die Verbindungs-URI wird als Parameter übergeben.
const client = new MongoClient(url);
//Diese Variable wird später verwendet, um auf die Datenbank zu verweisen, sobald eine Verbindung hergestellt wurde.
let db;

//Definiert eine asynchrone Funktion "getDb", die die Verbindung zur MongoDB-Datenbank herstellt, 
//falls noch keine besteht und die Datenbank zurückgibt, wenn sie verfügbar ist.
export const getDb = () => {
    return new Promise((resolve, reject) => {
        //Prüft ob die Variable 'db' schon gesetzt wurde, wenn das der Fall ist, wird die 'db' sofort zurückgegeben an das .then
        if (db) resolve(db)
        //Stellt eine Verbindung zur MongoDB-Datenbank her. 
        //Dies ist ein asynchroner Aufruf, daher müssen die folgenden Anweisungen in einer "then" -Callback-Funktion ausgeführt werden, 
        //die aufgerufen wird, wenn die Verbindung erfolgreich hergestellt wurde.
        client.connect()
            .then(() => {
                //Speichert die Datenbank, auf die die Verbindung hergestellt wurde, in der "db" -Variablen.
                db = client.db(database);
                //Gibt die Datenbank als Ergebnis der Promise zurück
                resolve(db);
            })
            //Falls ein Fehler beim Verbindungsaufbau aufgetreten ist, wird die Funktion 'reject' aufgerufen und der Fehler übergeben.
            .catch((err) => reject(err))
    })
}