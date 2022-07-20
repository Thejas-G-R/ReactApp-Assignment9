import React from 'react'
import Card from '../components/Card'
import NavBar from '../components/NavBar'
function Jobs() {
    return (
        <>
            {<NavBar />}
            <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center', flexWrap: "wrap" }}><h4 style={{ width: '100%', textAlign: 'center', marginBottom: "25px" }} > Check below for job openings </h4>{<Card color={"cyan"} imgSrc={null} text={"Sorry! No job openings right now. Check back later"} />}</div>
        </>

    )
}

export default Jobs