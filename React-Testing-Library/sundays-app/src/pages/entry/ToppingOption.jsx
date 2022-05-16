import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'

export const ToppingOption = ({name,imagePath, updateItemCount}) => {
  const [check, setCheck] = useState(false)

  const handleCheckbox = (e) => {
    setCheck(e.target.checked);
    updateItemCount(name,e.target.checked ? 1 : 0)
  }
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img style={{ width: '75%' }} src={`http://localhost:3030/${imagePath}`} alt={`${name} topping`} />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: '10px' }}
      >
        <Col xs="5" style={{ textAlign: 'left' }}>
        <Form.Check type="checkbox" checked={check} onChange={handleCheckbox} label={name} />
        </Col>
      </Form.Group>
    </Col>
  )
}
