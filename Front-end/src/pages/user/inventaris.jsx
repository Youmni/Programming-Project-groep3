import React from 'react'  
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'

const Inventaris = () =>{


const [Inventaris, setInventaris] = useState([])


useEffect(() => {
    axios
    .get(`http://localhost:8080/product`)
    .then((res) => {
        setInventaris(res.data)
        enqueueSnackbar('Inventaris opgehaald', {variant: 'success'})
    })
    .catch((error) => {
        console.log(error)
        enqueueSnackbar('Error', {variant: 'error'})
});
 }, [])


    return(
        <div>
            <h1>Inventaris</h1>

            <div>
                {Inventaris.map((product) => (
                    <div key={product.productNr}>
                        <h1>{product.productModelNaam}</h1>
                        <p>{product.productModelBeschrijving}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Inventaris;
