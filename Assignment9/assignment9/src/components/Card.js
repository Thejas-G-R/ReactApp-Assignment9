import React from 'react'
import Square from './Square';
import Label from './Label'

function Card(props) {
    var cardStyle = {
        height: "auto",
        width: "20%",
        padding: 0,
        backgroundColor: "#FFF",
        WebkitFilter: "drop-shadow(0px 0px 5px #666)",
        filter: "drop-shadow(0px 0px 5px #666)"
    };
    return (
        <>
            <div style={cardStyle}>
                <Square color={props.color} imgSrc={props.imgSrc} />
                <Label text={props.text} />
            </div>
        </>
    )
}
export default Card