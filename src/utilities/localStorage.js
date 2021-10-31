const addToDb = (id, email) => {
    const exists = getDb(email);
    let bookings = {};
    if (!exists) {
        bookings[id] = 1;
    }
    else {
        bookings = JSON.parse(exists);
        if (bookings[id]) {
            const newCount = bookings[id] + 1;
            bookings[id] = newCount;
        }
        else {
            bookings[id] = 1;
        }
    }
    updateDb(bookings, email);
}

const getDb = (email) => localStorage.getItem(`bookings_${email}`);

const updateDb = (booking, email) => localStorage.setItem(`bookings_${email}`, JSON.stringify(booking));

const removeFromDb = (id, email) => {
    const exists = getDb(email);
    if (!exists) {
        
    }
    else {
        const bookings = JSON.parse(exists);
        delete bookings[id];
        updateDb(bookings, email);
    }
}

const getStoredBookings = (email) => {
    const exists = getDb(email);
    return exists ? JSON.parse(exists) : {};
}

const clearAllBookings = (email) => {
    localStorage.removeItem(`bookings_${email}`);
}

export { addToDb, removeFromDb, clearAllBookings, getStoredBookings, updateDb };
    
