import { useState } from "react";
import { useRouter } from "next/router";
import withRoleProtection from "@/hoc/hoc";

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState<"admin" | "university" | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Función para establecer una cookie
  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
  };

  const handleLogin = () => {
    if (!selectedRole) {
      alert("Por favor, selecciona un rol antes de continuar.");
      return;
    }

    // Simular autenticación básica
    if (username === "admin" && password === "admin" && selectedRole === "admin") {
      setCookie("user_role", "admin", 1); // Establecer cookie con rol 'admin'
      router.push("/admin");
    } else if (username === "university" && password === "university" && selectedRole === "university") {
      setCookie("user_role", "university", 1); // Establecer cookie con rol 'university'
      router.push("/university");
    } else {
      alert("Credenciales incorrectas. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Inicio de Sesión</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Escribe tu usuario"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Escribe tu contraseña"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Selecciona tu rol</label>
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedRole("admin")}
              className={`p-2 w-full rounded-lg border ${
                selectedRole === "admin" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              Administrador
            </button>
            <button
              onClick={() => setSelectedRole("university")}
              className={`p-2 w-full rounded-lg border ${
                selectedRole === "university" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              Universidad
            </button>
          </div>
        </div>
        <button
          onClick={handleLogin}
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

export default withRoleProtection(LoginPage,  []);
