import './ScriptureBox.css';

import React from 'react';

const ScriptureBox = (props) => {
  return(
    <div className="tweet-body">
      {props.children}
    </div>
  )
}

const Image = (props) => {
  return(
    <img src={props.image} alt="Logo" className="picture">
    </img>
  )
}

const Handle = (props) => {
  return(
    <div className="handle">
      {/* {props.handle} */}
      @hwek21
    </div>
  )
}

const Name = (props) => {
  return(
    <div className="name">
      {/* {props.name} */}
      Eddie Ruiz
    </div>
  )
}

const Tweet = (props) => {
  return(
    <div className="tweet">
      {/* {props.tweet} */}
      I'm just saying this is a test
    </div>
  )
}

const scriptureBody = (props) => {
  return(
    <ScriptureBox>
      <div  className="scriptOutline">
      <div className="inner-body">
        <Image image={props.image}/>
        <div className="body">
          <div className="inner-body">
            <Name name={props.name}/>
            <Handle handle={props.handle}/>
          </div>
          <Tweet tweet={props.tweet}/>
        </div>
      </div>
      </div>
    </ScriptureBox>
  )
}

export default scriptureBody