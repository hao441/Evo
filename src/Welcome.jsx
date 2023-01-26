//react r
import React from "react";
import { useNavigate } from 'react-router-dom';

//css
import './welcome.css';
import { useEffect } from "react";

const Welcome = () => {

    const navigate = useNavigate();

    useEffect(() => {
        // startModel();
    }, [])

    return (
    <div className="App">

        <header className="background grid-container">
        <div className="grid-item-2">
            <h1>Welcome to Evo</h1>
            <p>Evo is a Genetic Algoirthm Visualiser. </p>
            <br/>
            <p>There are 300 cells and each of them represent an individual object that controls its own background colour. 
                To get started click 'Start' then on the next screen, pick a colour and click Start Evolution. </p>
        </div>
        <div className="grid-item-3">
            <button className="start-button" onClick={() => navigate("/evo")}>Start</button>
        </div>
        </header>
    </div>
    )
}

export default Welcome;