export interface CarLogo {
    name: string;
    imageURL: string;
}

export interface LogosState {
    logos: CarLogo[];
    loading: boolean;
    error: string | any;
}

export interface FormData {
    model: string;
    location: string;
    color: string;
    numberOfOwners: string;
    yearOfManufacture: string;
    transmission: string;
    insuranceValidUpto: string;
    externalFitments: string;
    kms: string;
    photo: File | null | string;
    price: string;
    type: string | null;
    fuel: string
};