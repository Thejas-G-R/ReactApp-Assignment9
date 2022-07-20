import React from 'react'
import Card from '../components/Card'
import NavBar from '../components/NavBar'
function Contact() {
    return (

        <>
            {<NavBar />}
            <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center', flexWrap: "wrap" }}><h4 style={{ width: '100%', textAlign: 'center', marginBottom: "25px" }} > You can contact us at </h4>{<Card color={"coral"} imgSrc={null} text={"Email id: shop@tech.com"} />}</div>
        </>
    )
}

export default Contact