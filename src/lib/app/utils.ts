
// Definir los tipos para los roles permitidos
export type Role = 'admin' | 'university' | 'user' | "guest"; // Agregar roles adicionales según sea necesario
export const getUserRole = (): Role | null => {
    if (typeof document !== "undefined") {
      const cookieString = document.cookie || "";
      const cookies = cookieString.split("; ").reduce((acc, cookie) => {
        const [key, value] = cookie.split("=");
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);
  
      return (cookies["user_role"] as Role) || null;
    }
    return null; // Devuelve null si no está en un entorno del cliente
  };

  export const getCookie = (name: string): string | null => {
    if (typeof document !== "undefined") {
      const cookieString = document.cookie || "";
      const cookies = cookieString.split(";").map(cookie => cookie.trim());
  
      // Buscar la cookie específica por nombre y devolver la cadena completa
      for (const cookie of cookies) {
        if (cookie.startsWith(name + "=")) {
          return cookie; // Retorna la cookie completa, incluyendo nombre, valor, expires y path
        }
      }
    }
    return null; // Si la cookie no existe, devuelve null
  };

  export const deleteCookie = (name: string) => {
    if (typeof document !== "undefined") {
      // Establecer la cookie con una fecha de expiración en el pasado
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  };