import React, { useState } from 'react';

const MfaForm = () => {
    const [mfaCode, setMfaCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        // API call to verify MFA code
        const response = await fetch('/api/verify-mfa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: mfaCode }),
        });
        console.log('verify-mfa response',response);
        if (response.ok) {
            setSuccess(true);
        } else {
            setError('Invalid MFA code. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="mfaCode">Enter MFA Code:</label>
                <input
                    type="text"
                    id="mfaCode"
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value)}
                    required
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>MFA verified successfully!</p>}
            <button type="submit">Verify</button>
        </form>
    );
};

export default MfaForm;