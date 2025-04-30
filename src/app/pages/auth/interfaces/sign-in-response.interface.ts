import { AuthInterface, RoleInterface, UserInterface } from '@modules/auth/interfaces';

export interface SignInResponseInterface {
    data: Data;
    message: string;
    title: string;
    accessToken: string;
}

interface Data {
    auth: AuthInterface;
    accessToken: string;
    roles: RoleInterface[];
}
