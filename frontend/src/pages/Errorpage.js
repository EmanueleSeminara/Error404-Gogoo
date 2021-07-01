import React, { Component } from "react";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Cane from "../images/cane_testo.png"
export default class Errorpage extends Component {

    componentDidMount() {
        window.localStorage.clear();
    }

    render() {
        return (
            <>
            <div className="ez flex-column error" style={{ backgroundColor: "#1C1927", display: "flex", alignItems: "center", height: "100vh", height: "100%", overflow: "hidden"}}>
                <Navbar />

                {/* <h1 style={{color:"#A097B3", fontFamily: "Futura", paddingTop: "10vh"}}>ERROR404</h1> */}
                <img src={Cane} style={{width: "650px", paddingTop: "20px"}}/>
               {/*  <p style={{color:"#A097B3", fontFamily: "Futura", fontStyle: "normal", lineHeight: "63px"}}>Siamo spiacenti c’è stato un errore
                    stiamo lavorando per risolverlo,</p>
                    <p style={{color:"#A097B3"}}> senza chiacchiere</p> */}



               
            </div>
             <Footer />
             </>
        );
    }
}
