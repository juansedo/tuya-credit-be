export interface JwtPayload {
  userId: number;
  username: string;
  email: string;
  name: string;
  surname: string;
  document: string;
  permissions: string[];
}
