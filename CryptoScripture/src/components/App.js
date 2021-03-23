import Decentragram from '../abis/Decentragram.json'
import CryptoScripture from '../abis/CryptoScripture.json'
import React, { Component, useState } from 'react';
import Identicon from 'identicon.js';
import Header from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.css';

import Preview from './Preview/Preview';
//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values


//TODO : ADD PAGE WITH DESCRIPTION WHEN PEOPLE DONT HAVE ETHEREUM WALLETS LIKE METABASE
//TODO : ADD FOOTER
//TODO : ADD SORTS
//TODO : ADD SLIDER EXAMPLE
//TODO : ADD HASHTAG 
//TODO : ADD CHARACTER COUNT 
//TODO : BETTER STYLING FOR SHOWCASING
//TODO : FIGURE OUT TOKEN TRANSFERING
//TODO : SIGNATURE OF "AUTHENTICIY" ON POST 
//TODO : FILTER FROM MOST RECENT POST OR MOST TIPPED POST

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
      this.setState({ preview: true });
      this.setState({ loading: false });
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    if (web3 == undefined) {
      this.setState({ preview: true });
      this.setState({ loading: false });
      return;
    }
    // Load account
    const accounts = await web3.eth.getAccounts()

    console.log(`THESE ARE THE ACCOUNTS : ${accounts}`);
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = CryptoScripture.networks[networkId]
    if (networkData) {
      const cryptoScripture = new web3.eth.Contract(CryptoScripture.abi, networkData.address)
      this.setState({ cryptoScripture })
      const scriptureCount = await cryptoScripture.methods.scripturesCount().call()
      this.setState({ scriptureCount })
      // Load scriptures
      for (var i = 1; i <= scriptureCount; i++) {
        const scripture = await cryptoScripture.methods.scriptures(i).call()
        this.setState({
          scriptures: [...this.state.scriptures, scripture]
        })
      }
      // Sort scriptures. Show highest tipped scriptures first

      this.setState({
        scriptures: this.state.scriptures.sort((a, b) => b.tipAmount - a.tipAmount)
      })
      this.setState({ loading: false })

    } else {
      window.alert('Crypture Scripture contract not deployed to detected network.');


    }
  }

  captureFile = event => {

    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }




  uploadScripture = payload => {
    console.log("Submitting file to ipfs...")
    console.log('PAYLOAD----', payload);


    payload.date = new Date().toString();
    console.log('PAYLOAD NOW-----', payload)
    //adding file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      if (error) {
        console.error(error)
        return
      }

      this.setState({ loading: true })
      this.state.cryptoScripture.methods.uploadScripture(result[0].hash, payload.title, payload.text,payload.date).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })

      })
        .then(err => {
          if (err) {
            console.log('THE ERROR IS : ', err);
          }

          window.location.reload(true);
        })


    })




  }

  tipImageOwner(id, tipAmount) {

    console.log(`USER ID : ${id}`);
    console.log(`Tip amount : ${tipAmount}`);
    this.setState({ loading: true })
    this.state.cryptoScripture.methods.tipScriptureOwner(id).send({ from: this.state.account, value: tipAmount }).on('transactionHash', (hash) => {
      this.setState({ loading: false });
    })
      .then(err => {
        if (err) {
          console.log('THE ERROR IS : ', err);
        }

        window.location.reload(true);
      })

  }






  getUser() {
    fetch('https://randomuser.me/api/')
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Request failed.');
      })
      .then(data => {
        console.log('THIS IS THE USER DATAS', data)

        this.setState({
          users: [
            {
              name: data.results[0].name,
              image: data.results[0].picture.medium,
              handle: data.results[0].login.username,
            },
            ...this.state.users,
          ]
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      scriptures: [],
      testEngine: ["one", "two", "three"],
      decentragram: null,
      cryptoScripture: null,
      images: [],
      users: [],
      loading: true,
      preview: false
    }






    this.uploadScripture = this.uploadScripture.bind(this)
    this.tipImageOwner = this.tipImageOwner.bind(this)
    this.captureFile = this.captureFile.bind(this)
    this.getUser = this.getUser.bind(this)

    this.state.testEngine.forEach(element => {

      this.getUser()
    });


  }

  render() {
    if (this.state.preview) {
      return (
        <div>
          <Header account={this.state.account} />
          { this.state.loading
            ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
            :
            <Preview account={this.state.account} />
          }
        </div>
      )
    } else {
      return (
        <div>
          <Header account={this.state.account} />
          { this.state.loading
            ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
            :



            <Main
              loggedInAccount={this.state.account}
              testEngine={this.state.testEngine}
              scriptures={this.state.scriptures}
              captureFile={this.captureFile}
              uploadScripture={this.uploadScripture}
              tipImageOwner={this.tipImageOwner}
              apiUserData={this.state.users}

            />
          }
        </div>
      );
    }

  }
}

export default App;
