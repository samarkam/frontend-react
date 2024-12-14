import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import necessary styles from Bootstrap

const mainPromoCard = () => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <Card className="bg-light text-white">
        <Card.Img 
          className="img-fluid"
          style={{ maxHeight: '250px' }}
          src="/ambianc.webp" 
          alt="Card image" 
        />
         
      </Card>
    </div>
  );
};

export default mainPromoCard;
