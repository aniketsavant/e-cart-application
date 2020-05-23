
export interface Address {
    full_address: string;
    city: string;
    landmark: string;
    latitude: string;
    longitude: string;
}

export interface UserData {
    fName: string;
    mobile: string;
    password: string;
    userType: string;
    addresses?: Address[];
}
