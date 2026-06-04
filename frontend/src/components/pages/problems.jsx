import {useEffect, useState} from "react";
import {supabase} from '../../lib/supabase.js';
import NavBar from "../layout/nav-bar.jsx";
import ExpandablePanel from "../ide/ExpandablePanel.jsx";
import ProblemDisplay from "./ProblemDisplay.jsx";
import IdePanel from "../ide/IDEPanel.jsx";
import Footer from "../layout/footer.jsx";
import "../../styles/problems.css";

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
                <ExpandablePanel label="Prompts" showButton={false}>
                    <ProblemList problems={problems} onSelect={setSelectedProblem} selected={selectedProblem}/>
                </ExpandablePanel>
            </div>

            <div className="problems-display">
                <ExpandablePanel label="Problem" showButton={false}>
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
function ProblemList({problems, onSelect, selected}) {
    return (
        <ul
            className="problem-list-items"
            style={{ listStyleType: 'none', padding: 0, margin: 0 }}
        >
            {problems.map((p, index) => {
                const isSelected = selected?.problem_id === p.problem_id;

                return (
                    <li
                        key={p.problem_id}
                        className={`problem-list-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => onSelect(p)}
                        style={{
                            padding: '12px 16px',
                            cursor: 'pointer',
                            borderBottom: index === problems.length - 1 ? 'none' : '1px solid black',
                            backgroundColor: isSelected ? '#d0e6da' : 'transparent',
                            fontWeight: isSelected ? '600' : 'normal'
                        }}
                    >
                        {p.name}
                    </li>
                );
            })}
        </ul>
    );
}

export default Problems

