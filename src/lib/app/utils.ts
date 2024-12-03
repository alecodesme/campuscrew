import { Role } from "@/types/Role";
import { getRole } from "@/utils/auth";

export const getUserRole = (): Role | null => {
  const role = getRole();
  return role ? role : null;
};