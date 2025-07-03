import React from 'react';

export const EmptyTemplate = () => (
    <div style={{
        width: '100%',
        height: '100%',
        background: '#18181b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 36,
        fontWeight: 600,
        letterSpacing: 1,
        flexDirection: 'column',
    }}>
        <span>Start your intro video</span>
        <span style={{ fontSize: 18, fontWeight: 400, marginTop: 12, color: '#aaa' }}>Use the controls on the right to begin</span>
    </div>
);

export const emptyTemplateSchema = {
    // No props for empty template
    parse: () => ({}),
};
