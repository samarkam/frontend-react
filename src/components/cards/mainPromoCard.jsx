import { Card } from 'react-bootstrap'

const mainPromoCard = () => {
  return (
    <div style={{ marginBottom: '1rem' }}>
    <Card className="bg-dark text-white">
      <Card.Img   className="img-fluid"
        style={{ maxHeight: '260px' }}
        src="/ambianc.webp" 
        alt="Card image" 
      />
     
    </Card>
  </div>
  )
}

export default mainPromoCard