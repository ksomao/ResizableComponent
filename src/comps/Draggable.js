import React, {useEffect, useState} from "react";
import {useDrag} from "react-dnd";
import ItemTypes from "./ItemTypes";
import Resizer from "./Resizer";
import styled from "styled-components";

const Draggable = (props) => {
    const [isDraggable, setIsDraggable] = useState(true)
    useEffect(() => {
        console.log(props);
    });

    const [, drag] = useDrag({
        item: {
            type: ItemTypes.BOX,
        },
        canDrag: isDraggable,
    })

    const handleDrag = (value) => {
        setIsDraggable(value)
    }


    return (
        <Container
            {...props}
            ref={drag}>
            <Resizer
                {...props}
                handleDrag={handleDrag}
                size={5}>
                {props.children}
            </Resizer>
        </Container>
    );
};


const Container = styled.div`
box-sizing: border-box;
position:absolute;
background: ${props => props.bgColor};
top: ${props => props.yPos * props.hGridCell + 'px'};
left: ${props => props.xPos * props.wGridCell + 'px'};
margin: 0;
padding: 0;
overflow: hidden;
`

export default Draggable