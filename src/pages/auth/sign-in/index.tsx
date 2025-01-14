import { useState } from "react";
import { useRouter } from "next/router";

import { AuthService } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const authService = new AuthService();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, setUser, setUniversity } = useAuth();

  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await authService.signIn(email, password);
      if (result.success) {
        localStorage.setItem("authToken", result.data.token);
        if (result.data.user.role === "admin") {
          setUser(result.data.user);
          setUniversity(null);
          router.push("/admin");
        } else if (result.data.user.role === "university") {
          setUser(result.data.user);
          setUniversity(result.data.university);
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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return user ? (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">You're logged in.</h1>
      </div>
    </div>
  ) : (
    <div className="flex min-h-screen bg-white">
      <div className="w-1/2">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cd/University-of-Alabama-EngineeringResearchCenter-01.jpg"
          alt="University"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Formulario lateral derecho */}
      <div className="flex items-center justify-center w-1/2 p-8">
        <div
          className="bg-white p-8 rounded-lg max-w-md w-full"
          onKeyDown={handleKeyPress}
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Log In
          </h1>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-black p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Password"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full py-2 bg-page text-black rounded-lg transition duration-300"
          >
            {loading ? "Cargando..." : "Enter"}
          </button>

          {error && (
            <div className="py-2 flex items-center justify-center font-bold mt-2 rounded bg-red-50 text-red-500">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
