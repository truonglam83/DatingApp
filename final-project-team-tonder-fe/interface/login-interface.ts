export interface ILoginPhone {
    id?: string;
    phone?: string;
    email?: string | null;
    name?: string | null;
    isPhoneConfirmed?: boolean;
}

export interface ICreateUser {
    name: string;
    email: string;
    age: string;
    gender: string;
}
