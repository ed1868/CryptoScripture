pragma solidity ^0.5.0;

//TODO ADD HASHTAGS (OPTIONAL)


contract CryptoScripture {
    // Code goes here...

    string public name = "Nomads Scriptures";
    uint256 public timestamp = block.timestamp;

    // STORE SCRIPTURES

      uint public scripturesCount = 0;

    mapping(uint => Scripture) public scriptures;

    struct Scripture {
        uint id;
        string hash;
        string title;
        string text;
        string date;
        uint tipAmount;
        address payable author;
        uint timestamp;
    }

    event ScriptureCreated(
        uint id,
        string hash,
        string title,
        string text,
        string date,
        uint tipAmount,
        address payable author,
        uint timestamp
    );

    event ScriptureTipped(
        uint id,
        string hash,
        string title,
        string text,
        string date,
        uint tipAmount,
        address payable author,
        uint timestamp
    );



    // CREATE SCRIPTURE
    function uploadScripture(
        string memory _scripHash,
        string memory _title,
        string memory _text,
        string memory _date
    ) public {


        //ENSURE THAT SCRIPTURE HASH EXISTS
        require(bytes(_scripHash).length > 0);
        // ENSURE THAT SCRIPTURE DESCRIPTION EXISTS
        require(bytes(_text).length > 0);
        // ENSURE THAT SCRIPTURE TITLE EXIST
        require(bytes(_title).length > 0);
        // ENSURE THAT UPLOADER ADDRESS ALREADY
        require(msg.sender != address(0));
        // INCREMENT SCRIPTURE ID
        scripturesCount++;
        // ADD SCRIPTURE TO CONTRACT
        scriptures[scripturesCount] = Scripture(
            scripturesCount,
            _scripHash,
            _title,
            _text,
            _date,
            0,
            msg.sender,
            block.timestamp
        );

        // TRIGGER ON EVENT
        emit ScriptureCreated(
            scripturesCount,
            _scripHash,
            _title,
            _text,
            _date,
            0,
            msg.sender,
            block.timestamp
        );
    }

    // TIP SCRIPTURES

    function tipScriptureOwner(uint256 _id) public payable {
        //MAKE SURE ID IS VALID
        require(_id > 0 && _id <= scripturesCount);

        //FETCH SCRIPTURES
        Scripture memory _scripture = scriptures[_id];

        //FETCH THE AUTHOR

        address payable _author = _scripture.author;

        //PAY THE AUTHOR BY SENDING THEM ETHER

        address(_author).transfer(msg.value);

        //INCREMENT THE TIP AMOUNT

        _scripture.tipAmount = _scripture.tipAmount + msg.value;

        //UPDATE THE SCRIPTURE

        scriptures[_id] = _scripture;

        //TRIGGER AN EVENT
        emit ScriptureTipped(
            _id,
            _scripture.hash,
            _scripture.title,
            _scripture.text,
            _scripture.date,
            _scripture.tipAmount,
            _author,
            block.timestamp
        );

        // emit ScriptureTipped(_id, hash, title, text, tipAmount, author);x
    }
}

