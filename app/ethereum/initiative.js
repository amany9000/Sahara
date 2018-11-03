// This file contains functions which interact with the specified initiative instances. 
const compiledInt = require("../ethereum/build/Initiative.json");
const compiledRequest = require("../ethereum/build/Request.json");

const {readInt, getWeb3, deployInt} = require("./store.js");

const getAllinitiatives = async(pass) => {

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



//getAllinitiatives("cousin wasp clip dynamic advance devote this million magic bean ceiling anger");
