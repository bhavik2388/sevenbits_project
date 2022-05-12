var mysql = require('mysql');
var Wallet = require('ethereumjs-wallet');
// ------------------------------------GENERATING ADDRESS---------------------------------------------//
count=100
address = [];
// 
for(var i=0;i<=100;i++){
	const EthWallet = Wallet.default.generate();
    address[i]=EthWallet.getAddressString();
    count--;
} 
// insterting dummy address in address array for testing
address.push("0x3E8B8f87A5A5E6fC5cFA65A6b99095293Cf67777");
console.log(address)

// ------------------------------------Database Connectivity---------------------------------------------//
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
    pssword: "",
    database: "sevenbits_project"
  });
  
  con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
  });


// -----------------------------------Web3--------------------------------------------------------------//
const Web3 = require("web3")
var Tx = require('ethereumjs-tx')
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/894a64aec4db432fbc7161c8a5c32c92"))

// function to will check every new Block transaction and verify against our 100 addresses.if the transaction is to our address then insert it in the MySql database table.
async function main() {
	itr = 20;
	const latest = await web3.eth.getBlockNumber();
	for(var b=0;b<=itr;b++){
		let block = await web3.eth.getBlock(latest - b);
		let transactions = await block.transactions;
		for(var i=0;i<transactions.length;i++)
		{
			let toadd = "";
			try{
				trn = await web3.eth.getTransaction(transactions[i])
				
				toadd = await trn.to;
			}
			catch(e){
				console.log("error occured at transaction :" + i + transactions[i])
			}
			if(toadd != ""){
				for(var j=0;j<=address.length;j++){
					if (toadd == address[j] && toadd !=null){
						// transactions.push("0xb0be692ff4c96c6034d24ba0b07d192a0c5cfe678208f2fa65f577a01415c968")
						block_hash = await block.hash;
						block_parent_hash = await block.parentHash;
						let process = 1;
						let sql = "select * from blocks where Id ="+block.number;
						con.query(sql, function(err, rows, fields) {
							if(rows.length>0){
								process = rows[0].Process + 1
								con.query("update blocks set Process="+ process + " where Id="+block.number)
							}
							else{
								con.query("insert into blocks(Id, Block_Hash, Parent_Hash, Timestamp, Process) values(?,?,?,?,?)",[block.number, block_hash, block_parent_hash, block.timstamp, process])	

							}
						});
						con.query("insert into transactions(Id, Transaction_hash, FromAddress, ToAddress, Timestamp, Amount) values(?,?,?,?,?,?)",[trn.nonce, trn.hash, trn.from, toadd, block.timestamp,trn.value])
				}
				}
			}
		}
	}

}
main();
