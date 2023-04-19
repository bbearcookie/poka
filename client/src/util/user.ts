import { Role } from '@type/user';

export function isAdmin(role: Role) {
  if (role === 'root' || role === 'admin') return true;
  return false;
}
