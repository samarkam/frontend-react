import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare  } from '@fortawesome/free-solid-svg-icons';
export default function MediaCard({articleId,name,price,reference,cateroryName}) {
  return (
   
    <div className='card' >
      <img src={reference} width={100} height={100} alt={name}/>
      <div className='card-content'>
          <h1 className='card-title'>{name.substr(0,20)}</h1>
          <p className='card-description'>caterory : {cateroryName}</p>
          <h1 className='card-title'>Prix : {price} TND</h1>
          <Link to={`/articles/edit/${articleId}`} >
          <button className='card-button'  ><FontAwesomeIcon icon={faPenToSquare} /> Update</button>
          </Link>
      </div>
   </div>
  
  );
}
