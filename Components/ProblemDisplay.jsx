import { useState, useEffect } from 'react';

// PLACEHOLDER
// TODO: Connect to prompt database (API call, imported JSON, etc.)
// Expected format: [{ id, title, difficulty, tags: [], description, examples: [], constraints: [] }]
const PROMPT_DATABASE = [
    {
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        tags: ["Array", "Hash Map"],
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        examples: [
            { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] = 2 + 7 = 9" },
            { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
        ],
        constraints: ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹", "Only one valid answer exists."]
    },
];

const difficultyColor = {
    Easy: '#4caf7d',
    Medium: '#f0a500',
    Hard: '#e05c5c',
};

const ProblemDisplay = () => {
    const [problem, setProblem] = useState(null);

    useEffect(() => {
        // TODO: Replace with real fetch/query when database is connected
        if (PROMPT_DATABASE.length > 0) {
            const random = PROMPT_DATABASE[Math.floor(Math.random() * PROMPT_DATABASE.length)];
            setProblem(random);
        }
    }, []);

    if (!problem) return <div className="problem-loading">Loading problem...</div>;

    return (
        <div className="problem-display">
            <div className="problem-header">
                <span className="problem-title">{problem.title}</span>
                <span className="problem-difficulty" style={{ color: difficultyColor[problem.difficulty] }}>
                    {problem.difficulty}
                </span>
            </div>

            <div className="problem-tags">
                {problem.tags.map(tag => (
                    <span key={tag} className="problem-tag">{tag}</span>
                ))}
            </div>

            <p className="problem-description">{problem.description}</p>

            <div className="problem-section">
                <strong>Examples:</strong>
                {problem.examples.map((ex, i) => (
                    <div key={i} className="problem-example">
                        <div><span className="problem-label">Input:</span> {ex.input}</div>
                        <div><span className="problem-label">Output:</span> {ex.output}</div>
                        {ex.explanation && <div><span className="problem-label">Explanation:</span> {ex.explanation}</div>}
                    </div>
                ))}
            </div>

            <div className="problem-section">
                <strong>Constraints:</strong>
                <ul className="problem-constraints">
                    {problem.constraints.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
            </div>
        </div>
    );
};

export default ProblemDisplay;