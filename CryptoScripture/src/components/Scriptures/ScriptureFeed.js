import './ScriptureBox.css';

import React from 'react';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Identicon from 'identicon.js';

const ScriptureFeedBox = (props) => {
    return (
        <Col lg={6}>
            {props.children}
        </Col>
    )
}

const ScriptImage = (props) => {
    console.log('THATS THAT SHIT : ', props.pictureStrc)
    return (

        <Image src={`data:image/png;base64,${new Identicon(props.pictureStrc, 30).toString()}`} alt="Logo" className=" mr-2" width='30' height='30'>
        </Image>
    )
}

const Handle = (props) => {
    return (
        <div className="handle">
            @{props.handle}
            {/* @hwek21 */}
        </div>
    )
}

const Name = (props) => {
    return (
        <div className="name">
            {props.name}
            {/* Eddie Ruiz */}
        </div>
    )
}

const Title = (props) => {
    return (
        <div className="tweet">
            {props.tweet}
            {/* I'm just saying this is a test */}
        </div>
    )
}
const Text = (props) => {
    return (
        <div className="tweet">
            {props.tweet}
            {/* I'm just saying this is a test */}
        </div>
    )
}

const Tip = (props) => {
    return (
        <div className="tip">
            <small className="float-left mt-1 text-muted secondary">
                {/* TIPS: {window.web3.utils.fromWei(props.tipAmount.toString(), 'Ether')} ETH */}
        TIPS: 4 ETH
    </small>
            <button
                className="btn btn-link btn-sm float-right pt-0 tipButton"
            // name={props.id}
            // onClick={(event) => {
            //   let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
            //   console.log(event.target.name, tipAmount)
            //   this.props.tipImageOwner(event.target.name, tipAmount)
            // }}
            >
                TIP 0.1 ETH
    </button>
        </div>
    )

}

const proofOfAuthenticity = (props) => {
    return (
        <h1>Hello {this.props.author}</h1>
    )
}
const scriptureFeedBody = (props) => {
    console.log('FEED BOX DATA: ', props.scriptures)
    // console.log('FEED BOX API: ', props.apiUserData.image)


    // let image = props.apiUserData.image;

    // let image="";
    // let name = `${pr ops.apiUserData.name.first} ${props.apiUserData.name.last}`
    // let name="";
    // let handle = props.apiUserData.handle

    // let handle=""
    //   <li key={key} className="list-group-item py-2">
    //   <small className="float-left mt-1 text-muted">
    //     TIPS: {window.web3.utils.fromWei(image.tipAmount.toString(), 'Ether')} ETH
    //   </small>
    //   <button
    //     className="btn btn-link btn-sm float-right pt-0"
    //     name={image.id}
    //     onClick={(event) => {
    //       let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
    //       console.log(event.target.name, tipAmount)
    //       this.props.tipImageOwner(event.target.name, tipAmount)
    //     }}
    //   >
    //     TIP 0.1 ETH
    //   </button>
    // </li>


    return (

        <ScriptureFeedBox>
            <div className="card mb-4" key={props.scriptures.hash}>
                <div className="card-header">
                    <ScriptImage
                        pictureStrc={props.scriptures.author}

                    />
                    <small className="text-muted">{props.scriptures.author}</small>
                </div>
                <ul id="imageList" className="list-group list-group-flush">
                    <li className="list-group-item">
                        <p className="text-center"><img src={`https://ipfs.infura.io/ipfs/${props.scriptures.hash}`} style={{ maxWidth: '420px' }} /></p>
                        <p>{props.scriptures.description}</p>
                    </li>
                    <li className="list-group-item py-2">
                        <strong>Price: {window.web3.utils.fromWei(props.scriptures.tipAmount.toString(), 'Ether')} ETH</strong>
                        <br></br>
                        {props.scriptures.title}
                        <br></br>
                        <big className="float-left mt-1 text-muted">
                            {props.scriptures.text}
                        </big>

                    </li>
                    <li className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">
                            TIPS: {window.web3.utils.fromWei(props.scriptures.tipAmount.toString(), 'Ether')} ETH
          </small>
                        <button
                            className="btn btn-link btn-sm float-right pt-0"
                            name={props.scriptures.id}
                            onClick={(event) => {

                                let tipAmount = window.web3.utils.toWei('1', 'Ether')
                                console.log(event.target.name, tipAmount)
                                props.tipImageOwner(event.target.name, tipAmount)
                            }}
                        >
                            TIP 0.1 ETH
          </button>
                    </li>
                </ul>
            </div>


        </ScriptureFeedBox>
    )
}

export default scriptureFeedBody
