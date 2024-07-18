export interface RegistrationDetails {
    email: string;
    password: string;
    age: number | undefined;
}

export interface RegistrationResponse {
    created:boolean;
    message:string;
}

export interface LoginDetails {
    email: string;
    password: string;
}

export interface UserDetails{
    email:string;
    age: number;
    message: string;
}