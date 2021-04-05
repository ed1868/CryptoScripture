import React, { Component } from 'react';
import Identicon from 'identicon.js';
import photo from './assets/nomadblack.png'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

class Header extends Component {

  render() {
    if(this.props.account){
      return (



        <Navbar id="nomadNav" expand="lg" fixed="top">
          <Navbar.Brand href="#home">
            <Image width="120" height="30" src={photo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link className="text-black mt-1" href="#home">About</Nav.Link>
              <Nav.Link className="text-black mt-1" href="#link">Market</Nav.Link>
              
  
            <Nav.Link className="text-black" href="#link" inline>
  
  
              <small className="text-secondary pr-2">
                <small id="account">{this.props.account}</small>
  
                
              </small>
  
                  { this.props.account
             ? 
             
             <Image   src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}   width="30" height="30" />
      
                : <span>Please connect your wallet</span>
              }
              
            </Nav.Link>
        
            </Nav>
  
  
          </Navbar.Collapse>
        </Navbar>
  
  
  
      );
    }else{
      return (



        <Navbar id="nomadNav" expand="lg" fixed="top">
          <Navbar.Brand href="#home">
            <Image width="120" height="30" src={photo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#home">About</Nav.Link>
              <Nav.Link href="#link">Market</Nav.Link>
              <Nav.Link href="#link">Connect</Nav.Link>
              
  
   
        
            </Nav>
  
  
          </Navbar.Collapse>
        </Navbar>
  
  
  
      );
    }

  }
}

export default Header;