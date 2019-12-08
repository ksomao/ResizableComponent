import './App.css';
import React, {Component, useRef, useState} from 'react';
import styled from 'styled-components'
import Device from "./comps/Device";



function App() {
    return (
        <div className="App">
            <Device/>
        </div>
    );
}






const Text = styled.p`
text-align:  center;
background: red;
margin: 0;
padding: 0;
height: 100%;
`

const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`


const Drop2 = styled.div`
width: 100%;
height: 400px;
background: dimgrey;
`

export default App;

