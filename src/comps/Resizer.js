import React, {Component, useRef, useState} from 'react';
import styled from 'styled-components'
import ResizerAnchors from "./ResizerAnchors";
import _ from 'lodash';


function Resizer({children, handleDrag, width, height, wGridCell, hGridCell, xPos, yPos, deviceOffsetLeft, deviceOffsetTop}) {

    const [resizerWidth, setResizerWidth] = useState(null)
    const [resizerHeight, setResizerHeight] = useState(null)
    const containerRef = React.createRef();


    React.useEffect(() => {
        console.log("ma xpos",xPos);
        if (!resizerWidth) {
            let resizerInitialWidth = width * wGridCell
            setResizerWidth(resizerInitialWidth)
            return;
        }
        if (!resizerHeight) {
            let initialHeight = height * hGridCell
            setResizerHeight(initialHeight)
        }
        containerRef.current.style.width = `${resizerWidth}px`;
        containerRef.current.style.height = `${resizerHeight}px`;
    }, [resizerWidth, resizerHeight]);


    let handleNewWidth = (updatedWidth) => {
        setResizerWidth(updatedWidth)
    }

    let handleNewHeight = (updatedHeight) => {
        setResizerHeight(updatedHeight)
    }


    return (
        <ResizerContainer
            ref={containerRef}
            style={{width: resizerWidth, height: resizerHeight}}
            className='resizable'>
            <ResizerAnchors
                width={resizerWidth}
                height={resizerHeight}
                xPos={xPos}
                yPos={yPos}
                wGridCell={wGridCell}
                hGridCell={hGridCell}
                handleDrag={handleDrag}
                handleNewWidth={handleNewWidth}
                handleNewHeight={handleNewHeight}
                deviceOffsetLeft={deviceOffsetLeft}
                deviceOffsetTop={deviceOffsetTop}
            >
                {children}
            </ResizerAnchors>
        </ResizerContainer>
    );
}


const ResizerContainer = styled.div`
box-sizing: border-box;
margin: 0;
padding: 0;
width: 100%;
height: 100%;
`

export default Resizer;


