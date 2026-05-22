<<<<<<< HEAD
import NavBar from "./nav-bar";
import Footer from "./footer";
=======
import React, { useState } from "react";
import NavBar from "../Components/nav-bar.jsx";
>>>>>>> 51dc9c91c00c2ca55114133fee08db100889c275

function About() {
    return (
        <>
            <NavBar />

            <div className="container mt-5 mb-5">

                <h1 className="text-center mb-5">
                    About PivotStack
                </h1>

                <p>
                    PivotStack is a platform focused on helping students
                    strengthen coding and interview skills through
                    collaborative learning and practice.
                </p>

                <p>
                    Users can engage with coding problems, community
                    discussions, and educational resources designed
                    to improve technical understanding.
                </p>

                <p>
                    Our mission is to make technical interview preparation
                    more accessible and supportive for students of all levels.
                </p>

            </div>

            <Footer />
        </>
    );
}

export default About;