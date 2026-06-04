import {useState, useEffect} from "react";
import {supabase} from '../../lib/supabase.js';
import NavBar from "../layout/nav-bar.jsx";
import ExpandablePanel from "../ide/ExpandablePanel.jsx";
import ProblemDisplay from "./ProblemDisplay.jsx";
import Footer from "../layout/footer.jsx";
import "../../styles/problems.css";

function Resources() {
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [problems, setResources] = useState([]);

    useEffect(() => {
        async function fetchResources(){
            const { data, error} = await supabase
                .from('resources')
                .select('*')
                .eq('status', 'approved');
            if (!error) setResources(data);
        }
        fetchResources();
    }, []);

    return (
        <div className="problems-parent">
            <div className="div1" id="nav-bar">
                <NavBar/>
            </div>

            <div className="problems-list">
                <ProblemList problems={problems} onSelect={setSelectedProblem} selected={selectedProblem}/>
            </div>

            <div className="problems-display">
                <ExpandablePanel label="Resource:" overlayClass="overlay-problem">
                    <ProblemDisplay problem={selectedProblem}/>
                </ExpandablePanel>
            </div>

            <div className="div6" id="bottom-nav-bar">
                <Footer/>
            </div>
        </div>
    );
}

function ProblemList({ problems, onSelect, selected }) {
    return (
        <>
            <div className="problem-header">
                <span className="problem-title">{'Resource List:'}</span>
            </div>
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
        </>
    );
}

export default Resources;