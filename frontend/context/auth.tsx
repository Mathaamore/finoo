import { createContext, useContext, ReactNode, useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";

export type User = {
    email: string;
    user_id: number;
    token: string;
}

export interface AuthContextType {
    loading: boolean;
    user: User | null;
    redirectUserToLogin: VoidFunction;
    refreshUser: (callback?: (user: User, error?: Error) => void) => void;
    authenticateUser: (code: string, callback?: (user: User, err?: Error) => void) => void;
}

const getParams = (): string | null => localStorage.getItem('ssoParam') || null
const saveToken = (token: string) => localStorage.setItem('access_token', token);
const getToken = (): string | null => localStorage.getItem('access_token') || null;
const removeToken = () => localStorage.removeItem('access_token');

export const AuthContext = createContext<AuthContextType>(undefined!);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter()
    const [initializing, setInitializing] = useState(true);
    const [networkLoading, setNetworkLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null)

    const redirectUserToLogin = () => {
        router.push('/auth/login');
    };

    const authenticateUser = (code: string, callback?: (user: User, error?: Error) => void): void => {
        if (networkLoading || getToken()) return;
        setNetworkLoading(true);
        fetch(`${process.env.BACKEND_URL}/auth/login_sso`,
            {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: code, params: getParams() }),
            })
            .then((response) => response.json())
            .then((data) => {
                saveToken(data.access_token);
                refreshUser(callback);
            })
            .finally(() =>
                setNetworkLoading(false)
            )
    }

    const refreshUser = (callback?: (user?: User, error?: Error) => void) => {
        const accessToken = getToken();
        if (!accessToken) {
            redirectUserToLogin()
        }

        setNetworkLoading(true);
        fetch(
            `${process.env.BACKEND_URL}/auth/whoami`,
            {
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json().then((data) => {
                        setUser(data);
                        if (callback) {
                            callback(user);
                        }
                    });
                }
                if (callback) {
                    callback(undefined, new Error('Error fetching user data'))
                }
            })
            .finally(() => {
                setNetworkLoading(false);
            })
    }

    useEffect(() => {
        const accessToken = getToken();

        if (accessToken) {
            return refreshUser((_, error) => {
                setInitializing(false);
                if (error) {
                    console.warn('Cannot authenticate user', error);
                    removeToken();
                }
            })
        }

        redirectUserToLogin()
    }, []);

    useEffect(() => {
        if(router.pathname === '/auth/login'){
            setInitializing(false);
        };
    }, [router.pathname])

    const loading = useMemo(() => {
        return initializing || networkLoading;
    }, [initializing, networkLoading])

    const value: AuthContextType = {
        loading,
        user,
        refreshUser,
        redirectUserToLogin,
        authenticateUser
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}