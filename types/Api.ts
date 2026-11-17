export interface Product {
    id: number;
    name: string;
    price: string;
    brand: string;
    category: {
        usertype: { usertype: string };
        category: string;
    };
}

export interface Brand {
    id: number;
    brand: string;
}

/** User as returned by GET /api/getUserDetailByEmail (field names differ from the createAccount form). */
export interface UserDetail {
    id: number;
    name: string;
    email: string;
    title: string;
    birth_day: string;
    birth_month: string;
    birth_year: string;
    first_name: string;
    last_name: string;
    company: string;
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
}
