import React, { useState, useEffect, useContext } from 'react';
import './details.css';
import { FormData } from '../../types';
import { CarDetailContext } from '../../App';


type DetailsProps = {
    brand: string | null;
}

const DetailsPage: React.FC<DetailsProps> = ({ brand }) => {
    const [formData, setFormData] = useState<FormData>({
        model: '',
        location: '',
        color: '',
        numberOfOwners: '',
        yearOfManufacture: '',
        transmission: '',
        insuranceValidUpto: '',
        externalFitments: '',
        kms: '',
        photo: null,
        price: '',
        type: null,
        fuel: ''
    });

    const { addCarDetail } = useContext(CarDetailContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: files ? files[0] : value,
        }));
    };

    useEffect(() => {
        if (brand) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                model: brand,
            }));
        }
    }, [brand]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const carTypes = ["Sedan", "SUV", "Hatchback", "Convertible", "Minivan", "Truck"];
        const fuelTypes = ['Petrol', 'Diesel', 'CNG'];
        const minAmount = 200000;
        const maxAmount = 6000000;
        const randomAmount = Math.floor(minAmount + Math.random() * (maxAmount - minAmount));
        formData['price'] = randomAmount.toString();
        formData['type'] = carTypes[Math.floor(Math.random() * carTypes.length)];
        formData['fuel'] = fuelTypes[Math.floor(Math.random() * fuelTypes.length)];
        addCarDetail(formData);
        alert('car added successfully');
        setFormData({
            model: '',
            location: '',
            color: '',
            numberOfOwners: '',
            yearOfManufacture: '',
            transmission: '',
            insuranceValidUpto: '',
            externalFitments: '',
            kms: '',
            photo: null,
            price: '',
            type: null,
            fuel: ''
        })
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-field">
                        <label htmlFor="model" >Model:</label>
                        <input type="text" id="model" name="model" value={formData.model} onChange={handleChange} />
                    </div>
                    <div className="form-field">
                        <label htmlFor="location" >Location:</label>
                        <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-field">
                        <label htmlFor="color" >Color:</label>
                        <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} />
                    </div>
                    <div className="form-field">
                        <label htmlFor="numberOfOwners" >No of Owners:</label>
                        <input type="text" id="numberOfOwners" name="numberOfOwners" value={formData.numberOfOwners} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-field">
                        <label htmlFor="yearOfManufacture" >Year Of Manufacture:</label>
                        <input type="text" id="yearOfManufacture" name="yearOfManufacture" value={formData.yearOfManufacture} onChange={handleChange} />
                    </div>
                    <div className="form-field">
                        <label htmlFor="transmission" >Transmission:</label>
                        <input type="text" id="transmission" name="transmission" value={formData.transmission} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-field">
                        <label htmlFor="insuranceValidUpto" >Insurance Valid Upto:</label>
                        <input type="text" id="insuranceValidUpto" name="insuranceValidUpto" value={formData.insuranceValidUpto} onChange={handleChange} />
                    </div>
                    <div className="form-field">
                        <label htmlFor="externalFitments" >External Fitments:</label>
                        <input type="text" id="externalFitments" name="externalFitments" value={formData.externalFitments} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-field">
                        <label htmlFor="kms" >KMS:</label>
                        <input type="text" id="kms" name="kms" value={formData.kms} onChange={handleChange} />
                    </div>
                    <div className="form-field">
                        <label htmlFor="photo" >Photo:</label>
                        <input type="file" id="photo" name="photo" onChange={handleChange} />
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default DetailsPage;
