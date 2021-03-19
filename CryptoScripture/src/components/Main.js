
import React, { Component } from 'react';

import Identicon from 'identicon.js';
import ScriptureBox from './Scriptures/ScriptureBox.js'
import addIcon from './assets/addTwo.png'

import Switch from "react-switch";

// import { WithContext as ReactTags } from 'react-tag-input';

// const KeyCodes = {
//   comma: 188,
//   enter: 13,
// };

// const delimiters = [KeyCodes.comma, KeyCodes.enter];

class Main extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     tags: [
  //       { id: "Thailand", text: "Thailand" },
  //       { id: "India", text: "India" }
  //     ],
  //     suggestions: [
  //       { id: 'USA', text: 'USA' },
  //       { id: 'Germany', text: 'Germany' },
  //       { id: 'Austria', text: 'Austria' },
  //       { id: 'Costa Rica', text: 'Costa Rica' },
  //       { id: 'Sri Lanka', text: 'Sri Lanka' },
  //       { id: 'Thailand', text: 'Thailand' }
  //     ]
  //   };
  //   this.handleDelete = this.handleDelete.bind(this);
  //   this.handleAddition = this.handleAddition.bind(this);
  //   this.handleDrag = this.handleDrag.bind(this);

  // }


  // handleDelete(i) {
  //   const { tags } = this.state;
  //   this.setState({
  //     tags: tags.filter((tag, index) => index !== i),
  //   });
  // }

  // handleAddition(tag) {
  //   this.setState(state => ({ tags: [...state.tags, tag] }));
  // }

  // handleDrag(tag, currPos, newPos) {
  //   const tags = [...this.state.tags];
  //   const newTags = tags.slice();

  //   newTags.splice(currPos, 1);
  //   newTags.splice(newPos, 0, tag);

  //   // re-render
  //   this.setState({ tags: newTags });
  // }
  constructor(props) {
    super(props);
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    console.log("MAIN PROPS ", this.props.testEngine)
    if (this.state.checked) {
      return (
        <div className="container-fluid mt-5">
          <div className="row pt-5">
            <div className="col-md-12">
              <label>
                <span className="pr-4">Switch between instagram or twitter feed</span>

              </label>
              <br></br>
              <Switch onChange={this.handleChange} checked={this.state.checked} />
            </div>

            <div className="col-lg-6">
            {this.props.scriptures.map((payload, key) => {
              console.log(`FIRST PAYLOAD : ${payload}`);
              return (
                <ScriptureBox apiUserData={this.props.apiUserData[key]} scriptures={this.props.scriptures[key]} />
              )
            })}

          </div>

          <main role="main" className="col-lg-6 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
              <h2 className="text-center pb-5">Submit Your Scripture</h2>
              <form onSubmit={(event) => {
                event.preventDefault()

                const title = this.scriptureTitle.value
                console.log('helloooooo ', title)
                const text = this.scriptureText.value

                let payload = {
                  title,
                  text
                }
                this.props.uploadScripture(payload)
              }} >

                {/* <div className="brand_name"> */}
                <img className="brand_name mb-2" src={addIcon} />

                {/* </div> */}
                <input type='file' id="file" accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.props.captureFile} />

                <div className="form-group mr-sm-2">
                  {/* <label> 
                  Scripture Title :
                </label> */}

                  <input
                    id="scriptureTitle"
                    ref={(input) => { this.scriptureTitle = input }}
                    type="text"
                    className="form-control mt-4 "
                    placeholder="Scripture Title"
                    required>
                  </input>


                  <input
                    id="scriptureText"
                    ref={(input) => { this.scriptureText = input }}
                    type="text"
                    className="form-control mt-4"
                    placeholder="Scripture Text"
                    required>
                  </input>

                  {/* <ReactTags tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters} 
                    

                    /> */}

                </div>

                <button type="submit" class="btn btn-primary btn-block btn-lg">Upload!</button>
              </form>
              </div>
              </main>
          </div>
        </div>
      )
    } else {
      return (
        <div className="container-fluid mt-5">
  
  
          <div className="row pt-5">
            <div className="col-md-12">
              <label>
                <span className="pr-4">Switch between instagram or twitter feed</span>
  
              </label>
              <br></br>
              <Switch onChange={this.handleChange} checked={this.state.checked} />
            </div>
  
            <div className="col-lg-6">
            {this.props.scriptures.map((image, key) => {
  
  console.log('IMAGE AUTHOR : ', image.author)
  return (



    <div className="card mb-4" >

      <div className="card-header">
        <img
          className='mr-2'
          width='30'
          height='30'
          src={`data:image/png;base64,${new Identicon(image.author, 30).toString()}`}
        />
        <small className="text-muted">{image.author}</small>
      </div>
      <ul id="imageList" className="list-group list-group-flush">
        <li className="list-group-item">
          <p className="text-center"><img src={`https://ipfs.infura.io/ipfs/${image.hash}`} style={{ maxWidth: '420px' }} /></p>
          <p>{image.description}</p>
        </li>
        <li className="list-group-item py-2">
          {image.title}
          <br></br>
          <big className="float-left mt-1 text-muted">
            {image.text}
          </big>

        </li>
        <li className="list-group-item py-2">
          <small className="float-left mt-1 text-muted">
            TIPS: {window.web3.utils.fromWei(image.tipAmount.toString(), 'Ether')} ETH
          </small>
          <button
            className="btn btn-link btn-sm float-right pt-0"
            name={image.id}
            onClick={(event) => {

              let tipAmount = window.web3.utils.toWei('1', 'Ether')
              console.log(event.target.name, tipAmount)
              this.props.tipImageOwner(event.target.name, tipAmount)
            }}
          >
            TIP 0.1 ETH
          </button>
        </li>
      </ul>
    </div>
  )
})}
  
            </div>
  
  
            <main role="main" className="col-lg-6 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
              <div className="content mr-auto ml-auto">
                <p>&nbsp;</p>
                <h2 className="text-center pb-5">Submit Your Scripture</h2>
                <form onSubmit={(event) => {
                  event.preventDefault()
  
                  const title = this.scriptureTitle.value
                  console.log('helloooooo ', title)
                  const text = this.scriptureText.value
  
                  let payload = {
                    title,
                    text
                  }
                  this.props.uploadScripture(payload)
                }} >
  
                  {/* <div className="brand_name"> */}
                  <img className="brand_name mb-2" src={addIcon} />
  
                  {/* </div> */}
                  <input type='file' id="file" accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.props.captureFile} />
  
                  <div className="form-group mr-sm-2">
                    {/* <label> 
                    Scripture Title :
                  </label> */}
  
                    <input
                      id="scriptureTitle"
                      ref={(input) => { this.scriptureTitle = input }}
                      type="text"
                      className="form-control mt-4 "
                      placeholder="Scripture Title"
                      required>
                    </input>
  
  
                    <input
                      id="scriptureText"
                      ref={(input) => { this.scriptureText = input }}
                      type="text"
                      className="form-control mt-4"
                      placeholder="Scripture Text"
                      required>
                    </input>
  
                    {/* <ReactTags tags={tags}
                      suggestions={suggestions}
                      handleDelete={this.handleDelete}
                      handleAddition={this.handleAddition}
                      handleDrag={this.handleDrag}
                      delimiters={delimiters} 
                      
  
                      /> */}
  
                  </div>
  
                  <button type="submit" class="btn btn-primary btn-block btn-lg">Upload!</button>
                </form>
                <p>&nbsp;</p>
              </div>
            </main>
          </div>
        </div>
      );

    }

  }
}

export default Main;
