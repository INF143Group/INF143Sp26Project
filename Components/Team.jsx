<<<<<<< HEAD
import NavBar from "./nav-bar";
import Footer from "./footer";
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
>>>>>>> 51dc9c91c00c2ca55114133fee08db100889c275

function TeamMember({ reverse }) {
    return (
        <div className="bg-light border shadow-sm p-4 mb-4">

            <div className={`row align-items-center ${reverse ? "flex-row-reverse" : ""}`}>

                <div className="col-md-3 text-center">
                    <div
                        className="rounded-circle border mx-auto"
                        style={{
                            width: "150px",
                            height: "150px",
                            backgroundColor: "#d9d9d9"
                        }}
                    />
                </div>

                <div className="col-md-9">

                    <h3>Name 1</h3>

                    <p>
                        Lorem ipsum is simply dummy text of the printing
                        and typesetting industry.
                    </p>

                </div>

            </div>

        </div>
    );
}

function Team() {
    return (
        <>
            <NavBar />

            <div className="container mt-5 mb-5">

                <h1 className="text-center mb-5">
                    Meet the Team
                </h1>

                <TeamMember />
                <TeamMember reverse />
                <TeamMember />

            </div>

            <Footer />
        </>
    );
}

export default Team;
