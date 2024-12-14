import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ReactLoading from 'react-loading';
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash,faSquarePlus  } from '@fortawesome/free-solid-svg-icons';

const Listarticles = () => {
  const[articles,setArticles]=useState([])
  const[isLoading,setisLoading]=useState(true)

  const fetcharticles=async()=>{
    try {
      const res=await axios.get("https://localhost:7260/api/Articles")
      setArticles(res.data)
      setisLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
      fetcharticles()
  },[])
  const handleDelete=async(id)=>{
    if(window.confirm("Êtes vous sure de vouloir supprimer")){
    try {
      await axios.delete(`https://localhost:7260/api/Articles/${id}`)
      .then(res=>{
        setArticles(articles.filter(art=>art.articleId!=id))
      })

    } catch (error) {
      console.log(error)
    }
  }
  }
if(isLoading){
  return(
    <center><ReactLoading type="spinningBubbles" color="red" height={400} width={200} /></center>
  )
}

  return (
    <Container>
    <div className="mt-5">
     <Link to="/articles/add" > <button className="btn btn-success btn-sm"><FontAwesomeIcon icon={faSquarePlus} />Nouveau</button></Link>
    <center>  <h2>Liste des articles</h2></center>
    <table className="table table-striped">
        <thead>
          <tr>
          <th>Image</th>
          <th>Désignation</th>
          <th>prix</th>
          <th>Category</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
          <tbody>
            {
              articles.map((art,index)=>
              <tr key={index}>
                  <td><img src={art.reference} width={100} height={100} alt={art.reference}/></td>
                  <td>{art.name}</td>
                  <td>{art.price}</td>
                  <td>{art.category.name}</td>
                  <td><Link to={`/articles/edit/${art.articleId}`} className="btn btn-warning btn-sm"><FontAwesomeIcon icon={faPenToSquare} /> Update</Link></td>
                  <td><button className="btn btn-danger btn-sm" onClick={()=>handleDelete(art.articleId)}><FontAwesomeIcon icon={faTrash} />  Delete</button></td>
              </tr>
              )
            }
          </tbody>
    </table>
    </div>
    </Container>
  )
}

export default Listarticles
