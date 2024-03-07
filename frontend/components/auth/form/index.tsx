import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { Button } from 'primereact/button';
import { Password } from 'primereact/password'
import { InputText } from "primereact/inputtext";

// Components
import { Form } from "./Elements";



export default function  AuthForm({ }) {
    const router = useRouter()

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    'username': email,
                    'password': password
                }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('access_token', data.access_token);
                router.push('/')

            } else {
                setError('Invalid credentials');
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
            <InputText
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Password
                feedback={false}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <br/>
            <Button type="submit" className={loading ? 'loading' : ''}>
                {loading ? 'Loading' : 'Login'}
            </Button>
            <Button severity="secondary" onClick={() => setError("Please contact an administrator")}>
                I don't have an account yet
            </Button>
            {error ?
                <span>{error}</span>
                :
                <div style={{"visibility": "hidden"}}>.</div>
            }
        </Form>
    );
};