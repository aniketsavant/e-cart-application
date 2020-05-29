
export interface Address {
    fullAddress: string;
    city: string;
    landmark: string;
    latitude: string;
    longitude: string;
}

export interface UserData {
    fName: string;
    mobile: string;
    email: string;
    consumerCode: string;
    password: string;
    userType: string;
    addresses?: Address[];
}
