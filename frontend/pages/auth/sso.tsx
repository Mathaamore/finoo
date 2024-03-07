import { useRouter, } from 'next/router';
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react';
import styled from "styled-components"
import { useAuth } from '../../context/auth';

const Loader = styled.div`
    width: 100%;
    margin-top: 60px;
    height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @keyframes rotation {
      0% {
          transform: rotate(0deg);
      }
      100% {
          transform: rotate(360deg);
      }
    }

    span{
      width: 48px;
      height: 48px;
      border: 5px solid var(--primary-color);
      border-bottom-color: transparent;
      border-radius: 50%;
      display: inline-block;
      box-sizing: border-box;
      animation: rotation 1s linear infinite;
    }
`
function SSOPage() {
    const router = useRouter()
    const { authenticateUser, loading } = useAuth();
    const [code, setCode] = useState(null);

    useEffect(() => {
        setCode(router.query.code);
        if (router.query.error) {
            alert(router.query.error);
            router.push('/');
            return;
        }
    }, [router.query?.code]);

    useEffect(() => {
        if (!code || loading) {
            return;
        }
        authenticateUser(code as string, (user, error: Error) => {
            if (error) {
                alert(error.message);
            }
            return router.push('/');
        })
    }, [loading, code])

    return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'black' }}>
            <Loader>
                <span />
            </Loader>
        </div>
    );
}

export default SSOPage;
