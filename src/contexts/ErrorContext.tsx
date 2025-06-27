import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { setGlobalErrorSetter } from '@/lib/api_v2';

interface ErrorContextType {
    setError: (msg: string) => void;
}

const ErrorContext = createContext<ErrorContextType>({ setError: () => { } });

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }: { children: ReactNode; }) => {
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setGlobalErrorSetter(setError);
        return () => setGlobalErrorSetter(() => { });
    }, []);

    return (
        <ErrorContext.Provider value={{ setError }}>
            {children}
            <Snackbar
                open={!!error}
                autoHideDuration={4000}
                onClose={() => setError('')}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </ErrorContext.Provider>
    );
};