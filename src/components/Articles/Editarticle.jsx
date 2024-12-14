import axios from "axios"
import { useEffect, useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import { Link,useNavigate,useParams } from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { faPersonWalkingArrowRight } from '@fortawesome/free-solid-svg-icons';

const Editarticle = () => {
  const [article, setArticle] = useState({ name: "", price: 0, reference: "", categoryId: "" });
  const[scategories,setScategories]=useState([])
  const navigate=useNavigate()
  const{id}=useParams()
const loadarticle=async()=>{
 const res= await axios.get(`https://localhost:7260/api/Articles/${id}`)
   setArticle(res.data) 
}

  const fetchscategories=async()=>{
    try {
      const res=await axios.get("https://localhost:7260/api/Categories")
      setScategories(res.data)
      
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(()=>{
    fetchscategories()
     loadarticle()
  },[])

  const handleSave=async(e)=>{
    try {
      e.preventDefault()
      await axios.put(`https://localhost:7260/api/Articles/${id}`,article)
      .then(res=>{
        navigate("/articles")
      })
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <Container>
    <div className="col-md-6 offset-md-3 border rounded p-4 mt-5 shadow">
    <center><h2>Modifier un article</h2></center>
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
              <option key={scat.categoryId} value={scat.categoryId}>{scat.name}</option>
              )
            }

          </Form.Control>
      </Form.Group>
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
    </Container>
  )
}

export default Editarticle
