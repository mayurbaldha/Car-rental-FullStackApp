
import axios from "axios";
import React, { useEffect } from "react";

interface Car{
    id: number;
    type: string;
    licensePlate: string;
    isAvailable: boolean;
}
interface CarSearchProps {
    // Define your props here
}
export const CarSearch: React.FC<CarSearchProps> = () => {
    const [cars, setCars] = React.useState<Car[]>([]);
    const [selectedType, setSelectedType] = React.useState<string>("SEDAN");
    const [startDateTime, setStartDateTime] = React.useState<string>('');
    const [days, setDays] = React.useState<number>(1);

    useEffect(() => {
        // Fetch cars based on selected filters
        const fetchCars = async () => {
            const response = await axios.get(`http://localhost:8080/api/cars/available`,{
                params: {
                    type: selectedType,
                    start: startDateTime,
                    days: days
                }
            });
            setCars(response.data);
        };

        fetchCars();
    }, [selectedType, startDateTime, days]);

    const handleReservation = async (carId: number) => {
    try {
        await axios.post(`http://localhost:8080/api/reservations`, {
            carId,
            userId: 1, // Replace with actual user ID
            start: startDateTime,
            days: days
        });
        alert("Reservation successful!");
    } catch (error) {
        alert("Reservation failed!");
        console.error(error);
    }
        // Handle reservation response
    };

    return <div>
        <h2>Search Cars</h2>
        <label>
            Car Type:
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                <option value="SEDAN">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="VAN">Van</option>
            </select>
        </label>
        <br />
        <label>
            Start Date & Time:
            <input type="datetime-local" value={startDateTime} onChange={(e) => setStartDateTime(e.target.value)} />
        </label>
        <br />
        <label>
            Number of Days:
            <input type="number" value={days} onChange={(e) => setDays(Number(e.target.value))} />
        </label>
        <ul>
            {cars.map(car => (
                <li key={car.id}>
                    {car.licensePlate} - {car.type} - {car.isAvailable ? "Available" : "Not Available"}
                    {car.isAvailable && (
                        <button onClick={() => handleReservation(car.id)}>Reserve</button>
                    )}
                </li>
            ))}
        </ul>
    </div>;
};
