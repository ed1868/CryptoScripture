import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import ScriptureFeedBox from '../Scriptures/ScriptureFeed';

import '../Scriptures/ScriptureBox.css';
import Image from 'react-bootstrap/Image';


import whiteLine from '../assets/images/white-line.png';


class TopScriptures extends Component {

    render() {
        console.log('fhjdsgfjhs',this.props.top5scripture[0]);

        // OwlCarousel Option for Prices
        const options = {
            0: {
                items: 1,
                nav: false,
                dots: true
            },
            600: {
                items: 2,
                nav: false,
                dots: true
            },
            767: {
                items: 2,
                nav: false,
                dots: true
            },
            992: {
                items: 3,
                nav: false,
                dots: true
            },
            1000: {
                items: 4
            }
        };

        // Dynamic Price Data Easy to Update
        let data = [
            { title: 'Standard', lable: 'Only the basic features', price: '49', features: '<li>24/7 On-site Support</li><li>real time sync</li><li>unlimited attachment</li><li>customize theme</li><li>priority email support</li>', link: '#' },
            { title: 'Premium', lable: 'Take it to the next level', price: '59', features: '<li>1 GB of space</li><li>real time sync</li><li>unlimited attachment</li><li>customize theme</li><li>priority email support</li>', link: '#' },
            { title: 'Professional', lable: 'Our biggest plan', price: '69', features: '<li>real time sync</li><li>unlimited attachment</li><li>customize theme</li><li>priority email support</li><li>priority email support</li>', link: '#' },
            { title: 'Standard', lable: 'Our biggest plan', price: '79', features: '<li>real time sync</li><li>unlimited attachment</li><li>customize theme</li><li>priority email support</li><li>priority email support</li>', link: '#' },
            { title: 'Standard', lable: 'Our biggest plan', price: '79', features: '<li>real time sync</li><li>unlimited attachment</li><li>customize theme</li><li>priority email support</li><li>priority email support</li>', link: '#' },
        ];

        // Dynamic Price Data Loop
// if(this.state)
    
        let DataList = this.props.top5scripture.map((val, i) => {
            // this.props.top5scripture
            console.log("VALUE : ", val)

            
            return (
 
                <div className="item" key={i}>
                    
                    <div className="package-box">
                        <h3>{val.title}</h3>
                        <div className="price-box">
                            
                            <Image src={`https://ipfs.infura.io/ipfs/${val.hash}`} alt="Logo" className="picture" />
                            <h2>{val.price}</h2>
                            <h5 className="plan-clr">
                                <span className="d-block">Year</span>
                            </h5>
                        </div>
                        <div className="price-plan text-center">
                            <ul>
                                <li>{val.lable}</li>
                                <li>real time sync</li>
                                <li>unlimited attachment</li>
                                <li>customize theme</li>
                            </ul>
                            <div className="price-plan-btn">Select Plan</div>
                        </div>
                    </div>
                </div>
            );
        });

        return (

            <section className="topScripture">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="section-title">
                                <h2 className="text-white">Top Scriptures</h2>
                                <img src={whiteLine} alt="title-line" className="img-fluid" />
                            </div>
                        </div>
                        <div className="col-md-12 text-center">
                            <OwlCarousel
                                className="plan-slider owl-carousel owl-theme"
                                loop={true}
                                items={4}
                                margin={15}
                                navClass={['owl-prev', 'owl-next']}
                                navText={['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>']}
                                nav={true}
                                dots={false}
                                responsive={options}
                            >
                                {DataList}
                            </OwlCarousel>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


export default TopScriptures;