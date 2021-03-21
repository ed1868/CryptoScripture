import React, { Component } from 'react';


import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'

import './preview.css'

class Preview extends Component {

    render() {

        return (
            <div>

                <Jumbotron id="jumbo" >
                    <div id="jumboInfo" className="mt-4 pt-5" >
                        <h1 className="text-center text-black mt-5 pt-5 headerOne" >Crypto Scriptures</h1>
                        <h5 className="text-center text-black mt-5">
                        Buy, sell, and discover rare digital items from authors all over the world.
                    </h5>
                        <h5 className="text-center mt-5" >
                            <Button  id="jumboButton" variant="dark">Explore</Button>
                        </h5>

                    </div>
                </Jumbotron>

<Container>
<div className="info">
      <h1 className="text-black headerOne">Explore Art</h1>
      <p>An online community of makers, developers, and traders is pushing the art world into new territory.<br></br> 
      
      <br></br>
      As the underlying technology develops, a growing pool of artists are selling verified, immutable works to art, book, lovers and speculators, and the space as a whole is waking up to the power and potential of decentralized networks and currencies. 

</p>

      <Button variant="outline-dark">Sell Now!</Button>
    </div>
    <div className="image">
      <img src="https://i.postimg.cc/65QxYYzh/001234.png" />
    </div>
    <div className="clearfix pb-5"></div>
</Container>
 
    </div>
            
            //         <div id="main" className="is-loading">
            //             <h1>
            //                 新大久保へようこそ
            // </h1>
            //         </div>
        );
    }
}

export default Preview;