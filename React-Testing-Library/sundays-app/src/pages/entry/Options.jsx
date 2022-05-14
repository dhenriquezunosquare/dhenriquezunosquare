import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ScoopOption } from './ScoopOption'
import { Row } from 'react-bootstrap'
export const Options = ({ optionType }) => {

  const [items, setItems] = useState([])

  useEffect(() => {

    axios.get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setItems(response);
      })
      .catch((error) => {
        console.error(error);
      })

    return () => {
    }
  }, [optionType])

  const ItemComponent = optionType === 'scoops' ? ScoopOption : null;

  const optionItems = items.map(item => (<ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />))

  return (
    <Row>{optionItems}</Row>
  )
}
