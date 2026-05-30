import {useState, useEffect} from "react";
import {supabase} from './supabase.js';
import NavBar from "./nav-bar.jsx";
import ExpandablePanel from "./ExpandablePanel.jsx";
import ProblemDisplay from "./ProblemDisplay.jsx";
import IdePanel from "./IDEPanel.jsx";
import Footer from "./footer.jsx";
import "../Styles/problems.css";

function Problems() {
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        async function fetchProblems() {
            const {data, error} = await supabase
                .from('problems')
                .select('*')
                .eq('status', 'approved');
            if (!error) setProblems(data);
        }
        fetchProblems();
    }, []);

    return (
        <div className="problems-parent">
            <div className="div1" id="nav-bar">
                <NavBar/>
            </div>

            <div className="problems-list">
                <div className="problem-header">
                    <span className="problem-title">{'Practice:'}</span>
                </div>
                <ProblemList problems={problems} onSelect={setSelectedProblem} selected={selectedProblem}/>
            </div>

            <div className="problems-display">
                <ExpandablePanel label="Problem:" overlayClass="overlay-problem">
                    <ProblemDisplay problem={selectedProblem}/>
                </ExpandablePanel>
            </div>

            <div className="problems-ide">
                <div className="expandable-ide">
                    <IdePanel/>
                </div>
            </div>

            <div className="div6" id="bottom-nav-bar">
                <Footer/>
            </div>
        </div>
    );
}

function ProblemList({problems, onSelect, selected }) {
    return (
        <ul className="problem-list-items">
            {problems.map(p => (
                <li
                    key={p.problem_id}
                    className={`problem-list-item ${selected?.problem_id === p.problem_id ? 'selected' : ''}`}
                    onClick={() => onSelect(p)}
                >
                    {p.name}
                </li>
            ))}
        </ul>
    );
}

export default Problems