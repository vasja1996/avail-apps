let path = require("path");
let dotenv = require("dotenv");

// load config env
let root = path.normalize(`${__dirname}/..`);
console.log("\nroot:", root);
let fileName = "/.env";

const configFile = `${root}${fileName}`;
console.log("\nconfigFile:", configFile);
dotenv.config({ path: configFile, silent: true });

module.exports = {
    testnet_url: process.env.TESTNETURL || 'wss://testnet.polygonavail.net/ws',
    devnet_url: process.env.DEVNETURL || 'wss://devnet-avail.polygon.technology/ws',
};
