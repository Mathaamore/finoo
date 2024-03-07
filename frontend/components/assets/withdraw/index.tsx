import { useState } from 'react';

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


export default function  WithdrawForm({ deposit }) {
    const { user, refreshUser } = useAuth();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const default_body = {
        deposit_id: deposit.id,
        value_dollar: null,
    }
    const [body, setBody] = useState(default_body);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${process.env.BACKEND_URL}/trade/withdraw`, {
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
                refreshUser();
                setError(data.message);
            } else {
                const data = await response.json();
                setError(data.message);
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
            <small>Value in $</small>
            <InputText
                keyfilter="money"
                placeholder="1234,00"
                value={body.value_dollar}
                onChange={(e) => setBodyKey(e.target.value, 'value_dollar', body, setBody)}
                required
            />
            <br/>
            <Button type="submit" className={loading ? 'loading' : ''}>
                {loading ? 'Loading' : 'Withdraw assets'}
            </Button>
            {error ?
                <span>{error}</span>
                :
                <div style={{"visibility": "hidden"}}>.</div>
            }
        </Form>
    );
};