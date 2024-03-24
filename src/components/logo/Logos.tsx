import React, { useEffect } from 'react';
import { state, AppDispatch } from '../../store/store';
import { fetchLogos } from "../../store/slices/logoReducer";
import { useDispatch, useSelector } from 'react-redux';
import "./logos.css";



type LogosProps = {
    selectedLogo: (name: string) => void;
}

const Logos: React.FC<LogosProps> = ({ selectedLogo }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { logos, loading, error } = useSelector((state: state) => state.logos);


    useEffect(() => {
        dispatch(fetchLogos());
    }, [dispatch]);

    if (loading) return <div className="loading-container">Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='logos'>
            {
                logos.map((carLogo, index: number) => (
                    <div className='grid-item' key={`carlogs-${index}`} onClick={() => selectedLogo(carLogo.name)}>
                        <img src={carLogo.imageURL} alt={carLogo.name} />
                    </div>
                ))
            }
        </div >
    )
}

export default Logos