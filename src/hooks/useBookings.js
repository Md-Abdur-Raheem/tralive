import { useEffect, useState } from "react";
import { getStoredBookings } from "../utilities/localStorage";
import useAuth from "./useAuth";

const useBookings = () => {
    const { user } = useAuth();
    const [booking, setBooking] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:7000/users/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setBooking(data)
                setLoading(false)
            })

        /* const savedBooking = getStoredBookings(user.email);
        const id = Object.keys(savedBooking);
            fetch('http://localhost:7000/all-destinations/by_id', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(id)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.length) {
                        const storedBooking = [];
                        for (const key in savedBooking) {
                            const addedBookings = data.find(booking => parseInt(booking.id) === parseInt(key));
                            if (addedBookings) {
                                storedBooking.push(addedBookings);
                            }
                        }
                        setBooking(storedBooking);
                }
            }) */
            
    }, [])
    
    return [booking, setBooking, loading];
}

export default useBookings;
