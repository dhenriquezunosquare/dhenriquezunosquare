import React from 'react'
import { Button } from 'react-bootstrap';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { SummaryForm } from '../summary/SummaryForm';
import { Options } from './Options'

export const OrderEntry = ({setOrderPhase}) => {
  const [orderDetails, updateItemCount] = useOrderDetails();
  const disabledBtn=orderDetails.totals.scoops ==='$0.00';
  const handleClick = (e) => {
    setOrderPhase('review');
  }
  return (
    <div >
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button disabled={disabledBtn} onClick={() => handleClick('review')}>
        Order sundae
      </Button>
    </div>
  )
}
