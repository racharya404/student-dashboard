export interface Student {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    company: {
        name: string;
    };
    address: {
        street: string;
        city: string;
        zipcode: string;
    };
    flagged?: boolean;
    tags: string[];
    group?: string;
}