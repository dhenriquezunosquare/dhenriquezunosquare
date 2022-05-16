import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ScoopOption } from './ScoopOption'
import { Row } from 'react-bootstrap'
import { ToppingOption } from './ToppingOption'
import { AlertBanner } from '../shared/AlertBanner'
import { pricesPerItem } from '../../constants';
import { useOrderDetails } from '../../contexts/OrderDetails'
import { formatCurrency } from '../../utility/formatCurrency'



export const Options = ({ optionType }) => {
  const [orderDetails,updateItemCount] =useOrderDetails();
  const [items, setItems] = useState([])
  const [error, setError] = useState(false);

  useEffect(() => {

    axios.get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        setError(true);
      })

    return () => {
    }
  }, [optionType])

  if (error) return <AlertBanner variant='danger' />

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricesPerItem[optionType])} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
}
