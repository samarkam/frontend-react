import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row, Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faSquarePlus } from '@fortawesome/free-solid-svg-icons';

const Listcategories = () => {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [categoryFormData, setCategoryFormData] = useState({ name: "", menuId: "" });

  const fetchMenus = async () => {
    try {
      const res = await axios.get("https://localhost:7260/api/Menus");
      setMenus(res.data);
    } catch (error) {
      console.error("Error fetching menus");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://localhost:7260/api/Categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories");
    }
  };

  const handleShowMenuModal = (menu = null) => {
    setCurrentMenu(menu);
    setFormData(menu ? { name: menu.name, description: menu.description } : { name: "", description: "" });
    setShowMenuModal(true);
  };

  const handleShowCategoryModal = (category = null) => {
    setCurrentCategory(category);
    setCategoryFormData(category ? { name: category.name, menuId: category.menuId } : { name: "", menuId: "" });
    setShowCategoryModal(true);
  };

  const handleMenuInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryFormData({ ...categoryFormData, [name]: value });
  };

  const handleMenuFormSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = currentMenu
      ? `https://localhost:7260/api/Menus/${currentMenu.menuId}`
      : "https://localhost:7260/api/Menus";

    try {
      if (currentMenu) {
        await axios.put(apiUrl, formData);
      } else {
        await axios.post(apiUrl, formData);
      }
      setShowMenuModal(false);
      fetchMenus(); // Refresh the list
    } catch (error) {
      console.error("Error submitting menu form");
    }
  };

  const handleCategoryFormSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = currentCategory
      ? `https://localhost:7260/api/Categories/${currentCategory.categoryId}`
      : "https://localhost:7260/api/Categories";

    try {
      if (currentCategory) {
        await axios.put(apiUrl, categoryFormData);
      } else {
        await axios.post(apiUrl, categoryFormData);
      }
      setShowCategoryModal(false);
      fetchCategories(); // Refresh categories
      fetchMenus(); // Refresh the list

    } catch (error) {
      console.error("Error submitting category form");
    }
  };


  const handleDeleteCategory=async(id)=>{
    if(window.confirm("Êtes vous sure de vouloir supprimer")){
    try {
      await axios.delete(`https://localhost:7260/api/Categories/${id}`)
      .then(res=>{
        fetchCategories();
    })

    } catch (error) {
      console.log(error)
    }
  }
  }
  const handleDeleteMenu=async(id)=>{
    if(window.confirm("Êtes vous sure de vouloir supprimer")){
    try {
      await axios.delete(`https://localhost:7260/api/Menus/${id}`)
      .then(res=>{
        fetchMenus();
    })

    } catch (error) {
      console.log(error)
    }
  }
  }
  
  useEffect(() => {
    fetchMenus();
    fetchCategories();
  }, []);

  return (
    <div className="container">
      <Row className="m-4">
        <Col md={6}>
          <h2>Categories Listing by Menu</h2>
        </Col>
        <Col md={6}>
          <div>
            <button className="btn btn-success" onClick={() => handleShowMenuModal()}>
              <FontAwesomeIcon icon={faSquarePlus} /> Add New Menu
            </button>
            <button className="btn btn-primary ms-2" onClick={() => handleShowCategoryModal()}>
              <FontAwesomeIcon icon={faSquarePlus} /> Add New Category
            </button>
          </div>
        </Col>
      </Row>
      <div className="row">
        {menus.map((menu) => (
          <div key={menu.menuId} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-header bg-primary text-white">
              <h5>{menu.name}</h5>

                
              </div>
              <div className='card-content' style={{width:'100%'}}>
             
                <ul className="list-group list-group-flush"  style={{ minHeight: "200px" ,width:'100%'}}>
                  {menu.categories.map((category) => (
                    <li key={category.categoryId} className="list-group-item d-flex justify-content-between align-items-center">
                      <span>{category.name}</span>
                      <div>
                        <button className="btn btn-warning btn-sm" onClick={() => handleShowCategoryModal(category)}>
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button className="btn btn-danger btn-sm ms-2"  onClick={()=>handleDeleteCategory(category.categoryId)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="d-flex justify-content-end mt-3">

                <button className="btn btn-warning btn-sm" onClick={() => handleShowMenuModal(menu)}>
                    <FontAwesomeIcon icon={faPenToSquare} /> Update Menu
                </button>
                <button className="btn btn-danger btn-sm ms-2" 
                    onClick={()=>handleDeleteMenu(menu.menuId)}>
                    <FontAwesomeIcon icon={faTrash} /> Delete Menu
                </button>
                </div>
            </div>
            
            </div>
          </div>
        ))}
      </div>

      {/* Modal for adding/updating Menu */}
      <Modal show={showMenuModal} onHide={() => setShowMenuModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{currentMenu ? "Edit Menu" : "Add New Menu"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleMenuFormSubmit}>
            <div className="form-group">
              <label htmlFor="name">Menu Name</label>
              <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleMenuInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="description">Menu Description</label>
              <input type="text" className="form-control" id="description" name="description" value={formData.description} onChange={handleMenuInputChange} />
            </div>
            <Button type="submit" variant="primary">
              {currentMenu ? "Update" : "Add"}
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Modal for adding/updating Category */}
      <Modal show={showCategoryModal} onHide={() => setShowCategoryModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{currentCategory ? "Edit Category" : "Add New Category"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleCategoryFormSubmit}>
            <div className="form-group">
              <label htmlFor="name">Category Name</label>
              <input type="text" className="form-control" id="name" name="name" value={categoryFormData.name} onChange={handleCategoryInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="menuId">Select Menu</label>
              <select className="form-control" id="menuId" name="menuId" value={categoryFormData.menuId} onChange={handleCategoryInputChange} required>
                <option value="">Select a menu</option>
                {menus.map((menu) => (
                  <option key={menu.menuId} value={menu.menuId}>
                    {menu.name}
                  </option>
                ))}
              </select>
            </div>
            <Button type="submit" variant="primary">
              {currentCategory ? "Update" : "Add"}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Listcategories;
