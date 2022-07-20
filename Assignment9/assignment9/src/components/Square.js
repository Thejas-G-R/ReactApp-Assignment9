import React from 'react'
import shop from '../images/shop.png'
function Square(props) {
    var squareStyle = {
        height: 150,
        backgroundColor: props.color,
        display: "flex",
        alignItem: "center",
        justifyContent: "center"
    };

    return (
        <div style={squareStyle}>
            {props.imgSrc ? <img src={shop} alt={"Shop"} /> : null}
        </div>
    );
}

export default Square