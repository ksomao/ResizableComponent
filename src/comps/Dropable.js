import {useDrop} from "react-dnd";
import ItemTypes from "./ItemTypes";
import React, {useState} from "react";
import styled from "styled-components";

export const Dropable = ({children, handleDraggedChildNewPosition, deviceOffsetLeft}) => {
    const [xPos, setXPos] = useState(null)
    const [yPos, setYPos] = useState(null)


    const [, drop] = useDrop({
        accept: ItemTypes.BOX,
        hover(prop, monitor) {
            let hoverPosition = monitor.getSourceClientOffset();
            setXPos(hoverPosition.x)
            setYPos(hoverPosition.y)
        },
        drop() {
            handleDraggedChildNewPosition(xPos - deviceOffsetLeft, yPos);
        },
    })

    return <Container ref={drop}>{children}</Container>
};

const Container = styled.div`
width: 100%;
height: 100%;
background: dimgrey;
`