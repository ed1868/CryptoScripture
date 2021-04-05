import React, { Component } from 'react';


import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import whiteLine from '../assets/images/title-line.png';
import cryptoOne from '../assets/images/icon/1.png'
import cryptoTwo from '../assets/images/icon/2.png'
import cryptoThree from '../assets/images/icon/3.png'
// import OwlCarousel from 'react-owl-carousel';

// import TopScriptures from './topScriptures.js';
// 


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
                            <Button id="jumboButton" variant="dark">Explore</Button>
                        </h5>

                    </div>
                </Jumbotron>
                {/* START OF WORK SECTION */}
                {/* <TopScriptures /> */}
                <section className="work" id="work">

                    <Container>
                        <Row>
                            <Col sm={12} md={12} className="text-center">
                                <div className="sectionTitle">
                                    <h2>How Crypture Scripture Works</h2>
                                    <Image src={whiteLine} />
                                    <p className="pt-4">Art is subjective.</p>
                                    <p>Yet all art has value. Whether it be from a well known artist to an up and coming artist from New York. The people Decide the value. We simply allow the means for people to buy and share their art in a safe and secure environment. For the people, from the people.</p>
                                </div>

                            </Col>
                        </Row>

                        <Row>
                            <Col sm={12} md={4} className="text-center">
                                <div className="process-box">
                                    <Image src={cryptoOne} alt="CryptoOne" />
                                    <h3>Download Wallet</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias non nulla placeat, odio</p>
                                    <Image src={cryptoOne} alt="CryptoOne" className="bg-icon" />
                                </div>


                            </Col>


                            <Col sm={12} md={4} className="text-center">
                                <div className="process-box">
                                    <Image src={cryptoTwo} alt="CryptoOne" />
                                    <h3>Browse Market Place</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias non nulla placeat, odio</p>
                                    <Image src={cryptoTwo} alt="CryptoOne" className="bg-icon" />
                                </div>


                            </Col>


                            <Col sm={12} md={4} className="text-center">
                                <div className="process-box">
                                    <Image src={cryptoThree} alt="CryptoOne" />
                                    <h3>Buy Scriptures</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias non nulla placeat, odio</p>
                                    <Image src={cryptoThree} alt="CryptoOne" className="bg-icon" />
                                </div>


                            </Col>

                        </Row>

                    </Container>

                </section>



                {/* END OF WORK SECTION */}
                <Container>
                    <Row>
                        <Col sm={6} md={6}>

                            <h1 className="sectionTitle headerOne">Explore Art</h1>
                            <p>An online community of makers, developers, and traders is pushing the art world into new territory.<br></br>

                                <br></br>
                              As the underlying technology develops, a growing pool of artists are selling verified, immutable works to art, book, lovers and speculators, and the space as a whole is waking up to the power and potential of decentralized networks and currencies.

                            </p>

                            <Button variant="outline-dark">Sell Now!</Button>



                        </Col>
                        <Col sm={6}>

                            <Image src="https://i.postimg.cc/65QxYYzh/001234.png" height="100%" width="100%" />

                        </Col>
                    </Row>
                </Container>


            </div>

        );
    }
}

export default Preview;