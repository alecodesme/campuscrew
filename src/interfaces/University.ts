export interface University {
    id?: number;
    name: string;
    address: string;
    country: string;
    city: string;
    province: string;
    cellphone: string;
    user_id?: number;
    email: string;
    domain: string;
    status?: 'pending' | 'accepted' | 'declined'; // Estado de la universidad
}