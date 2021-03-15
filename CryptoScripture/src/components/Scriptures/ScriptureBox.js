import './ScriptureBox.css';

import React from 'react';

const ScriptureBox = (props) => {
  return (
    <div className="tweet-body">
      {props.children}
    </div>
  )
}

const Image = (props) => {
  return (
    
    // src={props.image}
    <img src={`https://ipfs.infura.io/ipfs/${props.image.hash}`} alt="Logo" className="picture">
    </img>
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

const Tweet = (props) => {
  return (
    <div className="tweet">
      {/* {props.tweet} */}
      I'm just saying this is a test
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

const scriptureBody = (props) => {
  console.log('THIS ARE THE FUCKING PROPS I GET IN THE INNER BODY', props.apiUserData)
  
  
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
    <ScriptureBox>
      <div className="scriptOutline">
        <div className="inner-body">
          <Image image={props.apiUserData.image} />
          <div className="body">
            <div className="inner-body">
               <Name name={`${props.apiUserData.name.first} ${props.apiUserData.name.last}`} />
              <Handle handle={ props.apiUserData.handle} /> 
            </div>
            <Tweet  tweet={props.tweet} />
            <Tip />
          </div>
        </div>
      </div>
    </ScriptureBox>
  )
}

export default scriptureBody