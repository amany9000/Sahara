
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
	"0xF01600c35f1644A27B6BCD5129baAfa8437A285b");

	return await store.methods.getDeployedInitiatives().call();
} 

//readInt();

const deployInt = async (min, initiativeName, initiativeDesc, creatorName, creatorContact, pass) => {
	const web3 = getWeb3(pass);				
	const accounts = await  web3.eth.getAccounts();
	const store = await new web3.eth.Contract((JSON.parse(compiledStore.interface)), 
	"0xF01600c35f1644A27B6BCD5129baAfa8437A285b");
    		
	console.log("Deployed Int Initially- ", await store.methods.getDeployedInitiatives().call())
	await store.methods.createProject(web3.utils.toWei(min,"ether"), initiativeName, initiativeDesc, creatorName, creatorContact).send(({gas: "3000000", from: accounts[0]}));	

	return await store.methods.getDeployedInitiatives().call()
} 
/*
deployInt("0.25", "Feed'em", "Feeding the homeless Kids of Vadodara", "Daksha Foundation", "www.daksha.com").then((add) => {
	console.log(add[add.length - 1]);
});
*/
module.exports = {readInt, getWeb3, deployInt};
