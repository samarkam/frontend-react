import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactLoading from 'react-loading';
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faSquarePlus, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Pagination from "./Pagination"; // Import your pagination component

const ListArticles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10); // Items per page

  const fetchArticles = async (page, limit) => {
    try {
      const res = await axios.get(`https://localhost:7260/api/Articles/paginate?pageSize=${limit}&page=${page}`);
      setArticles(res.data.articles);
      setTotalPages(res.data.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    fetchArticles(currentPage, limit);
  }, [currentPage, limit]);

  const handleDelete = async (id) => {
    if (window.confirm("Êtes vous sûr de vouloir supprimer")) {
      try {
        await axios.delete(`https://localhost:7260/api/Articles/${id}`);
        setArticles(articles.filter(art => art.articleId !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const toggleVisibility = async (ArticleId, currentVisibility) => {
    try {
      await axios.post('https://localhost:7260/api/Articles/visible', { ArticleId, isVisible: !currentVisibility });
      setArticles(articles.map(art => art.articleId === ArticleId ? { ...art, isVisible: !currentVisibility } : art));
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <center><ReactLoading type="spinningBubbles" color="red" height={400} width={200} /></center>
    );
  }

  return (
    <Container>
      <div className="mt-5">
       
        <Link to="/articles/add"> 
          <button className="btn btn-success btn-sm">
            <FontAwesomeIcon icon={faSquarePlus} /> Nouveau
          </button>
        </Link>
          
        <center>     
           <h1 className=" mb-4">Liste des articles</h1>

        </center>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Image</th>
              <th>Désignation</th>
              <th>Prix</th>
              <th>Category</th>
              <th>Visible</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((art, index) => (
              <tr key={index}>
                <td><img src={art.reference} width={100} height={100} alt={art.reference} /></td>
                <td>{art.name}</td>
                <td>{art.price}</td>
                <td>{art.category.name}</td>
                <td>
                  <FontAwesomeIcon
                    icon={art.isVisible ? faEye : faEyeSlash}
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleVisibility(art.articleId, art.isVisible)}
                  />
                </td>
                <td>
                  <Link to={`/articles/edit/${art.articleId}`} className="btn btn-warning btn-sm">
                    <FontAwesomeIcon icon={faPenToSquare} /> Update
                  </Link>
                </td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(art.articleId)}>
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination 
          handlePrevPage={handlePrevPage} 
          handleNextPage={handleNextPage} 
          handlePageChange={handlePageChange} 
          totalPages={totalPages} 
          currentPage={currentPage} 
        />
      </div>
    </Container>
  );
};

export default ListArticles;
