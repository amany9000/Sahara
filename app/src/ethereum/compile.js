// Compile script to store the camapaign and projectStore contract object in build directory
const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath= path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const projectPath = path.resolve(__dirname, "contracts", "Initiative.sol");
const source = fs.readFileSync(projectPath, "utf-8");

const input = {
    language: 'Solidity',
    sources: {
        'Store' : {
            content: source
        },
        'Initiative' : {
            content: source
        },
        'Request' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output){
	fs.outputJsonSync(
		path.resolve(buildPath, contract.replace(":", "") + ".json"),
		output[contract]	
	);
}