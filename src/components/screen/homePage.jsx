import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import CustomCard from '../cards/CustomCard';
import MainPromoCard from '../cards/mainPromoCard';
import MainSmallPromoCard from '../cards/mainSmallPromoCard';
import { Nav } from 'react-bootstrap';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi'; 

const HomePage = () => {
  const [menuData, setMenuData] = useState([]);
  const [currentCategory, setCurrentCategory] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;
 
  const [openMenus, setOpenMenus] = useState(5);

  const toggleMenu = (menuId) => {
    setOpenMenus((prevMenuId) => (prevMenuId === menuId ? null : menuId));
  };
  // Fetch menu data
  useEffect(() => {

    const fetchMenuData = async () => {
      try {
        const response = await fetch('https://localhost:7260/api/Menus');
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
    .filter(article => !currentCategory || article.categoryId === currentCategory);

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
      <Row>
        {/* Side Navigation Menu */}
        <Col xl={3} className="mt-4">
        <Row>      
          <MainSmallPromoCard />
        </Row>
          <Nav className="flex-column side-nav" style={{ minHeight: '30rem' }}>
            {menuData.map((menu) => (
              <Nav.Item key={menu.menuId}>
                {/* Menu Name - Clickable */}
                <Nav.Link
                  onClick={() => toggleMenu(menu.menuId)}
                  className="menu-name"
                  style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  {/* Arrow Icon */}
                  <span style={{ marginRight: '8px' }}>
                  {openMenus === menu.menuId ? <FiChevronDown /> : <FiChevronRight />}
                  </span>
                  {menu.name}
                </Nav.Link>

                {/* Category List - Show/Hide Based on State */}
                {openMenus === menu.menuId && (
                  <div className="category-list">
                    {menu.categories.map((category) => (
                      <Nav.Link
                        key={category.categoryId}
                        onClick={() => handleCategoryChange(category.categoryId)}
                        active={currentCategory === category.categoryId}
                        className={`category-link ${currentCategory === category.categoryId ? 'active' : ''}`}
                      >
                        {category.name}
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
        <Row>      
          <MainPromoCard />
        </Row>
          <Row className="justify-content-center" style={{ minHeight: '22rem'}}>

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

          <Row className="d-flex justify-content-center mt-1">
            <Pagination>
              {/* <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} /> */}
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
              {/* <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} /> */}
            </Pagination>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
