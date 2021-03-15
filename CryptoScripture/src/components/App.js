import Decentragram from '../abis/Decentragram.json'
import CryptoScripture from '../abis/CryptoScripture.json'
import React, { Component } from 'react';
import Identicon from 'identicon.js';
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.css';

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

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
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
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
      // Load images
      for (var i = 1; i <= scriptureCount; i++) {

        const scripture = await cryptoScripture.methods.scriptures(i).call()

        this.setState({
          scripture: [...this.state.scriptures, scripture]
        })
      }
      // Sort scriptures. Show highest tipped scriptures first

      this.setState({
        scripture: this.state.scriptures.sort((a, b) => b.tipAmount - a.tipAmount)
      })
      this.setState({ loading: false })
    } else {
      window.alert('Decentragram contract not deployed to detected network.')
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

  uploadImage = description => {
    console.log("Submitting file to ipfs...")

    //adding file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      if (error) {
        console.error(error)
        return
      }

      this.setState({ loading: true })
      this.state.decentragram.methods.uploadImage(result[0].hash, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  tipImageOwner(id, tipAmount) {
    this.setState({ loading: true })
    this.state.decentragram.methods.tipImageOwner(id).send({ from: this.state.account, value: tipAmount }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  getUser() {
    fetch('https://randomuser.me/api/')
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Request failed.');
      })
      .then(data => {
        console.log('THIS IS THE USER DATAS',data)

        this.setState({
          users: [
            {
              name: data.results[0].name,
              image: data.results[0].picture.medium,
              tweet: data.results[0].email,
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
      loading: true
    }


    this.uploadImage = this.uploadImage.bind(this)
    this.tipImageOwner = this.tipImageOwner.bind(this)
    this.captureFile = this.captureFile.bind(this)
    this.getUser = this.getUser.bind(this)

    this.getUser()


  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
            testEngine={this.state.testEngine}
            images={this.state.images}
            captureFile={this.captureFile}
            uploadImage={this.uploadImage}
            tipImageOwner={this.tipImageOwner}
          />
        }
      </div>
    );
  }
}

export default App;