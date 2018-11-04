// This file contains functions which interact with the specified initiative instances. 
const compiledInt = require("../ethereum/build/Initiative.json");
const compiledReq = require("../ethereum/build/Request.json");

const {readInt, getWeb3, deployInt} = require("./store.js");

const getAllInitiatives = async(pass) => {

	return await readInt(pass)
		.then( async (deployedInts) => {
		
		const web3 = getWeb3(pass);	
		const accounts = await  web3.eth.getAccounts();
		
		const initiativeDetailList = [];
		for(i in deployedInts){		
			const initiative = await new web3.eth.Contract((JSON.parse(compiledInt.interface)), 
			deployedInts[i]);

			const initiativeName = await initiative.methods.initiativeName().call();
			const initiativeDesc = await initiative.methods.initiativeDesc().call();
			const creatorName = await initiative.methods.creatorName().call();
			const creatorContact = await initiative.methods.creatorContact().call();
			
			initiativeDetailList.push({
				address: deployedInts[i],
				initiativeName,
				initiativeDesc,
				creatorName,
				creatorContact
			});
			delete initiative, initiativeName, initiativeDesc, creatorContact, creatorName;
		}
		console.log(initiativeDetailList);
		return initiativeDetailList;
	});
}

const getInitiativeDetails = async(address, pass) => {
	
	const web3 = getWeb3(pass);				
	const accounts = await  web3.eth.getAccounts();		
	const initiativeDetailList = {};
	
	const initiative = await new web3.eth.Contract((JSON.parse(compiledInt.interface)), 
	address);
	
	const initiativeName = await initiative.methods.initiativeName().call();
	const initiativeDesc = await initiative.methods.initiativeDesc().call();
	const creatorName = await initiative.methods.creatorName().call();
	const creatorContact = await initiative.methods.creatorContact().call();

	let backRequest  = await initiative.methods.backRequests(0).call().catch((err) => {
		console.log("hey1",{initiativeName, initiativeDesc, creatorName, creatorContact})
		return {initiativeName, initiativeDesc, creatorName, creatorContact}
	})

	//console.log(request)
	let i = 0;
	let BRDetail = [];
	
	while(backRequest.description != null){
		BRDetail.push({
			index: i,
			request:
			{
			description: backRequest.description,
			value : backRequest.value
		}});
		i++;
		backRequest = await initiative.methods.backRequests(i).call().catch((err) => {
		//console.log("hey2", {initiativeName, initiativeDesc, creatorName, creatorContact, minContribution, approversCount})
		return {initiativeName, initiativeDesc, creatorName, creatorContact, BRDetail}
		});
	}
	delete initiative,i,backRequest; 	
	console.log("hey3",{initiativeName, initiativeDesc, creatorName, creatorContact, BRDetail})
	return {initiativeName, initiativeDesc, creatorName, creatorContact,reqDetailList, BRDetail}
}

const contribute = async(address, amount, pass) => {
	
	const web3 = getWeb3(pass);					
	const req = await new web3.eth.Contract((JSON.parse(compiledReq.interface)), 
		address);

	const accounts = await  web3.eth.getAccounts();
	await req.methods.contribute().send({
		from: accounts[0],
		value: web3.utils.toWei(amount,"ether")
	});
}


const createRequest = async(address, description, contact, value, recipient ,min, pass) => {
	
	const web3 = getWeb3(pass);					
	const project = await new web3.eth.Contract((JSON.parse(compiledInt.interface)), 
		address);
	const accounts = await  web3.eth.getAccounts();
	
	await project.methods
			.createRequest(description,contact, value, recipient, min)
			.send({
				from: accounts[0],
				gas: "3000000"
