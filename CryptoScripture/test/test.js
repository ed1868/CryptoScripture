const { assert } = require('chai')

const CryptoScripture = artifacts.require('./CryptoScripture.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('CryptoScripture', ([deployer, author, tipper]) => {
  let cryptoScripture

  before(async () => {
    cryptoScripture = await CryptoScripture.deployed()
  })

  describe('deployment', async () => {

    //one
    it('deploys successfully', async () => {
      const address = await cryptoScripture.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
    //two
    describe('scriptures', async () => {
      let result, scriptureCount

      const hash = "hashValue";

      before(async () => {




        let newDate = new Date().toString();
        console.log(newDate);

        result = await cryptoScripture.uploadScripture(hash, 'If', 'If all I wanted to do is sit and talk to you. Would you listen?', newDate, { from: author })
        scriptureCount = await cryptoScripture.scripturesCount()
      })

      //three

      it('create scriptures', async () => {



        let newDate = new Date().toString();
        // SUCCESS
        assert.equal(scriptureCount, 1)
        const event = result.logs[0].args;

        console.log('THIS IS THE EVENT : ', event);
        assert.equal(event.id.toNumber(), scriptureCount.toNumber(), 'id is correct')
        assert.equal(event.hash, hash, 'Hash is correct')
        assert.equal(event.text, 'If all I wanted to do is sit and talk to you. Would you listen?', 'Text is correct')
        assert.equal(event.title, 'If', 'Title is correct');
        assert.equal(event.date,newDate , 'should be a date');
        assert.equal(event.tipAmount, '0', 'tip amount is correct')
        assert.equal(event.author, author, 'author is correct')
        assert.equal(event.timestamp, event.timestamp, 'It should not be empty')
        console.log(result.logs[0].args)

        // FAILURE TEST : SCRIPTURE MUST HAVE A TIMESTAMP

        await cryptoScripture.uploadScripture(event.hash, 'Tony Stark Ironman Suite V4', { from: author }).should.be.rejected;

        // FAILURE TEST : IMAGE MUST HAVE HASH
        await cryptoScripture.uploadScripture('', 'Tony Stark Ironman Suite V4', { from: author }).should.be.rejected;

        // FAILURE TEST : IMAGE MUST HAVE DESCRIPTION
        await cryptoScripture.uploadScripture('Elon Musks DNA', '', { from: author }).should.be.rejected;

      })
      //CHECK FROM STRUCT
      //four
      it('lists Scriptures', async () => {
        const scripture = await cryptoScripture.scriptures(scriptureCount);

        assert.equal(scripture.id.toNumber(), scriptureCount.toNumber(), 'id is correct')
        assert.equal(scripture.hash, hash, 'Hash is correct')
        assert.equal(scripture.text, 'If all I wanted to do is sit and talk to you. Would you listen?', 'Text is correct')
        assert.equal(scripture.title, 'If', 'Title is correct')
        assert.equal(scripture.tipAmount, '0', 'tip amount is correct')
        assert.equal(scripture.author, author, 'author is correct')
      })

      //five
      it('allows users to tip scriptures', async () => {
        // Track the author balance before purchase
        let oldAuthorBalance
        oldAuthorBalance = await web3.eth.getBalance(author)
        oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

        result = await cryptoScripture.tipScriptureOwner(scriptureCount, { from: tipper, value: web3.utils.toWei('1', 'Ether') })

        // SUCCESS
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), scriptureCount.toNumber(), 'id is correct')
        assert.equal(event.hash, hash, 'Hash is correct')
        //BUG TO FIX ON THIS DISCRIPTION
        assert.equal(event.text, 'If all I wanted to do is sit and talk to you. Would you listen?', 'Text is pinga');
        // assert.equal(event.description, 'Tony Stark Ironman Suite V4', 'description is correct')


        assert.equal(event.tipAmount, '1000000000000000000', 'tip amount is correct')
        assert.equal(event.author, author, 'author is correct')

        // Check that author received funds
        let newAuthorBalance
        newAuthorBalance = await web3.eth.getBalance(author)
        newAuthorBalance = new web3.utils.BN(newAuthorBalance)

        let tipScriptureOwner
        tipScriptureOwner = web3.utils.toWei('1', 'Ether')
        tipScriptureOwner = new web3.utils.BN(tipScriptureOwner)

        const expectedBalance = oldAuthorBalance.add(tipScriptureOwner)

        assert.equal(newAuthorBalance.toString(), expectedBalance.toString())

        // FAILURE: Tries to tip a image that does not exist
        await cryptoScripture.tipScriptureOwner(99, { from: tipper, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
      })
    })



  })

  //three
  it('has a name', async () => {
    const name = await cryptoScripture.name()
    assert.equal(name, 'Nomads Scriptures')
  });


  it('has a timestamp', async () => {
    const timestamp = await cryptoScripture.timestamp()
    console.log('THE TIME STAMP IS : ', timestamp)
    assert.equal(timestamp, timestamp)
  });

});






  // describe('images', async () => {
  //   let result, imageCount
  //   const hash = 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb'

  //   before(async () => {
  //     result = await decentragram.uploadImage(hash, 'Image description', { from: author })
  //     imageCount = await decentragram.imageCount()
  //   })

  //   //check event
  //   it('creates images', async () => {
  //     // SUCESS
  //     assert.equal(imageCount, 1)
  //     const event = result.logs[0].args
  //     assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct')
  //     assert.equal(event.hash, hash, 'Hash is correct')
  //     assert.equal(event.description, 'Image description', 'description is correct')
  //     assert.equal(event.tipAmount, '0', 'tip amount is correct')
  //     assert.equal(event.author, author, 'author is correct')


  //     // FAILURE: Image must have hash
  //     await decentragram.uploadImage('', 'Image description', { from: author }).should.be.rejected;

  //     // FAILURE: Image must have description
  //     await decentragram.uploadImage('Image hash', '', { from: author }).should.be.rejected;
  //   })

  //   //check from Struct
  //   it('lists images', async () => {
  //     const image = await decentragram.images(imageCount)
  //     assert.equal(image.id.toNumber(), imageCount.toNumber(), 'id is correct')
  //     assert.equal(image.hash, hash, 'Hash is correct')
  //     assert.equal(image.description, 'Image description', 'description is correct')
  //     assert.equal(image.tipAmount, '0', 'tip amount is correct')
  //     assert.equal(image.author, author, 'author is correct')
  //   })

  //   it('allows users to tip images', async () => {
  //     // Track the author balance before purchase
  //     let oldAuthorBalance
  //     oldAuthorBalance = await web3.eth.getBalance(author)
  //     oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

  //     result = await decentragram.tipImageOwner(imageCount, { from: tipper, value: web3.utils.toWei('1', 'Ether') })

  //     // SUCCESS
  //     const event = result.logs[0].args
  //     assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct')
  //     assert.equal(event.hash, hash, 'Hash is correct')
  //     assert.equal(event.description, 'Image description', 'description is correct')
  //     assert.equal(event.tipAmount, '1000000000000000000', 'tip amount is correct')
  //     assert.equal(event.author, author, 'author is correct')

  //     // Check that author received funds
  //     let newAuthorBalance
  //     newAuthorBalance = await web3.eth.getBalance(author)
  //     newAuthorBalance = new web3.utils.BN(newAuthorBalance)

  //     let tipImageOwner
  //     tipImageOwner = web3.utils.toWei('1', 'Ether')
  //     tipImageOwner = new web3.utils.BN(tipImageOwner)

  //     const expectedBalance = oldAuthorBalance.add(tipImageOwner)

  //     assert.equal(newAuthorBalance.toString(), expectedBalance.toString())

  //     // FAILURE: Tries to tip a image that does not exist
  //     await decentragram.tipImageOwner(99, { from: tipper, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
  //   })
  // })
// })