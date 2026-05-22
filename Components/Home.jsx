import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    return (
        <>
            <NavBar />

            <div className="container mt-5">

                <div className="text-center mb-5">
                    <h1>Welcome to PivotStack</h1>
                    <p>Level up your coding game!</p>
                </div>

                <div className="bg-light border p-5 mb-5 d-flex justify-content-end">
                    <div className="bg-dark text-white p-4">
                        <h4>Sign up now!</h4>
                        <p>Try a code problem today!</p>
                    </div>
                </div>

                <div className="bg-light border p-5 mb-5">
                    <div className="bg-white border p-4 w-25">
                        <h4>Practice Problems</h4>
                        <p>
                            Aimed to push your coding abilities!
                        </p>
                    </div>
                </div>

                <div className="row mb-5">

                    <div className="col-md-6">
                        <div className="bg-light border p-4 h-100">
                            <h4>Community Support</h4>
                            <p>
                                Support for multiple languages and
                                collaborative problem solving!
                            </p>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="bg-light border p-4 h-100">
                            <h4>Resources</h4>
                            <p>
                                Learn from professionals in the industry.
                            </p>
                        </div>
                    </div>

                </div>

            </div>

            <Footer />
        </>
    );
}

export default Home;