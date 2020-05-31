
export interface Address {
    fullAddress: string;
    city: string;
    landmark: string;
}

export interface UserData {
    fName: string;
    mobile: string;
    email: string;
    password: string;
    userType: string;
    addresses?: Address[];
}
