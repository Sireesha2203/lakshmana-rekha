import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink,Link } from 'react-router-dom';
import "./Navi.css";

function Navi() {
  return (
    <Navbar collapseOnSelect expand="lg"  variant="dark" sticky="top" className="navi" >
      <Container>
        <Navbar.Brand className="brand" href="/">
          <div className="logo-container">
          <img className="logo" width="30px" height="30px" src="images/logo.jpg" alt="" />
          {/* <span className="brand-text">EMS</span> */}
          </div>
        </Navbar.Brand>

        <div className='justify-content-end'>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className=' nav-link '>Home</NavLink>    

            <NavLink to="/EmergencyContacts" className='nav-link'>Emergency Contacts</NavLink>

            <NavLink to="/SelfDefence" className='nav-link'>SelfDefence Courses</NavLink>

            <NavDropdown title="KnowledgeHub" id="collasible-nav-dropdown">

              <NavDropdown.Item>
                <Link to="/KnowledgeHub/Tips" className='nav-link text-secondary'>Tips</Link>
              </NavDropdown.Item>

              <NavDropdown.Item>
                <Link to="/KnowledgeHub/Laws" className='nav-link text-secondary'>Laws</Link>
              </NavDropdown.Item>
              
              <NavDropdown.Item>
                <Link to="/KnowledgeHub/Blogs" className='nav-link text-secondary'>Blogs</Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavLink to="/Login" className='nav-link'>Login</NavLink>
          
          </Nav>
        </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}

export default Navi;