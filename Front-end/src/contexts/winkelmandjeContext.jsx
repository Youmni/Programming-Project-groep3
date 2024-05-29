import React, { createContext, useState, useEffect} from 'react'
import { enqueueSnackbar } from 'notistack';

const WinkelMandjeContext = createContext();

const WinkelMandjeProvider = ({children}) => {

    const [winkelmandje, setWinkelmandje] = useState([])

    useEffect(() => {
        const storedWinkelmandje = localStorage.getItem('winkelmandje');
        if(storedWinkelmandje) {
            try {
                setWinkelmandje(JSON.parse(storedWinkelmandje))
        }catch (error) {
            console.error("Failed to parse stored winkelmandje",error)
            setWinkelmandje([])
        }
    }
    }, [])

    useEffect(() => {
        localStorage.setItem('winkelmandje', JSON.stringify(winkelmandje))
    }, [winkelmandje]);

    const addToWinkelmandje = (item) => {
        setWinkelmandje((prevWinkelmandje) => [...prevWinkelmandje, item])
    }

    const removeFromWinkelmandje = (productID) => {
        setWinkelmandje((prevWinkelmandje) => prevWinkelmandje.filter((item) => item.product.productID !== productID));
        enqueueSnackbar('Product verwijderd uit winkelmandje', { variant: 'error' });
    };

    const clearWinkelmandje = () => {
        setWinkelmandje([])
    }
  return (
   <WinkelMandjeContext.Provider value={{winkelmandje, addToWinkelmandje, removeFromWinkelmandje, clearWinkelmandje}}>
    {children}
   </WinkelMandjeContext.Provider>
  )
}

export {WinkelMandjeContext, WinkelMandjeProvider}