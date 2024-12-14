import axios from "axios"
import { useEffect, useState } from "react"
import ReactLoading from 'react-loading';
import Affichearticles from "./Affichearticles";
import Pagination from "./Pagination";
import { Container } from "react-bootstrap";



const Listarticlescard = () => {
    const[articles,setArticles]=useState([])
    const[isLoading,setisLoading]=useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit]=useState(12)

  
    const fetcharticles=async(page,limit)=>{
      try {
        const res=await axios.get(`https://localhost:7260/api/Articles/paginate?pageSize=${limit}&page=${page}`)
        setArticles(res.data.articles)
        setTotalPages(res.data.totalPages)
        console.log(res.data)
        setisLoading(false)
      } catch (error) {
        console.log(error)
      }
    }


    const handlePrevPage = () => {
      if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      }
      };
      const handleNextPage = () => {
      if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      }
      };
      const handlePageChange = (page) => {
      setCurrentPage(page);
      };

    useEffect(()=>{
        fetcharticles(currentPage,limit)
    },[currentPage,limit])


    if(isLoading){
        return(
          <center><ReactLoading type="spinningBubbles" color="red" height={400} width={200} /></center>
        )
      }
  return (
    <Container>
      <center>     
           <h1 className=" mb-4">Liste des articles</h1>

        </center>
    <div className="container">
      <Affichearticles 
      articles={articles}/>
      
      </div>
      <Pagination handlePrevPage={handlePrevPage}
      handleNextPage={handleNextPage}
      handlePageChange={handlePageChange}
      totalPages={totalPages}
      currentPage={currentPage}
      />




    </Container>
  )
}

export default Listarticlescard
