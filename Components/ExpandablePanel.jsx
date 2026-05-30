import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * ExpandablePanel
 * Wraps any content panel. When content overflows the panel height, a
 * "Continue Reading…" button appears with a blur fade. Clicking it (or
 * clicking the header label) opens a fullscreen overlay. Escape closes it.
 *
 * Props:
 *   label        - header text shown in the section-tags bar
 *   children     -panel content
 *   overlayClass - extra className applied to the overlay content wrapper
 *   isEditor     - if true, skip overflow detection (editor manages its own scroll)
 */
const ExpandablePanel = ({label, children, overlayClass = ''}) => {
    const [expanded, setExpanded] = useState(false);
    const [overflowing, setOverflowing] = useState(false);
    const contentRef = useRef(null);

    const checkOverflow = useCallback(() => {
        if (!contentRef.current) return;
        const el = contentRef.current;
        setOverflowing(el.scrollHeight > el.clientHeight + 2);
    }, []);

    useEffect(() => {
        checkOverflow();
        const el = contentRef.current;
        if (!el) return;
        const ro = new ResizeObserver(checkOverflow);
        ro.observe(el);
        return () => ro.disconnect();
    }, [checkOverflow]);


    useEffect(() => {
        if (!expanded) return;
        const handler = (e) => { if (e.key === 'Escape') setExpanded(false); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [expanded]);

    useEffect(() => {
        document.body.style.overflow = expanded ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [expanded]);

    const open = () => setExpanded(true);
    const close = () => setExpanded(false);

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0}}>
                <div
                    className="section-tags expandable-header"
                    onClick={open}
                    title={`Expand ${label}`}
                >
                    <p>{label}</p>
                    <span className="expand-icon" aria-hidden="true">⤢</span>
                </div>

                <div className="section-content expandable-body" onClick={open}>
                    <div className="expandable-inner" ref={contentRef}>
                        {children}
                    </div>
                    {overflowing && (
                        <div className="overflow-fade">
                            <button className="continue-reading-btn" onClick={open}>
                                Continue Reading?
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {expanded && (
                <div
                    className="overlay-backdrop"
                    onClick={(e) => { if (e.target === e.currentTarget) close();}}
                >
                    <div className={`overlay-panel ${overlayClass}`}>
                        <button
                            className="overlay-close"
                            onClick={close}
                            aria-label="Close overlay"
                        >
                            ✕
                        </button>
                        <div className="overlay-header">
                            <span className="overlay-title">{label}</span>
                        </div>
                        <div className="overlay-content">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ExpandablePanel;