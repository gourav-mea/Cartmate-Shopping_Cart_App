import React, {useEffect, createContext, useState} from "react";
export const UserContext = createContext();


const ContextAPI = ({ children }) => {
    const [userId, setuserId] = useState();
    useEffect(() => {
        // Get the userId from the localStorage
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setuserId(storedUserId);
        }
    }, [setuserId]);

    useEffect(() => {
        // Set the userId in the localStorage
        if (userId) {
            localStorage.setItem('userId', userId);
        }
    }, [userId]);


    return (
        <UserContext.Provider value={{ userId, setuserId}}>
            {children}
        </UserContext.Provider>
    );
};

export default ContextAPI;
