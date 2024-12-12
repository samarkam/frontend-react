import axios from "axios"
import { useEffect, useState } from "react"
import { Col, Form, Row } from "react-bootstrap"
import { Link,useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'; 
import { faPersonWalkingArrowRight } from '@fortawesome/free-solid-svg-icons';

const Insertarticle = () => {
  const[article,setArticle]=useState({})
  const[scategories,setScategories]=useState([])
  const [files, setFiles] = useState([]);
  
  const navigate=useNavigate()
  const fetchscategories=async()=>{
    try {
      const res=await axios.get("https://localhost:7260/api/Categories")
      setScategories(res.data)
      setisLoading(false)
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(()=>{
    fetchscategories()
  },[])

  const handleSave=async(e)=>{
    try {
      e.preventDefault()
      await axios.post("https://localhost:7260/api/Articles",article)
      .then(res=>{
        navigate("/articles")
      })
    } catch (error) {
      console.log(error)
    }
  }
  const serverOptions = () => { 
    return {
    process: (fieldName, file, metadata, load, error, progress, abort) => {
    
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'iit2025S1');
    data.append('cloud_name', 'esps');
data.append('publicid', file.name);
axios.post('https://api.cloudinary.com/v1_1/esps/image/upload', data)
.then((response) => response.data)
.then((data) => {

setArticle({...article,imageart:data.url}) ;
load(data);
})
.catch((error) => {
console.error('Error uploading file:', error);
error('Upload failed');
abort();
});
},
};
};
  return (
    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
    <center><h2>Insérer un article</h2></center>
      <Form>
      <Row className="mb-2">
      
      <Form.Group as={Col} md="6" >
        <Form.Label>Désignation</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Désignation" 
        value={article.name}
        onChange={(e)=>setArticle({...article,name:e.target.value})}
        />
      </Form.Group>
      </Row>
      <Row className="mb-2">
      
      
      </Row>
        <Row className="mb-2">
      <Form.Group as={Col} md="6" >
        <Form.Label>Prix</Form.Label>
        <Form.Control 
        type="number" 
        placeholder="Prix" 
        value={article.price}
        onChange={(e)=>setArticle({...article,price:e.target.value})}
        />
      </Form.Group>
      <Form.Group as={Col} md="6" >
        <Form.Label>Image</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="imageUrl" 
        value={article.reference}
        onChange={(e)=>setArticle({...article,reference:e.target.value})}
        />
      </Form.Group>

      </Row>
     <Row className="mb-2">
      <Form.Group as={Col} md="6" >
        <Form.Label>catégorie</Form.Label>
        <Form.Control 
        type="select"
        as="select"
        placeholder="Sous catégorie" 
        value={article.categoryId}
        onChange={(e)=>setArticle({...article,categoryId:e.target.value})}
        >
            {
              scategories.map((scat,index)=>
              <option value={scat.id}>{scat.name}</option>
              )
            }

          </Form.Control>
      </Form.Group>
      </Row>
      <div className="d-flex justify-content-end" >
        <button className="btn btn-success btn-sm" onClick={(e)=>handleSave(e)}><FontAwesomeIcon icon={faFloppyDisk} /> Enregistrer</button>
        &nbsp;
        <Link to="/articles">
        <button className="btn btn-danger btn-sm">
        <FontAwesomeIcon icon={faPersonWalkingArrowRight} /> 
           Annuler
        </button>
        </Link>
      </div>
    </Form>
    </div>
  )
}

export default Insertarticle
