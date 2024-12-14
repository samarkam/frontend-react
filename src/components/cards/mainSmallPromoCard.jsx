import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import necessary styles from Bootstrap

const mainSmallPromoCard = () => {
  return (
    <div style={{ marginBottom: '1rem' }} >
      <Card className="bg-light text-white">
        <Card.Img 
          className="img-fluid"
          style={{ maxHeight: '250px' }}
          src="/logooo.jpg" 
          alt="Card image" 
        />
          
      </Card>
    </div>
  );
};

export default mainSmallPromoCard;
