import React from 'react';

const Loader: React.FC<{ message?: string }> = ({ message }) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="loader border-t-4 border-b-4 border-blue-500 w-16 h-16 rounded-full animate-spin"></div>
        {message && <p className="mt-4 text-lg text-gray-700">{message}</p>}
    </div>
);

export default Loader;