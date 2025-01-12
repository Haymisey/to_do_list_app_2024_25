export interface JwtPayload {
    email: string;
    sub: number; // User ID
    roles: string[]; // User roles (e.g., ['admin', 'user'])
  }
  