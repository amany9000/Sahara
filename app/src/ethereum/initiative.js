// This file contains functions which interact with the specified initiative instances. 
const compiledInt = require("../ethereum/build/Initiative.json");
const compiledReq = require("../ethereum/build/Request.json");

const {readInt, getWeb3, deployInt} = require("./store.js");

const getAllInitiatives = async(web3) => {

	return await readInt(web3)
		.then( async (deployedInts) => {
		
		const initiativeDetailList = [];
		for(var i in deployedInts){		
			const initiative = await new web3.eth.Contract(compiledInt.Initiative.abi, 
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
		}
		//console.log(initiativeDetailList);
		return initiativeDetailList;
	});
}

const getInitiativeDetails = async(address, web3) => {
	
	const initiativeDetailList = {};
	
	const initiative = await new web3.eth.Contract(compiledInt.Initiative.abi, 
	address);
	
	const initiativeName = await initiative.methods.initiativeName().call();
	const initiativeDesc = await initiative.methods.initiativeDesc().call();
	const creatorName = await initiative.methods.creatorName().call();
	const creatorContact = await initiative.methods.creatorContact().call();

	let i = 0;
	let BRDetail = [];
	
	const deployedReq = await initiative.methods.getDeployedRequests().call();

	const reqDetailList = [];
		for(i in deployedReq){		
			const req = await new web3.eth.Contract(compiledReq.Request.abi, 
			deployedReq[i]);

			const description = await req.methods.description().call();
			const value = await req.methods.value().call();

			reqDetailList.push({
				address: deployedReq[i],
				description,
				value
			});
		}

	let backRequest  = await initiative.methods.backRequests(0).call().catch((err) => {
		return {initiativeName, initiativeDesc, creatorName, creatorContact, reqDetailList}
	});	
	while(backRequest.source != null){
		BRDetail.push({
			index: i,
			request:
			{
			source: backRequest.source,
			dest: backRequest.dest ,
			value : backRequest.value
		}});
		i++;
		backRequest = await initiative.methods.backRequests(i).call().catch((err) => {
		//console.log("hey2", {initiativeName, initiativeDesc, creatorName, creatorContact, minContribution, approversCount})
		return {initiativeName, initiativeDesc, creatorName, creatorContact, BRDetail}
		});
	}
	// delete initiative,i,backRequest; 	
	return {initiativeName, initiativeDesc, creatorName, creatorContact,reqDetailList, BRDetail}
}

const contribute = async(address, amount, web3) => {
	console.log("cont", address, amount)	
	//const web3 = getWeb3(pass);					
	const req = await new web3.eth.Contract(compiledReq.Request.abi, 
		address);

	const accounts = await  web3.eth.getAccounts();
	console.log(accounts)
	return await req.methods.contribute().send({
		from: accounts[0],
		value: web3.utils.toWei(amount, "finney")
	});
}


const createRequest = async(address, description, contact, value, recipient ,min, web3) => {
	
	//const web3 = getWeb3(pass);					
	const project = await new web3.eth.Contract(compiledInt.Initiative.abi, 
		address);
	const accounts = await  web3.eth.getAccounts();
	
	return await project.methods
			.createRequest(description,contact, value, recipient, min)
			.send({
				from: accounts[0],
				gas: "3000000"
			});
}

// const createBR = async(address, from, to, val, pass) => {
	
// 	const web3 = getWeb3(pass);					
// 	const int = await new web3.eth.Contract(compiledInt.Initiative.abi, 
// 		address);
// 	const accounts = await  web3.eth.getAccounts();
	
// 	await project.methods
// 			.createBR(from, to, val)
// 			.send({
// 				from: accounts[0],
// 				gas: "3000000"
// 			});
// 	console.log("yesss");			
// }

const finalizeRequest = async(address, web3) => {

	//const web3 = getWeb3(pass);						
	const req = await new web3.eth.Contract(compiledReq.Request.abi, 
		address);
	const accounts = await  web3.eth.getAccounts();
	await req.methods.finalizeRequest().send({
				from: accounts[0],
				gas: "3000000"
			}).then((xyz) => {
		console.log("Dne!!!!");
		return "Done";
	}).catch((err) => {
		console.log(err)
		return null;
	});
}

const finalizeBR = async(address, index, web3) => {

	//const web3 = getWeb3(pass);						
	const int = await new web3.eth.Contract(compiledInt.Initiative.abi, 
		address);
	const accounts = await  web3.eth.getAccounts();
	let request  = await int.methods.finalizeBR().send({
				from: accounts[0],
				gas: "3000000"
			}).then((xyz) => {
		console.log("Dne!!!!");
		return "Done";
	}).catch((err) => {
		console.log(err)
		return null;
	});
}

const approveBR = async(address, index, web3) => {

	//const web3 = getWeb3(pass);							
	const int = await new web3.eth.Contract(compiledInt.Initiative.abi, 
		address);
	const accounts = await  web3.eth.getAccounts();
	let request  = await int.methods.approveBR(index).send({
				from: accounts[0],
				gas: "3000000"
			}).then((xyz) => {
		console.log("Approved!!!!");
		return "Approved";
	}).catch((err) => {
		console.log(err)
		return null;
	});
}

const getBRDetails = async(address, index, web3) => {

	//const web3 = getWeb3(pass);								
	const int = await new web3.eth.Contract(compiledInt.Initiative.abi, 
		address);

	const accounts = await  web3.eth.getAccounts();
	let br  = await int.methods.BackRequest(index).call().catch((err) => {
		return null;
	});

	let BRDesc = {source:br.source,
        dest:br.dest,
        value: br.value,
        approvalCount: br.approvalCount
        };
    console.log(BRDesc)
    return BRDesc;  
}
const getReqDetails = async(address, web3) => {
	//const web3 = getWeb3(pass);								
	const req = await new web3.eth.Contract(compiledReq.Request.abi, 
		address);
	const desp = await req.methods.description().call(); 
	const con = await req.methods.contact().call(); 
	const val = await req.methods.value().call(); 
	const rec = await req.methods.recipient().call(); 
	const com = await req.methods.complete().call(); 
	const man = await req.methods.manager().call(); 
	const min = await req.methods.minContribution().call(); 
	const app = await req.methods.approversCount().call(); 
	let reqDesc = {
		description: desp,
    	contact: con,
    	value: val,
    	recipient: rec,
    	complete: com,
    	manager: man,
    	minContribution: min,
    	approversCount: app	
        };
    console.log(reqDesc)
    return reqDesc;  
}

//getAllInitiatives(getWeb3("cousin wasp clip dynamic advance devote this million magic bean ceiling anger")).then(console.log);
getInitiativeDetails("0x9EDe6739711Ba0Af33dec68578EF1df25F81f44E",getWeb3("cousin wasp clip dynamic advance devote this million magic bean ceiling anger")).then(console.log);
//createRequest("0x9EDe6739711Ba0Af33dec68578EF1df25F81f44E", "Buying Utensils","www.vendor.com", 4,"0x88a4dd75299C3628dc75ba58f238bD3Fff29Ede0",1, "cousin wasp clip dynamic advance devote this million magic bean ceiling anger");
// contribute("0x31E7cb1Ad0F3bbb45a77f56e12D12C7a3Dec1b55","4","sunset mixture horn mail various scene civil bundle code struggle indicate assault");

//export {getAllInitiatives, createRequest, getInitiativeDetails, getReqDetails, contribute, finalizeRequest, finalizeBR, approveBR, getBRDetails};
module.exports = {getAllInitiatives, createRequest, getInitiativeDetails, getReqDetails, contribute, finalizeRequest, finalizeBR, approveBR, getBRDetails};