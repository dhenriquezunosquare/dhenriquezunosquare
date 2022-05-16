import React from 'react'
import { Alert } from 'react-bootstrap'

export const AlertBanner = ({message,variant='danger'}) => {
    const alertMessage=message || 'An unexpected error ocurred, Please try again'
  return (
    <Alert key={variant} variant={variant}>
        {alertMessage}
    </Alert>
  )
}
