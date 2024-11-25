import Link from "next/link";

const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Acceso Denegado</h1>
        <p className="text-gray-700 mb-6">
          No tienes los permisos necesarios para acceder a esta página.
        </p>
        <div className="flex justify-center">
          <Link
            href="/"
            className="px-6 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 transition duration-300"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
