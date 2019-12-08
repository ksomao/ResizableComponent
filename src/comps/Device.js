import styled from "styled-components";
import React from "react";
import Draggable from "./Draggable";
import {Dropable} from "./Dropable";


class Device extends React.Component {
    state = {
        maxWidth: 0,
        wGrid: 12,
        hGrid: 10,
        wGridCell: 0,
        hGridCell: 0,
        deviceOffsetLeft: 0,
        deviceOffsetTop: 0,
        childComponents: []
    }

    constructor(props) {
        super(props);
        this.container = React.createRef();
        this.createDraggableComponent = this.createDraggableComponent.bind(this)
        this.updatingDeviceOffset = this.updatingDeviceOffset.bind(this)
    }

    componentDidMount() {
        this.updatingDeviceOffset()
        let maxWidth = this.container.current.clientWidth
        let wGridCell = this.container.current.clientWidth / this.state.wGrid
        let hGridCell = this.container.current.clientHeight / this.state.hGrid
        let deviceOffsetLeft = this.container.current.offsetLeft
        let deviceOffseTop = this.container.current.offsetTop
        this.setState({deviceOffsetLeft})
        this.setState({maxWidth})
        this.setState({wGridCell})
        this.setState({hGridCell})
    }

    handleDraggedChildNewPosition(x, y) {
        let xPos = Math.round(x / this.state.wGridCell)
        let yPos = Math.round(y / this.state.hGridCell)
        let newComponent = this.createDraggableComponent(xPos, yPos)

        this.setState({
            childComponents: [
                ...this.state.childComponents,
                newComponent
            ]
        })
    }

    createDraggableComponent(xPos, yPos) {
        let props = {
            xPos: xPos ? xPos : 0,
            yPos: yPos ? yPos : 0,
            width: 1,
            height: 1,
            bgColor: 'green',
            size: 5,
            maxWidth: this.state.maxWidth,
            wGridCell: this.state.wGridCell,
            hGridCell: this.state.hGridCell,
            deviceOffsetLeft: this.state.deviceOffsetLeft,
            deviceOffsetTop: this.state.deviceOffsetTop
        }

        let el = React.cloneElement(
            <Draggable {...props}/>,
            null,
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium aliquam asperiores commodi
                dolorem dolores fugiat harum, ipsum libero nesciunt nobis numquam officiis, optio placeat quis quisquam
                tenetur ut vero.</p>
        )
        return el
    }

    updatingDeviceOffset() {
        window.addEventListener("resize", () => {
            let deviceOffsetLeft = this.container.current.offsetLeft
            this.setState({deviceOffsetLeft})
        });
    }

    render() {
        return (
            <Container ref={this.container}>
                <Dropable
                    deviceOffsetLeft={this.state.deviceOffsetLeft}
                    deviceOffsetTop={this.state.deviceOffsetTop}
                    handleDraggedChildNewPosition={this.handleDraggedChildNewPosition.bind(this)}>
                    {this.createDraggableComponent()}
                    {(this.state.childComponents.map(child => child))}
                </Dropable>
            </Container>
        );
    }
}

export default Device

const Container = styled.div`
box-sizing: border-box;
background: blue;
margin: 0 auto;
padding: 0;
height: 823px;
width: 411px;
border-radius: 4px;
position: relative;
`

