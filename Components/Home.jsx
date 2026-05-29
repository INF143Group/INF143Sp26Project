import NavBar from "./nav-bar.jsx";
import Footer from "./footer.jsx";
import Nav from 'react-bootstrap/Nav';

function Home() {
    return (
        <div style={{ height: "100vh", overflow: "hidden", background: '#f5f0eb', display: 'flex', flexDirection: 'column' }}>
            <style>{`
             #main-scroll::-webkit-scrollbar { display: none; }
             #main-scroll { -ms-overflow-style: none; scrollbar-width: none; }
             `}</style>

            <div className="div1" id="nav-bar">
                <NavBar/>
            </div>

            <main
                id="main-scroll"
                style = {{
                    flex: 1,
                    overflowY: "auto",
                }}
            >
                <div className="text-center mb-5 mt-4" style = {{background:'#f5f0eb'}}>
                    <h1 className="display-4 fw-bold text-dark mb-3">Welcome to PivotStack!</h1>
                    <p className="lead text-muted fs-5">Level up your coding game!</p>
                </div>

                <div className="container px-4" style = {{background:'#f5f0eb'}}>

                    <div
                        className="p-5 mb-5 bg-gradient rounded-4 shadow-sm text-white d-flex justify-content-between align-items-center flex-wrap gap-4"
                        style= {{backgroundColor: "#1e293b"}}
                    >
                        <div>
                            <h3 className="fw-bold mb-1">Ready to start?</h3>
                            <p className="text-white-50 m-0">Try a code problem today!</p>
                        </div>
                        <button className="btn btn-light btn-lg px-4 fw-semibold text-dark shadow-sm">
                            <Nav.Link href="/login">Sign Up Now!</Nav.Link>
                        </button>
                    </div>

                    <div className="p-5 mb-5 bg-white border border-light rounded-4 shadow-sm">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <h2 className="fw-bold text-dark mb-3">Live Coding Interviews</h2>
                                <p className="text-muted fs-5 leading-relaxed">
                                    With live video conferencing, messaging and scheduling capability, all designed so you can succeed. Additionally, we provide a library of curated, real-world challenges to help you practice coding and take your coding abilities to the next level!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row g-4 mb-4">
                        <div className="col-md-6">
                            <div className="bg-white border border-light p-4 h-100 rounded-4 shadow-sm d-flex flex-column justify-content-between">
                                <div>
                                    <div className="text-primary mb-3">
                                        <i className="bi bi-people-fill fs-3"></i>
                                    </div>
                                    <h4 className="fw-bold text-dark mb-2">Community Support</h4>
                                    <p className="text-muted m-0">
                                        Support for multiple languages and collaborative problem solving with thousands of developers.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="bg-white border border-light p-4 h-100 rounded-4 shadow-sm d-flex flex-column justify-content-between">
                                <div>
                                    <div className="text-primary mb-3">
                                        <i className="bi bi-book-half fs-3"></i>
                                    </div>
                                    <h4 className="fw-bold text-dark mb-2">Resources</h4>
                                    <p className="text-muted m-0">
                                        Learn from professionals in the industry with tailored documentation, video breakdowns, and guides.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="div6" id="bottom-nav-bar" >
                    <Footer/>
                </div>
            </main>
        </div>
    );
}

export default Home;