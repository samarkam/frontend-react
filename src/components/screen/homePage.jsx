import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import CustomCard from '../cards/CustomCard';
import MainPromoCard from '../cards/mainPromoCard';
import { Nav } from 'react-bootstrap';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi'; 

const HomePage = () => {
  const [menuData, setMenuData] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;
 
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuId) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [menuId]: !prevState[menuId], // Toggle the visibility
    }));
  };
  // Fetch menu data
  useEffect(() => {

    const fetchMenuData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/menu');
        const data = await response.json();
        setMenuData(data);
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };
    fetchMenuData();
    setCurrentCategory(1);

  }, []);

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setCurrentCategory(categoryId);
    setCurrentPage(1); // Reset to first page when category changes
  };

  // Filter articles based on selected category
  const filteredArticles = menuData
    .flatMap(menu => menu.categories)
    .flatMap(category => category.articles)
    .filter(article => !currentCategory || article.categorieID === currentCategory);

  // Determine the cards to display on the current page
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredArticles.slice(indexOfFirstCard, indexOfLastCard);

  // Handle page changes
  const totalPages = Math.ceil(filteredArticles.length / cardsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <MainPromoCard />
      <Row>
        {/* Side Navigation Menu */}
        <Col xl={3} className="mt-4">
          <Nav className="flex-column side-nav" style={{ minHeight: '30rem' }}>
            {menuData.map((menu) => (
              <Nav.Item key={menu.id}>
                {/* Menu Name - Clickable */}
                <Nav.Link
                  onClick={() => toggleMenu(menu.id)}
                  className="menu-name"
                  style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  {/* Arrow Icon */}
                  <span style={{ marginRight: '8px' }}>
                    {openMenus[menu.id] ? <FiChevronDown /> : <FiChevronRight />}
                  </span>
                  {menu.name}
                </Nav.Link>

                {/* Category List - Show/Hide Based on State */}
                {openMenus[menu.id] && (
                  <div className="category-list">
                    {menu.categories.map((category) => (
                      <Nav.Link
                        key={category.id}
                        onClick={() => handleCategoryChange(category.id)}
                        active={currentCategory === category.id}
                        className={`category-link ${currentCategory === category.id ? 'active' : ''}`}
                      >
                        {category.label}
                      </Nav.Link>
                    ))}
                  </div>
                )}
              </Nav.Item>
            ))}
          </Nav>
        </Col>

        {/* Main Content (Cards) */}
        <Col  xl={9} className="mt-4">
          <Row className="justify-content-center" style={{ minHeight: '30rem'}}>
            {currentCards.map((card) => (
              <Col key={card.id} xs={12} sm={6} md={4} lg={3} className="m-4 text-center">
                <CustomCard
                  article={card}

                  articleId={card.id}
                  title={card.name}
                  text={card.description}
                  imgSrc={card.reference}

                />
              </Col>
            ))}
          </Row>

          <Row className="d-flex justify-content-center mt-4">
            <Pagination>
              <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
              <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
              <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
