import { Card } from 'react-bootstrap'

const mainSmallPromoCard = () => {
  return (
    <div style={{ marginBottom: '1rem' }}>
    <Card className="bg-dark text-white">
      <Card.Img   className="img-fluid"
        style={{ maxHeight: '250px' }}
        src="/logooo.jpg" 
        alt="Card image" 
      />
     
    </Card>
  </div>
  )
}

export default mainSmallPromoCard