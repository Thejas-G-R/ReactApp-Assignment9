import React from 'react'
import Card from '../components/Card';
import NavBar from '../components/NavBar';
function About() {
    return (<>
        {<NavBar />}
        <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center', flexWrap: "wrap" }}><h4 style={{ width: '100%', textAlign: 'center', marginBottom: "25px" }} > We are a small independent shop selling cool tech!</h4><p style={{ width: "100%", textAlign: "center" }}>Come say Hi to us on </p>{<Card color={"coral"} imgSrc="../images/shop.png" text={"10 Huntington Ave, Allston, MA"} />}</div>
    </>
    )
}

export default About