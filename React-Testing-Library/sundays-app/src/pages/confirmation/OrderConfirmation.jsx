import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useOrderDetails } from '../../contexts/OrderDetails'

export const OrderConfirmation = ({ setOrderPhase }) => {
    const [, , resetOrder] = useOrderDetails();
    const [orderNumber, setOrderNumber] = useState(null);

    useEffect(() => {
        axios.post('http://localhost:3030/order').then((response) => {
            setOrderNumber(response.data.orderNumber);
        })
        return () => {
        }
    }, [])

    const handleClick = () => {
        resetOrder();
        setOrderPhase('inProgress');
    }


    return (
        <div style={{ textAlign: 'center' }}>
            {
                orderNumber && (
                    <>
                        <h1>Thank You</h1>
                        <p>Your order number is {orderNumber}</p>
                        <p >
                            as per our terms and conditions, nothing will happen now
                        </p>
                        <Button onClick={handleClick}>
                            New Order
                        </Button>
                    </>
                )
            }
            {!orderNumber &&
               (<div>Loading...</div> )
            }

        </div>
    )
}
