import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link  } from "react-router-dom";
import { signOut } from 'firebase/auth';
import {auth} from "../firebase";
import {useNavigate} from "react-router-dom";

function Header(props) {
  function logout(){
    navigate('/loggedout');
    return signOut(auth)    
  }

  const navigate=useNavigate();
  return (
    <>
      <Navbar className="bg-green-500">
        <Container>
          <Navbar.Brand>
          <Link className="link" to="/">
            <img
              src="./resources/logo.png"
              width="100"
              height="100"
              className="d-inline-block align-top"
              alt=" logo"
            /></Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="hidden md:flex me-auto text-black">
            <Nav.Link href="/news">News - {props.date}</Nav.Link>
            <Nav.Link href="/weather">Weather</Nav.Link>
            <NavDropdown title="Farmer Aids" id="basic-nav-dropdown">
              <NavDropdown.Item href="/price">Prices of Daily Commodities</NavDropdown.Item>
              <NavDropdown.Item href="https://www.amazon.in/s?k=farming">
                Shop Farm Equipment
              </NavDropdown.Item>
              <NavDropdown.Item href="https://www.deere.com/en/agriculture">
                Procure Farm Machinery
              </NavDropdown.Item>
              
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        {props.name ?<div>
          <div className='flex flex-wrap text-sm'>Logged in as {props.name}</div>
          <button type="submit" className=" hover:bg-green-400 md:block m-auto h-fit p-1 w-fit first-letter: bg-green-600  rounded-full" onClick={logout}>SIGNOUT</button>
        </div>:null}
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Brand>
        
        <img
              src="./resources/user.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="user"
            />
          
            <NavDropdown title="My Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="/signup">
                Login/Signup
              </NavDropdown.Item>
              <NavDropdown.Item href="/dashboard">
                Dashboard
              </NavDropdown.Item>
              <div className=' md:hidden'>
              <NavDropdown.Item  href="/news">News</NavDropdown.Item>
              <NavDropdown.Item href="/weather">
                Weather
              </NavDropdown.Item><NavDropdown.Item href="/price">Price</NavDropdown.Item>
              <NavDropdown.Item href="https://www.amazon.in/s?k=farming">
                Shop
              </NavDropdown.Item>
              <NavDropdown.Item href="https://www.deere.com/en/agriculture">
                  Machinery
              </NavDropdown.Item>
              
              </div>

              
            </NavDropdown>
            </Navbar.Brand>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </>
  );
}

export default Header;