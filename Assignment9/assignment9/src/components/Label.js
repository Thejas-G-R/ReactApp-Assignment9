import React from 'react'

function Label(props) {
    var labelStyle = {
        fontFamily: "sans-serif",
        fontWeight: "bold",
        padding: 13,
        margin: 0
    };

    return (
        <p style={labelStyle}>{props.text}</p>
    );
}

export default Label