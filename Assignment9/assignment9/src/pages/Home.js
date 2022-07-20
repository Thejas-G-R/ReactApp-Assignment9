import React from 'react'
import NavBar from '../components/NavBar'
import Card from '../components/Card'
function Home() {
    let items = [{ text: "Cameras", color: "lightBlue" }, { text: "Mobile phones", color: "lightGreen" }, { text: "Laptops", color: "yellow" }, { text: "Smart watches", color: "orange" }];
    return (
        <>
            {<NavBar />}
            <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center', flexWrap: "wrap" }}><h4 style={{ width: '100%', textAlign: 'center', marginBottom: "25px" }} > Welcome!<br />Please find below all the great products we sell</h4><div style={{ display: 'flex', justifyContent: "space-around", width: "100%" }}>{items.map((item, index) => { return <Card key={index} color={item.color} text={item.text} imgSrc={null} /> })}</div></div>
        </>
    )
}

export default Home