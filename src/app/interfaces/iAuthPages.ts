
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

export interface UserList {
    user_id: string;
    full_name: string;
    phone: string;
    email: string;
    full_address: string;
    city: string;
    state?: string;
    country?: string;
    landmark: string;
    role: string;
    status: string;
  }
