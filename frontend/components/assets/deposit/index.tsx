import { useState } from 'react';
import { useRouter } from 'next/router';

import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";

// Lib
import { useAuth } from '../../../context/auth';

// Components
import { Form } from "./Elements";

// Utils
const setBodyKey = (value, key, body, setBody) => {
    let _nbody = { ...body };
    _nbody[key] = value;
    setBody(_nbody);
};


export default function  DepositForm({ }) {
    const { user, refreshUser } = useAuth();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const default_body = {
        value: '',
    }
    const [body, setBody] = useState(default_body);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${process.env.BACKEND_URL}/trade/deposit`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(body),
            });

            if (response.ok) {
                const data = await response.json();
                setBody(default_body);
                refreshUser();
                setError(data.message);
            } else {
                setError('error during deposit');
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError('An error occurred');
            setLoading(false);
        }
    };


    return (
        <Form onSubmit={handleSubmit}>
            <p>Each deposit will be transfered to our central vault which has a constant yield at 7% per year.</p>
            <small>Value in $</small>
            <InputText
                keyfilter="money"
                placeholder="1234,00"
                value={body.value}
                onChange={(e) => setBodyKey(e.target.value, 'value', body, setBody)}
                required
            />
            <br/>
            <Button type="submit" className={loading ? 'loading' : ''}>
                {loading ? 'Loading' : 'Deposit'}
            </Button>
            {error ?
                <span>{error}</span>
                :
                <div style={{"visibility": "hidden"}}>.</div>
            }
        </Form>
    );
};