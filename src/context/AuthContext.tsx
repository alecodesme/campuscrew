import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { User } from '../interfaces/User';
import Loader from '@/components/app/loaders/Loader';
import { BASE_URL } from '@/api/api';
import { University } from '@/interfaces/University';

interface AuthContextType {
    user: User | null;
    university: University | null;
    loading: boolean;
    logout: () => void;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    setUniversity: React.Dispatch<React.SetStateAction<University | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [university, setUniversity] = useState<University | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const publicRoutes = ['/', '/joinus', '/auth/sign-in', '/student', '/gallery'];
    const protectedRoutes = ['/admin', '/universities', '/university', '/clubs'];
    const adminRoutes = ['/admin', '/universities'];
    const universityRoutes = ['/university', '/clubs'];

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            if (protectedRoutes.includes(router.pathname)) {
                router.replace('/auth/sign-in');
            } else {
                setLoading(false);
            }
        } else {
            fetchUserData(token);
        }
    }, [router.pathname]);

    const fetchUserData = async (token: string) => {
        try {
            const response = await axios.get(BASE_URL + '/user', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const userData = response.data;
            if (userData.user.role == 'admin') {
                setUser(userData.user);
                setUniversity(null)
            } else {
                setUser(userData.user);
                setUniversity(userData.university)
            }

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
            return;
        }

        if (!user) {
            router.push('/auth/sign-in');
            return;
        }

        if (user.role === 'admin' && !adminRoutes.includes(currentPath)) {
            router.push('/admin');
        } else if (user.role === 'university' && !universityRoutes.includes(currentPath)) {
            router.push('/university');
        }
    }, [user, router.pathname, loading]);

    const logout = () => {
        setUser(null);
        localStorage.removeItem('authToken');
        router.push('/auth/sign-in');
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout, setUser, setUniversity, university }}>
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
