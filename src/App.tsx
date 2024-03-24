import React, { useState, useCallback, lazy, Suspense, createContext } from 'react';
import './App.css';
import Logos from './components/logo/Logos';
import Nav from './components/nav/Nav';
import { Route, Routes } from 'react-router-dom';
import { FormData } from './types';
import Home from './components/home/Home';
const Details = lazy(() => import('./components/detail/Details'));

type Brand = {
  name: string;
}

type CarDetailContextType = {
  carDetails: FormData[];
  addCarDetail: (detail: FormData) => void;
};

const initialCarDetailContext: CarDetailContextType = {
  carDetails: [],
  addCarDetail: () => { },
};

export const CarDetailContext = createContext<CarDetailContextType>(initialCarDetailContext);

const carsDetails = [
  {
    "model": "Toyota Corolla",
    "location": "Bangalore",
    "color": "Silver",
    "numberOfOwners": "1",
    "yearOfManufacture": "2018",
    "transmission": "Automatic",
    "insuranceValidUpto": "2023-05-15",
    "externalFitments": "Alloy Wheels",
    "kms": "35000",
    "photo": "https://stimg2.cardekho.com/images/carNewsEditorImages/816x544/20190123_101642/23087/toyota0.jpg",
    "price": "500000",
    "type": "Sedan",
    "fuel": "Petrol"
  },
  {
    "model": "Honda Civic",
    "location": "Hyderabad",
    "color": "Black",
    "numberOfOwners": "2",
    "yearOfManufacture": "2017",
    "transmission": "Manual",
    "insuranceValidUpto": "2022-09-20",
    "externalFitments": "Sunroof",
    "kms": "50000",
    "photo": "https://cdn.zeebiz.com/sites/default/files/styles/zeebiz_850x478/public/2019/02/13/73961-honda-civic1.JPG?itok=RRZyBgT4&c=369ffe2b2db4e2cf3a721d9313cba325",
    "price": "350000",
    "type": "Convertible",
    "fuel": "Diesel",

  },
  {
    "model": "Ford EcoSport",
    "location": "Chennai",
    "color": "Red",
    "numberOfOwners": "1",
    "yearOfManufacture": "2019",
    "transmission": "Automatic",
    "insuranceValidUpto": "2024-03-10",
    "externalFitments": "Roof Rails",
    "kms": "25000",
    "photo": "https://stimg.cardekho.com/images/carexteriorimages/930x620/Ford/Ford-Ecosport-2013-2015/2461/front-left-side-47.jpg?imwidth=890&impolicy=resize",
    "price": "700000",
    "type": "SUV",
    "fuel": "CNG"
  }
]


const App = () => {
  const [brand, setBrand] = useState<Brand>();
  const [carDetails, setCarDetails] = useState<FormData[]>(carsDetails);

  const addCarDetail = (detail: FormData) => {
    setCarDetails((prevDetails) => [...prevDetails, detail]);
  };

  const handleBrandChange = (brandName: string) => {
    setBrand((preState) => {
      const newState = { ...preState };
      newState.name = preState?.name === brandName ? undefined : brandName;
      return newState;
    });
  }

  const memHandleBrandChange = useCallback(
    (name: string) => handleBrandChange(name),
    [],
  )


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CarDetailContext.Provider value={{ carDetails, addCarDetail }}>
        <Routes>
          <Route path="/" element={<>
            <Nav />
            <Logos selectedLogo={memHandleBrandChange} />
            {brand?.name && <Details brand={brand?.name ?? null} />}
          </>} />
          <Route path='home' element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </CarDetailContext.Provider>
    </Suspense>
  );
}

export default App;
