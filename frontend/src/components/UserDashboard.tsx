import axios from "axios";
import React, { useEffect } from "react";

interface Reservation{
    id: number;
    car:{type:string;licensePlate:string;};
    startDateTime: string;
    endDateTime: string;
    status: string;
}
const UserDashboard: React.FC = () => {
    const [reservations, setReservations] = React.useState<Reservation[]>([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try{
                const response = await axios.get(`http://localhost:8080/api/reservations/user/1`);
                setReservations(response.data);
            } catch (error) {
                console.error("Error fetching reservations:", error);
            }
        };

        fetchReservations();
    }, []);
    const handleCancelReservation = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/reservations/${id}`);
            setReservations((prev) => prev.filter((res) => res.id !== id));
        } catch (error) {
            console.error("Error canceling reservation:", error);
        }
    };
    return (
        <div>
            <h2>User Reservations</h2>
            {reservations.length > 0 ? (
                <ul>
                    {reservations.map((reservation) => (
                        <li key={reservation.id}>
                            {reservation.car.type} - {reservation.car.licensePlate} <br />
                            {reservation.startDateTime} to {reservation.endDateTime} <br />
                            Status: {reservation.status} <br />
                            <button onClick={() => handleCancelReservation(reservation.id)}>Cancel Reservation</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reservations found.</p>
            )}
        </div>
    );
};

export default UserDashboard;
