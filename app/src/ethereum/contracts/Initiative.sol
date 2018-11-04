pragma solidity ^0.4.17;
contract Store {
    address[] public deployedInitiatives;
    function createInitiative(string initiativeName, string initiativeDesc, string creatorName, string creatorContact) public{
        address newInitiative = new Initiative(msg.sender, initiativeName, initiativeDesc, creatorName, creatorContact);
        deployedInitiatives.push(newInitiative);
    }
    function getDeployedInitiatives() public view returns (address[]){
        return deployedInitiatives;
    }
}
contract Initiative {
    address public manager;
    address[] public deployedRequests;
    string public initiativeName;
    string public initiativeDesc;
    string public creatorName;
    string public creatorContact;
    struct BackRequest{
        address source;
        address dest;
        uint value;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    BackRequest[] public backRequests;  
    modifier onlyManager{
        require(msg.sender == manager);
        _;
    }
    constructor (address creator, string InitiativeName, string InitiativeDesc, string CreatorName, string CreatorContact) public{
        manager = creator;
        initiativeName = InitiativeName;
        initiativeDesc = InitiativeDesc;
        creatorName = CreatorName;
        creatorContact = CreatorContact;
    }
    function createBR(address From, address to, uint val) public onlyManager{
        Request temp = Request(to);
        require(temp.checkStatus(val));
        BackRequest memory newBR = BackRequest({
            source: From,
            dest: to,
            value: val,
            approvalCount: 0
        });
        backRequests.push(newBR);
    } 
    function approveBR(uint index) public{
        Request temp = Request(backRequests[index].source);

        require(temp.check(msg.sender));
        require(!backRequests[index].approvals[msg.sender]);
        backRequests[index].approvals[msg.sender] = true;
        backRequests[index].approvalCount++;
    }
    function finalizeBR(uint index) public onlyManager{
        Request temp = Request(backRequests[index].source);
        uint count = temp.getCount();
        require(backRequests[index].approvalCount == count);  
        temp.back(backRequests[index].dest, backRequests[index].value);
    }
    function createRequest(string description, string contact, uint value, address recipient, uint min) public onlyManager{
        address newRequest = new Request(description, contact, value, recipient, min, manager);
        deployedRequests.push(newRequest);
    }
    function getDeployedRequests() public view returns (address[]){
        return deployedRequests;
    }
}
contract Request{
    string public description;
    string public contact;
    uint public value;
    address public recipient;
    bool public complete;
    address public manager;
    uint public minContribution;
    uint public approversCount;
    mapping (address => bool) public approvers;
    constructor(string descp, string Contact, uint val, address recip, uint min, address sentManager) public{
        description = descp;
        contact = Contact;
        value = val;
        recipient = recip;
        complete = false;
        minContribution = min;
        approversCount =0;
        manager = sentManager;
    }
    modifier onlyManager{
        require(msg.sender == manager);
        _;
    }
    modifier tarDone{
        require(address(this).balance >= value);
        _;
    }
    modifier tarNotDone{
        require(address(this).balance < value);
        _;
    }    
    function finalizeRequest() public onlyManager tarDone{
        require(!complete);
        recipient.transfer(value);
        complete = true;
    }
    function contribute() public payable {
        require(msg.value >= minContribution);
        require(!approvers[msg.sender]);
        approvers[msg.sender] = true;
        approversCount++;
    }
    function back(address dest, uint val) public tarNotDone {
        require(!complete);
        require((address(this).balance) >= (val));
        dest.transfer(val);
    }
    function getCount() public view returns (uint){
        return approversCount;
    }
    function check(address toBeChecked) public view returns (bool){
        return approvers[toBeChecked];
    }
    function checkStatus(uint val) public view returns (bool){
        return (((address(this).balance + val) >= value) && (!complete));
    }
    function checkBal() public view returns (uint){
        return (address(this).balance);
    }
}