
// This file contains read() which returns a promise containing the contract instance of inbox
const Web3 = require("web3");
const hdWalletProvider = require("truffle-hdwallet-provider");
const compiledStore = require("../ethereum/build/Store.json");


const getWeb3 = (pass) => {
const provider = new hdWalletProvider(
	pass,
	"https://rinkeby.infura.io/v3/e8bccfbf91864d7ea8797b0ae8b2d30a"  // This address will be generated through infura 
);

const web3 = new Web3(provider);
return web3;	
} 

const readInt = async (pass) => {
	const web3 = getWeb3(pass);
	const accounts = await  web3.eth.getAccounts();
	const store = await new web3.eth.Contract((JSON.parse(compiledStore.interface)), 
	"0x24f5EC608bCcD0bA82AE395BD6a5bE084865bff2");

	return await store.methods.getDeployedInitiatives().call();
} 

/*
readInt("cousin wasp clip dynamic advance devote this million magic bean ceiling anger").then(async (deployedInts)=> {
	console.log(deployedInts);
})
*/
const deployInt = async (initiativeName, initiativeDesc, creatorName, creatorContact, pass) => {
	const web3 = getWeb3(pass);				
	const accounts = await  web3.eth.getAccounts();
	const store = await new web3.eth.Contract((JSON.parse(compiledStore.interface)), 
	"0x24f5EC608bCcD0bA82AE395BD6a5bE084865bff2");
    const dep = await store.methods.getDeployedInitiatives().call();		
	console.log("Deployed Int Initially- ", dep)
	await store.methods.createInitiative(initiativeName, initiativeDesc, creatorName, creatorContact).send(({gas: "3000000", from: accounts[0]}));	
	// delete dep;
	return await store.methods.getDeployedInitiatives().call()
} 
/*
deployInt("Teach them all", "Teaching the Kids of Gandhinagar", "Faksha Foundation", "www.faksha.com", "cousin wasp clip dynamic advance devote this million magic bean ceiling anger").then(async(add) => {
	console.log("after deployment - ",add);
});
*/
export {readInt, getWeb3, deployInt};
