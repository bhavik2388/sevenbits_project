const cmdline = require('../index.js');

console.log("Full command line ran: ", process.argv.join(" "));

console.log("Getting /iwant: ", cmdline.get("iwant"));

console.log("Is \"givemecoffe\" set: ", cmdline.keyexists("givemecoffee"));

console.log("Getting --color: ", cmdline.get("color"));

console.log("Checking if A, B and C flags are enabled: ", cmdline.flagenabled("A"), cmdline.flagenabled("B"), cmdline.flagenabled("C"));

console.log("Checking if V, W and X flags are disabled: ", cmdline.flagdisabled("V"), cmdline.flagdisabled("W"), cmdline.flagdisabled("X"));

console.log("Checking if W, X, Y and Z flags are set (enabled or disabled):", cmdline.flagexists("W"), cmdline.flagexists("X"), cmdline.flagexists("Y"), cmdline.flagexists("Z"));

console.log("First argument is: ",cmdline.getvalbyindex(2));