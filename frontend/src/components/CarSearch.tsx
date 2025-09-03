
import React, { useEffect } from "react";
import { api } from '../api/client';
import { Toast } from './Toast';

interface Car {
    id: number;
    type: string;
    licensePlate: string;
    available: boolean;
}
export const CarSearch: React.FC = () => {
    const [cars, setCars] = React.useState<Car[]>([]);
    const [selectedType, setSelectedType] = React.useState<string>('SEDAN');
    const [startDateTime, setStartDateTime] = React.useState<string>('');
    const [days, setDays] = React.useState<number>(1);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [toast, setToast] = React.useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

    useEffect(() => {
        const fetchCars = async () => {
            if (!startDateTime) {
                setCars([]);
                return;
            }
            try {
                setLoading(true);
                const response = await api.get(`/cars/available`, {
                    params: { type: selectedType, start: startDateTime, days }
                });
                setCars(response.data);
            } catch {
                setToast({ message: 'Failed to load cars.', type: 'error' });
            } finally {
                setLoading(false);
            }
        };
        fetchCars();
    }, [selectedType, startDateTime, days]);

    const handleReservation = async (carId: number) => {
        try {
            setLoading(true);
            await api.post(`/reservations`, null, {
                params: { carId, carType: selectedType, userId: 1, startDateTime: new Date(startDateTime).getMilliseconds(), days }
            });
            setToast({ message: 'Reservation successful!', type: 'success' });
            // Refresh list after booking
            const response = await api.get(`/cars/available`, { params: { type: selectedType, start: startDateTime, days } });
            setCars(response.data);
        } catch (err) {
            console.error(err);
            setToast({ message: 'Reservation failed!', type: 'error' });
        } finally {
            setLoading(false);
        }
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
            <input type="number" min={1} value={days} onChange={(e) => setDays(Number(e.target.value))} />
        </label>
        <br />
        {loading && <div>Loading…</div>}
        <ul>
            {cars.map(car => (
                <li key={car.id}>
                    {car.licensePlate} - {car.type} - {car.available ? "Available" : "Not Available"}
                    {car.available && (
                        <button disabled={loading} onClick={() => handleReservation(car.id)}>Reserve</button>
                    )}
                </li>
            ))}
        </ul>
        {toast && (
            <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
    </div>;
};
