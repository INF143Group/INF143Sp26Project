import { useState } from 'react';
import CodeEditor from "./CodeEditor.jsx";

const IdePanel = () => {
    const [expanded, setExpanded] = useState(false);
    const [code, setCode]         = useState('');

    return (
        <>
            {/* Header bar — whole bar opens overlay */}
            <div
                className="section-tags expandable-header ide-header"
                onClick={() => setExpanded(true)}
                title="Expand IDE"
            >
                <p>IDE</p>
                <span className="expand-icon" aria-hidden="true">⤢</span>
            </div>

            {/* The base editor - always interactive */}
            <div id="ide-container">
                <CodeEditor value={code} onChange={setCode} />
            </div>

            {/* Fullscreen overlay */}
            {expanded && (
                <div
                    className="overlay-backdrop"
                    onClick={(e) => { if (e.target === e.currentTarget) setExpanded(false); }}
                >
                    <div className="overlay-panel overlay-ide">
                        <button
                            className="overlay-close"
                            onClick={() => setExpanded(false)}
                            aria-label="Close overlay"
                        >✕</button>

                        <div className="overlay-header">
                            <span className="overlay-title">IDE</span>
                        </div>
                        <div className="overlay-content">
                            <div id="ide-container-overlay">
                                <CodeEditor value={code} onChange={setCode} overlayMode={true} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default IdePanel;