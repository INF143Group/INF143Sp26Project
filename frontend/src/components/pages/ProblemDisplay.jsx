const difficultyColor = {
    Easy: '#357957',
    Medium: '#8F6200',
    Hard: '#CE2727',
};

const ProblemDisplay = ({ problem, dropdownMode = false }) => {
    if (!problem) return (
        <div className="problem-loading">
            {dropdownMode
                ? 'Pick a problem from the dropdown above to get started.'
                : 'Select an option from the menu to the left in order to get started.'
            }
        </div>
    );

    return (
        <div className="problem-display">
            <div className="problem-header">
                <span className="problem-title">{problem.title}</span>
                <span className="problem-difficulty" style={{paddingTop: '10px', color: difficultyColor[problem.difficulty]}}>
                    {problem.difficulty}
                </span>
            </div>
            <div className="problem-tags">
                {problem.tags?.map(tag => (
                    <span key={tag} className="problem-tag">{tag}</span>
                ))}
            </div>
            <p className="problem-description">{problem.description}</p>
            <div className="problem-section"></div>
        </div>
    );
};

export default ProblemDisplay;