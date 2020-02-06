import { Role } from './role'

export class User {
    userId: number;
    userLogin: string;
    userPassword: string;
    userFirstname: string;
    userLastname: string;
    userEmail: string;
    roles: Role[];
    userLastConnection: String;
    userIsDeleted: boolean;
    token?: string;
}