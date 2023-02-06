import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/header/Header';
import Admin from './pages/Admin';
import Shop from './pages/Shop';
import Basket from './pages/Basket';
import Detail from './pages/Detail';
import About from './pages/About';

import { db } from './Firebase_old/Firebase';
import { getDoc, getDocs, collection, updateDoc, addDoc, doc } from 'firebase/firestore';



function App() {
  // Auf Sammlung Products zugreifen
  const ref = collection(db, "Products");
  //Aufs einzelne Dokument zugreifen
  const big = doc(db, "Products", "Tische");

  async function getData() {
    const data = await getDocs(ref);
    //Aufs erste Dokument zugreifen mit [0]
    console.log(data.docs[0].data());
  }
  getData();


  async function getSingleData() {
    const data = await getDoc(big);
    console.log(data.data());
    //------------
    //Test ---- In Array umwandeln
    // const array = Array.from(Object.entries(data.data()));
    // console.log(Array.from(Object.entries(data.data())));
    // console.log(array[0][0]);

    // // Test ----- Daten in Array mit Objekten umwandeln
    // const a = data.data()
    // const arrayData = Object.entries(a).map((e) => ({ [e[0]]: e[1] }));
    // console.log(arrayData)
    // // ---------
  }
  getSingleData();

  //Hinzufügen von Daten
  async function setData() {
    //Dadurch bekommen wir unser Dokument "big"
    const data = await getDoc(big);
    const newProduct = {
      //Bekommend die alten Daten aus dem Dokument "big" mit   ...data.data()
      ...data.data(),
      //Neues anlegen

      benny: {
        verfügbar: true,
        lagerbestand: 8,
      }

    }
    //Was soll geupdated werden und dann was aktuallisiert werden soll
    await updateDoc(big, { ...newProduct });
  }
  // setData();




  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
