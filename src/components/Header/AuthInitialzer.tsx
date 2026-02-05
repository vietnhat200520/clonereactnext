'use client';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hook';
import { checkSession } from '@/store/slices/authSlice';

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        
        dispatch(checkSession());

        
        const interval = setInterval(() => {
            dispatch(checkSession());
        }, 60000);

        return () => clearInterval(interval);
    }, [dispatch]);

    return <>{children}</>;
}