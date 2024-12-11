import Pricing from '@/components/ApiPricing/pricing'
import SwaggerUIComponent from '@/components/SwaggerUi/SwaggerUi'
import { Container, Typography } from '@mui/material'
import React from 'react'

function ApiPage() {
    
  return (
    <Container>
    
      <Pricing/>
      {/* <SwaggerUIComponent/> */}
    </Container>
  )
}

export default ApiPage
