import { useEffect, useState } from "react";
// import { getStoredBookings } from "../utilities/localStorage";
import useAuth from "./useAuth";

const useBookings = (control) => {
    const { user } = useAuth();
    const [usersBookings, setUsersBookings] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        fetch(`https://gruesome-village-05256.herokuapp.com/bookings/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setUsersBookings(data)
                setLoading(false)
            })
            
    }, [user.email, control])
    return [usersBookings, setUsersBookings, loading];
}

export default useBookings;
