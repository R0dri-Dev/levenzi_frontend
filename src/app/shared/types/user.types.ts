export interface UserIdentity {
    name: string;
    email: string;
    avatar?: string;
    initials?: string;
}

export interface User extends UserIdentity {
    id: number | string;
    role?: string;
    permissions?: string[];
}
