import React, {createContext, useEffect, useState} from "react";

const StaffContext = createContext()

const StaffProvider = ({ children }) => {
    const [staff, setStaff] = useState(() => {
        const storedStaff = localStorage.getItem('staff')
        return storedStaff ? JSON.parse(storedStaff) : null

    })

    useEffect(() => {
        if (staff) {
            localStorage.setItem('staff', JSON.stringify(staff)) 
        } else {
            localStorage.removeItem('staff')
        }
    }, [staff])

    const loginStaff = (username) => {
        console.log("Set staff to" +  username)
        setStaff({username})
    }

    const logoutStaff = () => {
        setStaff(null)
    }


    return (
        <StaffContext.Provider value={{ staff, loginStaff, logoutStaff}}>
            {children}
        </StaffContext.Provider>
    )
}

export {StaffProvider, StaffContext}