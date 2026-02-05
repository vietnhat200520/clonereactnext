'use client';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hook';


export default function AuthInitializer({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();

 

    return <>{children}</>;
}