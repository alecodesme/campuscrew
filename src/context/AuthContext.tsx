import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { User } from '../interfaces/User';
import Loader from '@/components/app/loaders/Loader';
import { BASE_URL } from '@/api/api';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    logout: () => void;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Rutas públicas y protegidas
    const publicRoutes = ['/', '/joinus', '/auth/sign-in'];
    const protectedRoutes = ['/admin', '/universities', '/university', '/clubs'];
    const adminRoutes = ['/admin', '/universities'];
    const universityRoutes = ['/university', '/clubs'];

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            // Si no hay token y se intenta acceder a rutas protegidas
            if (protectedRoutes.includes(router.pathname)) {
                router.replace('/auth/sign-in');
            } else {
                // Si está en rutas públicas, permitir acceso
                setLoading(false);
            }
        } else {
            // Si hay token, obtener datos del usuario
            fetchUserData(token);
        }
    }, [router.pathname]);

    const fetchUserData = async (token: string) => {
        try {
            const response = await axios.get(BASE_URL + '/user', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const userData = response.data;
            setUser(userData);
        } catch (error) {
            setUser(null);
            localStorage.removeItem('authToken');
            router.replace('/auth/sign-in');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (loading) return;

        const currentPath = router.pathname;

        if (publicRoutes.includes(currentPath)) {
            // Si la ruta es pública, permitir acceso
            return;
        }

        if (!user) {
            // Si no hay usuario y la ruta no es pública, redirigir al login
            router.push('/auth/sign-in');
            return;
        }

        if (user.role === 'admin' && !adminRoutes.includes(currentPath)) {
            // Si el rol es admin y la ruta no es válida, redirigir a /admin
            router.push('/admin');
        } else if (user.role === 'university' && !universityRoutes.includes(currentPath)) {
            // Si el rol es university y la ruta no es válida, redirigir a /university
            router.push('/university');
        }
    }, [user, router.pathname, loading]);

    const logout = () => {
        setUser(null);
        localStorage.removeItem('authToken');
        router.push('/auth/sign-in');
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout, setUser }}>
            <div className={`page-transition ${loading ? 'loading' : ''} transition-opacity duration-1000 ease-in-out ${loading ? 'opacity-0' : 'opacity-100'}`}>
                {loading ? <Loader /> : children}
            </div>
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};
