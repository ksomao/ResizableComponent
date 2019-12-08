import React, {useState} from 'react'
import styled from 'styled-components'


function ResizerAnchors({handleNewWidth, handleNewHeight, handleDrag, yPos, xPos, wGridCell, hGridCell, deviceOffsetLeft, deviceOffsetTop, children}) {
    const [anchorDirection, setAnchorDirection] = useState(null)

    let mouseXPosition = React.useRef(null)
    let mouseYPosition = React.useRef(null)

    const anchor = {
        Right: 'right',
        Bottom: 'bottom',
    }

    React.useEffect(() => {
        addMouseEvent()
        return () => {
            removeMouseEvent()
        }
    })

    const onMouseDown = (e, direction) => {
        handleDrag(false)
        if (direction === "right") {
            setAnchorDirection(anchor.Right)
            mouseXPosition.current = e.clientX
        }
        if (direction === "bottom") {
            setAnchorDirection(anchor.Bottom)
            mouseYPosition.current = e.clientY
        }
    }

    const onMouseMove = e => {
        if (anchorDirection === "right") {
            if (!mouseXPosition.current) {
                return
            }
            let offsetTotal = deviceOffsetLeft + (xPos * wGridCell)
            console.log(xPos);
            console.log("off========>", offsetTotal);
            let quotient = Math.round((e.clientX - offsetTotal) / wGridCell)
            let resizerUpdatedWidth = quotient * wGridCell
            console.log("moved");
            console.log("wGridCell", wGridCell);
            console.log("resizerUpdatedWidth", resizerUpdatedWidth);
            console.log("moved");


            handleNewWidth(resizerUpdatedWidth)
        }
        if (anchorDirection === "bottom") {
            console.log("ici");
            if (!mouseYPosition.current) {
                return
            }
            let offsetTotal = deviceOffsetTop + (yPos * hGridCell)
            let quotient = Math.round((e.clientY - offsetTotal) / hGridCell)
            let resizerUpdatedHeight = quotient * hGridCell
            handleNewHeight(resizerUpdatedHeight)
        }

    }


    let onMouseUp = () => {
        handleDrag(true)
        mouseXPosition.current = null
        mouseYPosition.current = null
        removeMouseEvent()
    }

    let addMouseEvent = () => {
        document.addEventListener("mousemove", onMouseMove)
        document.addEventListener("mouseup", onMouseUp)
    }

    let removeMouseEvent = () => {
        document.removeEventListener("mousemove", onMouseMove)
        document.removeEventListener("mouseup", onMouseUp)
    }


    return (
        <ResizerAnchorsContainer className='resizers'>
            <div
                onMouseDown={e => onMouseDown(e, anchor.Right)}
                onMouseUp={onMouseUp}
                className='resizer right-anchor'/>
            <div
                onMouseDown={e => onMouseDown(e, anchor.Bottom)}
                onMouseUp={onMouseUp}
                className='resizer bottom-anchor'/>
            {children}
        </ResizerAnchorsContainer>
    )
}


const ResizerAnchorsContainer = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: 100%;
  *:nth-child(3n) { 
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
`
export default ResizerAnchors


