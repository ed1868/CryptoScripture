
import React, { Component } from 'react';

import Identicon from 'identicon.js';
import ScriptureBox from './Scriptures/ScriptureBox.js'
import addIcon from './assets/addTwo.png'
class Main extends Component {

  render() {
console.log("MAIN PROPS ", this.props.testEngine)

    return (
      <div className="container-fluid mt-5">


        <div className="row">
          <div className="col-md-6">
            {this.props.scriptures.map((payload, key) => {
              console.log(`FIRST PAYLOAD : ${payload}`);
              return (
                <ScriptureBox apiUserData={this.props.apiUserData[key]} scriptures={this.props.scriptures[key]}/>
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
                </div>

                <button type="submit" class="btn btn-primary btn-block btn-lg">Upload!</button>
              </form>
              <p>&nbsp;</p>
              {this.props.scriptures.map((image, key) => {
                return (

                  <div className="card mb-4" key={key} id={key} >

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
                        <p className="text-center"><img src={`https://ipfs.infura.io/ipfs/${image.hash}`} style={{ maxWidth: '420px'}} /></p>
                        <p>{image.description}</p>
                      </li>
                      <li key={key} className="list-group-item py-2">
                       {image.title}
                       <br></br>
                        <big className="float-left mt-1 text-muted">
                      {image.text}
                        </big>
                     
                      </li>
                      <li key={key} className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">
                          TIPS: {window.web3.utils.fromWei(image.tipAmount.toString(), 'Ether')} ETH
                        </small>
                        <button
                          className="btn btn-link btn-sm float-right pt-0"
                          name={image.id}
                          onClick={(event) => {
                            let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
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
          </main>
        </div>
      </div>
    );
  }
}

export default Main;
