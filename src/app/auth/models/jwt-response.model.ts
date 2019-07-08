import { User } from './user.model';

export class JwtResponse {
  expiresIn: number;
  accessToken: string;
  user: User;
}
