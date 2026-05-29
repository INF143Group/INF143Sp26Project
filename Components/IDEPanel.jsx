import { useState } from 'react';
import CodeEditor from "./CodeEditor.jsx";

const LANGUAGES = [
    { label: 'Python',   language: 'python', version: '3.10.0' },
    { label: 'Java',     language: 'java',   version: '15.0.2' },
    { label: 'C++ (GCC)', language: 'c++',   version: '10.2.0' },
];
const IdePanel = () => {
    const [expanded, setExpanded] = useState(false);
    const [code, setCode]         = useState('');
    const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);

    const handleLangChange = (e) => {
        setSelectedLang(LANGUAGES.find(l => l.language === e.target.value));
    };

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

            {/* Language selector */}
            <div style={{ padding: '4px 8px' }}>
                <select value={selectedLang.language} onChange={handleLangChange}
                    style={{ background: '#2d2d2d', color: '#d4d4d4', border: '1px solid #555',
                            borderRadius: '4px', padding: '3px 8px', fontSize: '13px' }}>
                    {LANGUAGES.map(l => (
                        <option key={l.language} value={l.language}>{l.label}</option>
                    ))}
                </select>
            </div>


            {/* The base editor - always interactive */}
            <div id="ide-container">
                <CodeEditor
                    value={code}
                    onChange={setCode}
                    language={selectedLang.language}
                    version={selectedLang.version}
                />
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
                                <CodeEditor
                                    value={code}
                                    onChange={setCode}
                                    overlayMode={true}
                                    language={selectedLang.language}
                                    version={selectedLang.version}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default IdePanel;