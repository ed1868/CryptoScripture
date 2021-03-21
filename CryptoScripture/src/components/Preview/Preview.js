import React, { Component } from 'react';


import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

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