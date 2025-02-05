import { User as NextAuthUser } from "next-auth"

declare module "next-auth" {
    interface Session {
      user: {
        id: string | undefined;  
        email: string;
        name?: string | null;
        provider: Provider | null;
        isOAuthUser?: boolean;
      }
    }
  }
  
export interface AuthUser extends NextAuthUser {
    id: string;
    email: string;
    name?: string | null;
    provider: Provider | null;
    isOAuthUser?: boolean;
  }