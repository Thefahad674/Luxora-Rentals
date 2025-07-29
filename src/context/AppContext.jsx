import { createContext, useContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL


export const AppContext = createContext()

export const AppProvider = ({ children }) => {

    const navigate = useNavigate()
    const currency = import.meta.env.VITE_CURRENCY

    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [isOwnner, setIsOwner] = useState(null)
    const [showLogin, setShowLogin] = useState(null)
    const [pickupDate, setPickupDate] = useState(null)
    const [returnDate, setreturnDate] = useState(null)

    const [cars, setCars] = useState([])

    // function to check if user is logged in
    const fetchUser = async () => {
        try {
           const {data} = await axios.get('/api/user/data')
           if(data.success) {
            setUser(data.user)
            setIsOwner(data.user.role === 'owner')
           } else {
            navigate('/')
           }
        } catch (error) {
            toast.error(error.message)
        }
    }

 const value = {
      navigate, currency
 }

    return <AppContext.Provider value={value}>
        { children }
    </AppContext.Provider>
}

export const UseAppContext = () => {
    return useContext(AppContext)
}