

import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Calendar } from 'primereact/calendar';
import {addRenting} from '../axios/rentingAxios'
import { useLocation, useNavigate } from 'react-router-dom';
import {getAllModels} from '../axios/modelAxios'
import swal from 'sweetalert';
const RentCard = () => {
   
const location = useLocation();
  const { state } = location;
  const car = state ? state.carr : null;

 
    const [selectedColor, setSelectedColor] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [returnDate, setReturnDate] = useState(null); 
       const [adding,setAdding]=useState(0)
       const [model,setModel]=useState()
       const [mode,setMode]=useState()

    const [price,setPrice]=useState(car.price)
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = month === 0 ? 11 : month - 1;
    let prevYear = prevMonth === 11 ? year - 1 : year;
    let nextMonth = month === 11 ? 0 : month + 1;
    let nextYear = nextMonth === 0 ? year + 1 : year;
    const navigate = useNavigate();

    const categories = [
        { name: 'כסא תינוק', key: 'A' },
        { name: 'קוסטר', key: 'M' },
        { name: 'נהג', key: 'P' },
        { name: 'waze', key: 'R' },
        { name: 'כיסוי נזקים', key: 'l' }
    ];
    const [selectedCategories, setSelectedCategories] = useState({});


const onCategoryChange = (e) => {
    const key = e.value.key;
    const isChecked = e.checked;
    const categoryPriceChange = isChecked ? 500 : -500;

    if (isChecked) {
        setSelectedCategories({ ...selectedCategories, [key]: true });
        setPrice(prevPrice => prevPrice + categoryPriceChange); // Update price using previous state
    } else {
        const updatedCategories = { ...selectedCategories };
        delete updatedCategories[key];
        setSelectedCategories(updatedCategories);
        setPrice(prevPrice => prevPrice + categoryPriceChange); // Update price using previous state
    }
};

// useEffect(() => {
//     const fetchDataModel = async () => {
//         try {
//             const data = await getAllModels(); // Fetch car data from the API
//             if (Array.isArray(data)) {
//                 setModel(data); // Update the cars state with the fetched data if it is an array
//             } else {
//                 console.error('Data fetched is not an array:', data);
//             }
//         } catch (error) {
//             console.error('Error fetching car data:', error);
//         }
//     };

//     fetchDataModel();
// }, []);

// useEffect(() => {
//     console.log("Selected Categories:", selectedCategories);
//     console.log("Adding:", adding);
// }, [selectedCategories, adding]);
// useEffect(() => {
//     if (car) {
//       console.log("yehi");

//       console.log(car);
//     }
//   }, [car]); 

//   if (!car) {
//     return <div>No car data found</div>;
//   }
//   useEffect(() => {
//     if (model) {
//       const mod=model.find(m=>m.modelId===car.modelId)
//     }
//   }, [model]); 

useEffect(() => {
    const fetchDataModel = async () => {
        try {
            const data = await getAllModels();
            if (Array.isArray(data)) {
                setModel(data);
            } else {
                console.error('Data fetched is not an array:', data);
            }
        } catch (error) {
            console.error('Error fetching car data:', error);
        }
    };

    fetchDataModel();
}, []);

useEffect(() => {
    console.log("Selected Categories:", selectedCategories);
    console.log("Adding:", adding);
}, [selectedCategories, adding]);

useEffect(() => {
    if (car) {
        console.log("yehi");
        console.log(car);
    }
}, [car]);

useEffect(() => {
    if (model) {
        const mod = model.find(m => m.modelId === car.modelId);
        setMode(mod)
    }
}, [model, car]);


const addrenting = async () => {
    const selectedCategoriesKeys = Object.keys(selectedCategories);
    const babySeat = selectedCategoriesKeys.includes('A');
    const koster = selectedCategoriesKeys.includes('M');
    const addDriver = selectedCategoriesKeys.includes('P');
    const damages = selectedCategoriesKeys.includes('l');
    const wase = selectedCategoriesKeys.includes('R');
    console.log("logggggggggg");
    console.log(localStorage.getItem("userId"));
console.log(startDate.getFullYear());
console.log(returnDate);
console.log(babySeat);
console.log(car.carId);
const year = startDate.getFullYear();
const month = (startDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month as it is zero-based
const day = startDate.getDate().toString().padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;
const yearr = returnDate.getFullYear();
const monthr = (returnDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month as it is zero-based
const dayr = returnDate.getDate().toString().padStart(2, '0');
const formattedDater = `${yearr}-${monthr}-${dayr}`;
    await addRenting({
        LandlordId: sessionStorage.getItem("userId"),
        RentingDate: formattedDate,
        ReturnDate: formattedDater,
        CarId: car.carId,
        BabySeat: babySeat,
        Koster: koster,
        AddDriver: addDriver,
        Damages: damages,
        Wase: wase
    });
};

    let minDate = new Date();
    minDate.setMonth(prevMonth);
    minDate.setFullYear(prevYear);

    let maxDate = new Date();
    maxDate.setMonth(nextMonth);
    maxDate.setFullYear(nextYear);

    const handleDialogHide = () => {

        navigate('/catalog')
        // setVisible(false);
    };
    const handleOK = async() => {
        if(returnDate-startDate>-1){
            await addrenting()
            alert("הזמנה בוצעה בהצלחה!")
            navigate('/end')
        }
        else{
            swal("!תאריך החזרה לפני תאריך השכרה", "אנא הזן תאריכים תקינים", "error");
             
        }
       
        // setVisible(false);
    };
    const handleColorChange = (color) => {
        setSelectedColor(color);
    };
/*const originalDate = new Date("Wed Aug 21 2024 00:00:00 GMT+0300 (שעון ישראל (קיץ))");
const year = originalDate.getFullYear();
const month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month as it is zero-based
const day = originalDate.getDate().toString().padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;
console.log(formattedDate); // Output: "2024-08-21"
 */
    return (
        <div dir='rtl' style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card title={car.name} style={{ width: '60vh' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flex: '1', marginRight: '1rem' }}>
                    <p>דגם: {mode ? mode.modelName : ""}</p>                       

                        <div className="flex flex-column gap-3">
                            <p>תוספות:</p>
                            {categories.map((category) => (
                                <div key={category.key} className="flex align-items-center">
                                    &nbsp; &nbsp; &nbsp;
                                    <Checkbox inputId={category.key} name="category" value={category} onChange={onCategoryChange} checked={selectedCategories[category.key]} />
                                    <label htmlFor={category.key} className="ml-2">
                                        {category.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <br/><br/><br/>

                        <div style={{ display: 'flex' }}>
                            <div style={{ marginRight: '1rem' }}>
                                <p>תאריך קבלה:</p>
                                <Calendar dateFormat="dd/mm/yy" value={startDate} onChange={(e) => setStartDate(e.value)} minDate={today} maxDate={maxDate} readOnlyInput style={{ width: '200px' }} />
                            </div>&nbsp;&nbsp;
                            <div>
                                <p>תאריך החזרה:</p>
                                <Calendar dateFormat="dd/mm/yy" value={returnDate} onChange={(e) => setReturnDate(e.value)} minDate={today} maxDate={maxDate} readOnlyInput style={{ width: '200px' }} />
                            </div>
                        </div>
                        <p>מחיר: {price} ₪</p>
                    </div>
                    <div style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:3000/images/${car.imageUrl}`} alt={car.name} />
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button label="בצע" icon="pi pi-check" style={{ width: "150px" }} onClick={handleOK} />&nbsp;&nbsp;
                    <Button label="לקטלוג" severity="secondary" icon="pi pi-times" style={{ width: "150px" }} onClick={handleDialogHide} />
                </div>
            </Card>
        </div>
    );
};
export default RentCard;
