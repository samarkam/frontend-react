import { Card } from 'react-bootstrap'

const mainExtraSmallPromoCard = () => {
  return (
    <div style={{ marginBottom: '1rem' }}>
    <Card className="bg-dark text-white">
      <Card.Img   className="img-fluid"
        style={{ maxHeight: '120px' }}
        src="/logooo.jpg" 
        alt="Card image" 
      />
     
    </Card>
  </div>
  )
}

export default mainExtraSmallPromoCard