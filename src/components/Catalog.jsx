
import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import RentCard from './RentCar';
import { getAllCars } from '../axios/carAxios';
import Car from './Car';

const Catalog = () => {
    const [openPage, setOpenPage] = useState(false);
    const [cars, setCars] = useState([]); // Initialize cars state as an empty array

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllCars(); // Fetch car data from the API
                if (Array.isArray(data)) {
                    setCars(data); // Update the cars state with the fetched data if it is an array
                } else {
                    console.error('Data fetched is not an array:', data);
                }
            } catch (error) {
                console.error('Error fetching car data:', error);
            }
        };

        fetchData();
    }, []);

    return (
       
        <div className="catalog">
           
                {cars.length === 0 ? (
                    <p>Loading...</p>
                ) : (
                    cars.map((car) => (
                        <Car car={car}/>
                    ))
                )}
          
        </div>
    );
}

export default Catalog;
 // <div className="catalog">
        //     <Dialog style={{ minWidth: '50vw', maxWidth: '70vw', height: '90%', textAlign: 'center' }} onHide={() => setVisible(false)} visible={visible}>
        //         {cars.length === 0 ? (
        //             <p>Loading...</p>
        //         ) : (
        //             cars.map((car) => (
        //                 <Car key={car.id} car={car} setVisible={setVisible} />
        //             ))
        //         )}
        //     </Dialog>
        // </div>