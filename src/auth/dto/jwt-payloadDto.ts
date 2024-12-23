export interface JwtPayload {
  _id: string; // Typically the user ID
  username: string; // The user's username
  role: string; // The user's role
}
