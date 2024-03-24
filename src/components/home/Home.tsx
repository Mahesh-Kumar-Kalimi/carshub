import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, state } from "../../store/store";
import "./home.css";
import { fetchLogos } from "../../store/slices/logoReducer";

import { CarDetailContext } from "../../App";
import { FormData } from "../../types";

function debounce<F extends (...args: any[]) => void>(callback: F, delay: number = 300): (...args: Parameters<F>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<F>) => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => callback(...args), delay);
    };
}
interface Filters {
    location: string;
    bodyType: string;
    owners: string;
    budget: string;
    fuelType: string;
    transmission: string;
    brands: string[];
}

const initialFilterState: Filters = {
    location: "",
    bodyType: "",
    owners: "",
    budget: "",
    fuelType: "",
    transmission: "",
    brands: [],
};
const Home: React.FC = () => {
    const { logos } = useSelector((state: state) => state.logos);
    const names = logos.map((logo) => logo.name);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if (logos.length === 0) {
            dispatch(fetchLogos());
        }
    }, [dispatch, logos]);

    const { carDetails } = useContext(CarDetailContext);

    const [selectedCars, setSelectedCars] = useState<FormData[]>([...carDetails]);

    const [filters, setFilters] = useState<Filters>(initialFilterState);
    useEffect(() => {
        let filtered: FormData[] = [];
        filtered = filters.location ? carDetails.filter((car) => car.location.toLowerCase() === filters.location) : carDetails;
        if (filters.bodyType) {
            filtered = filtered.filter((car) => car.type?.includes(filters.bodyType));
        }
        if (filters.owners) {
            filtered = filtered.filter((car) => car.numberOfOwners === filters.owners);
        }
        if (filters.budget) {

            if (filters.budget === "lessThan2L") {
                filtered = filtered.filter((car) => {
                    const price = parseInt(car.price, 10);
                    return price < 200000;
                });
            } else if (filters.budget === "2L-4L") {
                filtered = filtered.filter((car) => {
                    const price = parseInt(car.price, 10);
                    return price >= 200000 && price < 400000;
                });
            } else if (filters.budget === "4L-6L") {
                filtered = filtered.filter((car) => {
                    const price = parseInt(car.price, 10);
                    return price >= 400000 && price < 600000;
                });
            } else if (filters.budget === "moreThan6L") {
                filtered = filtered.filter((car) => {
                    const price = parseInt(car.price, 10);
                    return price >= 600000;
                });
            }
        }
        if (filters.fuelType) {
            filtered = filtered.filter((car) => car.fuel === filters.fuelType);
        }
        if (filters.transmission) {
            filtered = filtered.filter((car) => car.transmission === filters.transmission);
        }
        if (filters.brands.length > 0) {
            filtered = filtered.filter((car) => filters.brands.includes(car.model));
        }

        setSelectedCars(filtered);
    }, [filters, carDetails]);

    const handleFilterChange = (filterName: string, value: string) => {
        if (filterName === "brands") {
            setFilters((prevFilters) => ({
                ...prevFilters,
                brands: prevFilters.brands.includes(value)
                    ? prevFilters.brands.filter(b => b !== value)
                    : [...prevFilters.brands, value],
            }));
        }
        else {
            setFilters((prevFilters) => ({
                ...prevFilters,
                [filterName]: value,
            }));
        }
    }

    const debouncedBodyTypeChange = debounce((value: string) => {
        handleFilterChange('bodyType', value);
    }, 300);

    return (
        <div className="container">
            <div>
                <div>
                    <label htmlFor="location">Location:</label>
                    <select
                        name="location"
                        id="location"
                        onChange={(e) => handleFilterChange('location', e.target.value)}
                    >
                        <option value="">Select Location</option>
                        <option value="bangalore">Bangalore</option>
                        <option value="hyderabad">Hyderabad</option>
                        <option value="chennai">Chennai</option>
                        <option value="andhrapradesh">Andhra Pradesh</option>
                        <option value="delhi">Delhi</option>
                        <option value="mumbai">Mumbai</option>
                        <option value="kolkata">Kolkata</option>
                    </select>
                </div>
                <div>
                    <div>
                        <label htmlFor="bodyType">Body Type:</label>
                        <input
                            type="text"
                            id="bodyType"
                            name="bodyType"
                            list="bodyTypes"
                            onChange={(e) => debouncedBodyTypeChange(e.target.value)}
                        />
                        <datalist id="bodyTypes">
                            <option value="Sedan" />
                            <option value="SUV" />
                            <option value="Hatchback" />
                            <option value="Convertible" />
                            <option value="Minivan" />
                            <option value="Truck" />
                        </datalist>
                    </div>
                </div>
                <div>
                    <div className="brand-title">Brand</div>
                    {names.map((name, index) => (
                        <div key={index}>
                            <input
                                type="checkbox"
                                id={name}
                                name={name}
                                onChange={() => {
                                    handleFilterChange('brands', name);
                                }}
                            />
                            <label htmlFor={name}>{name}</label>
                        </div>
                    ))}
                </div>
                <div>
                    <div className="owners-title">Owners</div>
                    <div>
                        <input
                            type="radio"
                            id="1stOwner"
                            name="owner"
                            value="1stOwner"
                            onChange={() => handleFilterChange('owners', "1")}
                        />
                        <label htmlFor="1stOwner">1st Owner</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="2ndOwner"
                            name="owner"
                            value="2ndOwner"
                            onChange={() => handleFilterChange('owners', "2")}
                        />
                        <label htmlFor="2ndOwner">2nd Owner</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="3rdOwner"
                            name="owner"
                            value="3rdOwner"
                            onChange={() => handleFilterChange('owners', "3")}
                        />
                        <label htmlFor="3rdOwner">3rd Owner</label>
                    </div>
                </div>
                <div>
                    <div className="budget-title">Budget</div>
                    <div className="budget-options">
                        <button
                            className={`budget-option ${filters.budget === "lessThan2L" ? "selected" : ""
                                }`}
                            onClick={() => handleFilterChange('budget', "lessThan2L")}
                        >
                            Less than 2L
                        </button>
                        <button
                            className={`budget-option ${filters.budget === "2L-4L" ? "selected" : ""
                                }`}
                            onClick={() => handleFilterChange('budget', "2L-4L")}
                        >
                            2L-4L
                        </button>
                        <button
                            className={`budget-option ${filters.budget === "4L-6L" ? "selected" : ""
                                }`}
                            onClick={() => handleFilterChange('budget', "4L-6L")}
                        >
                            4L-6L
                        </button>
                        <button
                            className={`budget-option ${filters.budget === "moreThan6L" ? "selected" : ""
                                }`}
                            onClick={() => handleFilterChange('budget', "moreThan6L")}
                        >
                            More than 6L
                        </button>
                    </div>
                </div>
                <div>
                    <div className="fuel-title">Fuel Type</div>
                    <div>
                        <input
                            type="radio"
                            id="petrol"
                            name="fuel"
                            value="Petrol"
                            onChange={() => handleFilterChange('fuelType', "petrol")}
                        />
                        <label htmlFor="petrol">Petrol</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="diesel"
                            name="fuel"
                            value="Diesel"
                            onChange={() => handleFilterChange('fuelType', "diesel")}
                        />
                        <label htmlFor="diesel">Diesel</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="cng"
                            name="fuel"
                            value="CNG"
                            onChange={() => handleFilterChange('fuelType', "cng")}
                        />
                        <label htmlFor="cng">CNG</label>
                    </div>
                </div>
                <div>
                    <div className="transmission-title">Transmission</div>
                    <div>
                        <input
                            type="radio"
                            id="automatic"
                            name="transmission"
                            value="Automatic"
                            onChange={() => handleFilterChange("transmission", "automatic")}
                        />
                        <label htmlFor="automatic">Automatic</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="manual"
                            name="transmission"
                            value="Manual"
                            onChange={() => handleFilterChange("transmission", "manual")}
                        />
                        <label htmlFor="manual">Manual</label>
                    </div>
                </div>
            </div>

            <div className="carGallery">
                {selectedCars &&
                    selectedCars.map((car, index) => (
                        <div key={index} className="car-details">
                            {car.photo && typeof car.photo === "string" ? (
                                <img src={car.photo} alt={car.model} />
                            ) : null}
                            <div>Model: {car.model}</div>
                            <div>Location: {car.location}</div>
                            <div>Color: {car.color}</div>
                            <div>Number of Owners: {car.numberOfOwners}</div>
                            <div>Year of Manufacture: {car.yearOfManufacture}</div>
                            <div>Transmission: {car.transmission}</div>
                            <div>Insurance Valid Upto: {car.insuranceValidUpto}</div>
                            <div>External Fitments: {car.externalFitments}</div>
                            <div>Kilometers Driven: {car.kms}</div>
                            <div>Price: {car.price}</div>
                            <div>Type: {car.type}</div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Home;
