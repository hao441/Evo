//react r
import React, { useState } from "react";
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
        <div className="grid-item-1">
            <h1 className="title">Evo</h1>
        </div>
        <div className="grid-item-2">
            <h4>Evo is a genetic algorithm visualiser. There are 300 cells and each of them represent an individual object that controls its own background colour.</h4>
            <br/>
            <h4>To get started pick a colour and click start evolution.</h4>
        </div>
        <div className="grid-item-3">
            <button className="start-button" onClick={() => navigate("/evo")}>Start</button>
        </div>
        </header>
    </div>
    )
}

export default Welcome;