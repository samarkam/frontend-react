import React from 'react'
import { Card } from 'react-bootstrap'

const mainPromoCard = () => {
  return (
    <div style={{ marginBottom: '1rem' }}>
    <Card className="bg-dark text-white">
      <Card.Img   className="img-fluid"
        style={{ maxHeight: '260px' }}
        src="https://pic.clubic.com/e63250571930575/1200x675/smart/black_friday.jpg" 
        alt="Card image" 
      />
     
    </Card>
  </div>
  )
}

export default mainPromoCard
