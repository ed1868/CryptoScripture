import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';

import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Identicon from 'identicon.js';
import '../Scriptures/ScriptureBox.css';
// import Image from 'react-bootstrap/Image';

import ScriptureBox from '../Scriptures/ScriptureBox.js'

import ScriptureFeedBox from '../Scriptures/ScriptureFeed.js';


import whiteLine from '../assets/images/white-line.png';


class TopScriptures extends Component {
    async componentWillMount() {

        await this.props
        console.log('WAITING FOR THEM PROPS', this.props)

        this.setState({ top5: this.props.top5scripture })
    }

    render() {
        console.log('fhjdsgfjhs', this.props.top5scripture[0]);

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
            let scriptData = val;

            return (

                <div>
                    <Col key={i}>
                        <div className="card mb-4" key={val.hash}>
                            <div className="card-header">
                                {/* <Image src={`data:image/png;base64,${new Identicon(val.author, 30).toString()}`} alt="Logo" className=" mr-2" width='30' height='30'>
                                </Image> */}
                                <small className="text-muted">{val.author}</small>
                            </div>
                            <ul id="imageList" className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <p className="text-center"><img src={`https://ipfs.infura.io/ipfs/${val.hash}`} style={{ maxWidth: '420px' }} /></p>
                                    <p>{val.description}</p>
                                </li>
                                <li className="list-group-item py-2">
                                    <strong>Price: {window.web3.utils.fromWei(val.tipAmount.toString(), 'Ether')} ETH</strong>
                                    <br></br>
                                    {val.title}
                                    <br></br>
                                    <big className="float-left mt-1 text-muted">
                                        {val.text}
                                    </big>

                                </li>
                                <li className="list-group-item py-2">
                                    <small className="float-left mt-1 text-muted">
                                        TIPS: {window.web3.utils.fromWei(val.tipAmount.toString(), 'Ether')} ETH
  </small>
                                    <button
                                        className="btn btn-link btn-sm float-right pt-0"
                                        name={val.id}
                                        onClick={(event) => {

                                            let tipAmount = window.web3.utils.toWei('1', 'Ether')
                                            console.log(event.target.name, tipAmount)
                                            val.tipImageOwner(event.target.name, tipAmount)
                                        }}
                                    >
                                        TIP 0.1 ETH
  </button>
                                </li>
                            </ul>
                        </div>

                    </Col>
                </div>

                // <div className="item" key={i}>
                //     {/* <ScriptureFeedBox top5scripture={scriptData}/> */}
                //     <div className="package-box">
                //         <h3>{val.title}</h3>
                //         <div className="price-box">

                //             <Image src={`https://ipfs.infura.io/ipfs/${val.hash}`} alt="Logo" className="picture" />
                //             <h2>{val.price}</h2>
                //             <h5 className="plan-clr">
                //                 <span className="d-block">Year</span>
                //             </h5>
                //         </div>
                //         <div className="price-plan text-center">
                //             <ul>
                //                 <li>{val.lable}</li>
                //                 <li>real time sync</li>
                //                 <li>unlimited attachment</li>
                //                 <li>customize theme</li>
                //             </ul>
                //             <div className="price-plan-btn">Select Plan</div>
                //         </div>
                //     </div>
                // </div>
            );
        });
        console.log('sjkdhfkjdshfjksdhfjkdshf -endhsdkhfdjkshf ')
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