
import React, { Component } from 'react';

import Identicon from 'identicon.js';
import ScriptureBox from './Scriptures/ScriptureBox.js'
import addIcon from './assets/addTwo.png'
import ScriptureFeedBox from './Scriptures/ScriptureFeed.js';
import Image from 'react-bootstrap/Image';
import Work from './work';


import Switch from "react-switch";
import { Style } from "react-style-tag";


import TagsInput from 'react-tagsinput'


import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

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
    this.state = {
      checked: false,
      scriptures: this.props.scriptures,
      tags: [
        { id: "Thailand", text: "Thailand" },
        { id: "India", text: "India" }
      ],
      suggestions: [
        { id: 'USA', text: 'USA' },
        { id: 'Germany', text: 'Germany' },
        { id: 'Austria', text: 'Austria' },
        { id: 'Costa Rica', text: 'Costa Rica' },
        { id: 'Sri Lanka', text: 'Sri Lanka' },
        { id: 'Thailand', text: 'Thailand' }
      ],
      frags: []
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.sortByPopularity = this.sortByPopularity.bind(this);
    this.sortByMostRecent = this.sortByMostRecent.bind(this);

    this.handleChangeTwo = this.handleChangeTwo.bind(this);
  }




  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag) {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
  }


  handleChange(checked) {
    this.setState({ checked });
  }

  handleChangeTwo(frags) {
    this.setState({ frags })
  }



  sortByPopularity() {
    console.log('ENTRO EN POPULARITY VOTE');
    console.log(this.props.scriptures);


    this.setState({
      scriptures: this.props.scriptures.sort((a, b) => {
        return b.tipAmount - a.tipAmount
      })
    });


  }

  sortByMostRecent() {
    console.log('ENTRO EN MOST RECENT');

    console.log(this.props.scriptures);


    this.setState({
      scriptures: this.props.scriptures.sort((a, b) => {
        return b.timestamp - a.timestamp
      })
    });

  }
  render() {
    console.log("MAIN PROPS ", this.props)



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
              <br></br>
              <br></br>
              <TagsInput value={this.state.frags} onChange={this.handleChangeTwo} />
            </div>

            <div className="col-md-12">
              <p><strong>Sort by: </strong>

                <a onClick={this.sortByPopularity} className="sortBadge">Most Popular</a>


                <a onClick={this.sortByMostRecent} className="sortBadge">Most Recent</a>


              </p>
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

                    <ReactTags tags={this.state.tags}
                      suggestions={this.state.suggestions}
                      handleDelete={this.handleDelete}
                      handleAddition={this.handleAddition}
                      handleDrag={this.handleDrag}
                      delimiters={delimiters}


                    />

                  </div>

                  <button type="submit" class="btn btn-primary btn-block btn-lg">Upload!</button>
                </form>
              </div>
            </main>
          </div>


          <Style>{`
          .foo {
            color: red;
 
            &:hover {
              background-color: gray;
            }
 
            @media print {
              color: black;
            }
          }
        `}</Style>
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
              <br></br>
              <br></br>
              <TagsInput value={this.state.frags} onChange={this.handleChangeTwo} />
            </div>

            <div className="col-md-12">
              <p><strong>Sort by: </strong>

                <a onClick={this.sortByPopularity} className="sortBadge">Most Popular</a>


                <a onClick={this.sortByMostRecent} className="sortBadge">Most Recent</a>


              </p>
            </div>





            {this.props.scriptures.map((payload, key) => {
              return (
                <ScriptureFeedBox apiUserData={this.props.apiUserData[key]} scriptures={this.props.scriptures[key]} tipImageOwner={this.props.tipImageOwner} />
              )

            })}




            {/* <Work/> */}

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
