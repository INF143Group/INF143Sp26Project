import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import AnimatedButton from "./FancyButton.jsx";

const CodeEditor = ({ value = '', onChange, overlayMode = false }) => {
    const [activeLine, setActiveLine] = useState(1);
    const [editorWidthCh, setEditorWidthCh] = useState(80);
    const textareaRef    = useRef(null);
    const lineNumbersRef = useRef(null);
    const renderLayerRef = useRef(null);
    const regionRef      = useRef(null);

    // Measure how many characters fit on one row in the editable region
    useEffect(() => {
        if (overlayMode || !regionRef.current) return;
        const measure = () => {
            const el = regionRef.current;
            if (!el) return;
            // Get a temp span to measure 1ch in this font
            const span = document.createElement('span');
            span.style.cssText = 'font-family:monospace;font-size:14px;visibility:hidden;position:absolute;white-space:pre';
            span.textContent = 'x';
            document.body.appendChild(span);
            const chPx = span.getBoundingClientRect().width;
            document.body.removeChild(span);
            if (chPx > 0) {
                const availPx = el.clientWidth - 10; // subtract padding-left
                setEditorWidthCh(Math.floor(availPx / chPx));
            }
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(regionRef.current);
        return () => ro.disconnect();
    }, [overlayMode]);

    const updateActiveLine = useCallback(() => {
        const ta = textareaRef.current;
        if (!ta) return;
        setActiveLine(ta.value.slice(0, ta.selectionStart).split('\n').length);
    }, []);

    const syncScroll = useCallback(() => {
        const ta = textareaRef.current;
        if (!ta) return;
        if (lineNumbersRef.current) lineNumbersRef.current.scrollTop = ta.scrollTop;
        if (renderLayerRef.current) renderLayerRef.current.scrollTop = ta.scrollTop;
    }, []);

    const handleInput = useCallback((e) => {
        onChange(e.target.value);
        updateActiveLine();
    }, [onChange, updateActiveLine]);

    const handleKeyUp  = useCallback(() => updateActiveLine(), [updateActiveLine]);
    const handleClick  = useCallback(() => updateActiveLine(), [updateActiveLine]);
    const handleScroll = useCallback(() => syncScroll(), [syncScroll]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const ta    = textareaRef.current;
            const start = ta.selectionStart;
            const end   = ta.selectionEnd;
            const spaces = '    ';
            const next = ta.value.slice(0, start) + spaces + ta.value.slice(end);
            onChange(next);
            // Restore cursor after controlled update
            requestAnimationFrame(() => {
                ta.selectionStart = ta.selectionEnd = start + spaces.length;
                updateActiveLine();
            });
        }
    }, [onChange, updateActiveLine]);

    // For each logical line, compute how many visual rows it occupies when wrapped
    const gutterSlots = useMemo(() => {
        if (overlayMode) {
            // Overlay: no wrapping, 1 slot per line
            const lines = value === '' ? [''] : value.split('\n');
            return lines.map((_, i) => ({ logicalLine: i + 1, visualRows: 1 }));
        }
        const lines = value === '' ? [''] : value.split('\n');
        return lines.map((line, i) => {
            // First visual row uses full width; continuation rows use (width - 2ch indent)
            if (line.length === 0) return { logicalLine: i + 1, visualRows: 1 };
            const firstRowCh = editorWidthCh;
            if (line.length <= firstRowCh) return { logicalLine: i + 1, visualRows: 1 };
            const remaining = line.length - firstRowCh;
            const contCh = Math.max(editorWidthCh - 2, 1);
            const contRows = Math.ceil(remaining / contCh);
            return { logicalLine: i + 1, visualRows: 1 + contRows };
        });
    }, [value, overlayMode, editorWidthCh]);

    const isInline = !overlayMode;

    return (
        <>
            <div className="editor-wrapper">
                {/* Gutter - one slot per VISUAL row */}
                <div className="line-numbers" ref={lineNumbersRef}>
                    {gutterSlots.map(({ logicalLine, visualRows }) =>
                        Array.from({ length: visualRows }, (_, r) => (
                            <div
                                key={`${logicalLine}-${r}`}
                                className={`line-number-slot${logicalLine === activeLine ? ' line-number-active' : ''}`}
                            >
                                {r === 0 ? logicalLine : ''}
                            </div>
                        ))
                    )}
                </div>

                {/* Editable region */}
                <div className="editable-region" ref={regionRef}>
                    {/* Render layer - inline mode only */}
                    {isInline && (
                        <div className="render-layer" ref={renderLayerRef} aria-hidden="true">
                            {(value === '' ? [''] : value.split('\n')).map((line, i) => (
                                <div key={i} className="render-line">
                                    {line || '\u00A0'}
                                </div>
                            ))}
                        </div>
                    )}

                    <textarea
                        className={`editable-area${isInline ? ' editable-transparent' : ' editable-overlay'}`}
                        ref={textareaRef}
                        value={value}
                        onInput={handleInput}
                        onChange={handleInput}
                        onScroll={handleScroll}
                        onKeyDown={handleKeyDown}
                        onKeyUp={handleKeyUp}
                        onClick={handleClick}
                        spellCheck={false}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        placeholder={isInline ? '// Start typing…' : ''}
                    />
                </div>
            </div>
            <div className="button-wrapper">
                <AnimatedButton
                    text="Run Code"
                    onClick={() => console.log("Run Code linked!")}
                />
            </div>
        </>
    );
};

export default CodeEditor;