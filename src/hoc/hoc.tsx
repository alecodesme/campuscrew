// lib/withRoleProtection.tsx
import { getUserRole, Role } from '@/lib/app/utils';
import { useRouter } from 'next/router';
import { useEffect, useState, ComponentType } from 'react';


interface WithRoleProtectionProps {
  // Aquí puedes agregar otros props si tu componente lo necesita
  userId: number;
}

// HOC para proteger las rutas según el rol
const withRoleProtection = <P extends WithRoleProtectionProps>(
  WrappedComponent: ComponentType<P>,
  allowedRoles: Role[] = [] // Roles permitidos para la página
) => {
  const WithRoleProtection: React.FC<P> = (props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const userRole = getUserRole(); // Obtener el rol del usuario

    useEffect(() => {
      // Si el usuario ya tiene un rol
      if (userRole) {
        // Si el usuario está logueado y tratando de acceder al login, redirigir
        if (router.pathname === '/auth/sign-in') {
          if (userRole === 'admin') {
            router.replace('/admin'); // Redirigir a la página de admin
          } else if (userRole === 'university') {
            router.replace('/university'); // Redirigir a la página de universidad
          }
          return; // Salir de la función para evitar que se ejecute el resto
        }

        // Verificar si el rol del usuario tiene acceso a esta página
        if (!allowedRoles.includes(userRole)) {
          router.replace('/unauthorized'); // Redirigir a la página de acceso denegado
          return; // Salir de la función
        }
      } else {
        // Si el usuario no está logueado y trata de acceder a una página protegida, redirigirlo a login
        if (allowedRoles.length > 0) {
          router.replace('/auth/sign-in'); // Redirigir al login
          return; // Salir de la función
        }
      }

      // Si el usuario tiene acceso, cargar la página
      setIsLoading(false);
    }, [userRole, router, allowedRoles]);

    if (isLoading) {
      return <div>Loading...</div>; // Mostrar un mensaje de carga o spinner
    }

    return <WrappedComponent {...props} />;
  };

  return WithRoleProtection;
};

export default withRoleProtection;
