import axios from "axios";

// plans API
export const addPlanDB = newPlan => {
    return axios.post('https://birdeye-server.herokuapp.com/plans', newPlan);
}


// user API
export const updateUserBookedDB = (user, planTicket) => {
    return axios.put('https://birdeye-server.herokuapp.com/users', {
        user,
        planTicket
    });
}

// make a booking
export const addBookingDB = (booking) => {
    return axios.post('https://birdeye-server.herokuapp.com/bookings', booking);
}

export const getBookingDB = (user) => {
    return axios.get(`https://birdeye-server.herokuapp.com/bookings${user.email ? `?email=${user.email}` : ''}`);
}

// update booking
export const updateBookingDB = (id, updateDocs) => {
    return axios.put(`https://birdeye-server.herokuapp.com/bookings/${id}`, updateDocs);
}

// delete booking
export const deleteBookingDB = (id) => {
    return axios.delete(`https://birdeye-server.herokuapp.com/bookings/${id}`);
}