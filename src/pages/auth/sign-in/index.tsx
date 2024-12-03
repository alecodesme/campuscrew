import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { User } from "@/interfaces/User";
import { AuthService } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";



const LoginPage = () => {
  const authService = new AuthService();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, setUser } = useAuth()

  const router = useRouter()

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await authService.signIn(email, password);
      console.log(result)
      if (result.success) {

        localStorage.setItem("authToken", result.data.token);

        // Redirigir según el rol
        if (result.data.user.role === "admin") {
          setUser(result.data.user)
          router.push("/admin");
        } else if (result.data.user.role === "university") {
          router.push("/university");
        }
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return user ? (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">You're logged in.</h1>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Inicio de Sesión</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Usuario</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2  text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Escribe tu usuario"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-black p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Escribe tu contraseña"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          {
            loading ? "Cargando..." : 'Iniciar Sesión'
          }
        </button>

        {error && <div className="py-2 flex items-center justify-center font-bold mt-2 rounded bg-red-50 text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default LoginPage
