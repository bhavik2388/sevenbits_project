# node-cmdline-parser

Library for easy parsing of command line arguments.

Install by running:

```
npm i node-cmdline-parser
```

It can get:

## Simple key/value

Example. The following code:

```
const cmdline = require('node-cmdline-parser');
console.log(cmdline.get('color'));
```

Will return "white" if you run the script in one of these ways (quotes are optional but mandatory if you're going to use spaces):

* node script.js -color "white"
* node script.js --color white
* node script.js /color white

## Existence

Example. The following code:

```
const cmdline = require('node-cmdline-parser');
if (cmdline.keyexists('givemecoffee')) {
	console.log("You want coffee.");
} else {
	console.log("You do not want coffee.");
}
```

Will return "You want coffee." if you run one of these:

* node script.js -givemecoffee
* node script.js --givemecoffee
* node script.js /givemecoffee

## Flags

Example. This script:

```
const cmdline = require('node-cmdline-parser');

cnosole.log("You want: ");

if (cmdline.flagenabled('C')) console.log("coffee ");

if (cmdline.flagenabled('B')) console.log("beer ");

console.log(" and you do not want: ");

if (cmdline.flagdisabled('V')) console.log("vodka ");

if (cmdline.flagdisabled('W')) console.log("wine ");

console.log(" but you did not tell me if you want: ");

if (!cmdline.flagexists('S')) console.log("soda ");

if (!cmdline.flagexists('J')) console.log("juice ");
```

Will return "Will return "You want: coffee beer  and you do not want: vodka wine  but you did not tell me if you want: soda juice" if you run:

* node script.js +CB -VW

## Getting arguments by its index

You can also read the `process.argv` (0-based index) through this function. The advantage is that if the index does not exist (the user did not specify the argument), it won't throw an error. It will just return the value you specify in the second function parameter.

```
const cmdline = require('node-cmdline-parser');
// 0 = node executable; 1 = node script; 2... = args
var first_argument = cmdline.getvalbyindex(2, false);
if (!first_argument) {
	console.log("You did not specify any argument.");
} else {
	console.log("First argument is: ", first_argument);
}

```

*Just a note:* The second value of `getvalbyindex` method can be an integer value, a string, a boolean value, an array or anything you want it to return if the index does not exist in `process.argv` object.

This parameter is also available in `get` method, also as a second function parameter. In this case, it will return this value if the key was not found. Example:

```
const cmdline = require('node-cmdline-parser');
var user_wants = cmdline.get('iwant', 'nothing');
console.log("You want", user_wants);

```

So, if you run:

* node script.js /iwant water

It will return "You want water". But if you run just:

* node script.js

It will return "You want nothing". Please note that, as these two are the only methods in this module meant to return strings, the second parameter is not available for the other functions. By default, if you do not specify any fallback value, it returns null if the wanted value could not be found.

Also, please note that this module can NOT parse arguments in the format key=value. Example:

* node script.js key=value **IT WILL NOT WORK**

# Other Ports

This lib is a port from the [AutoIt3 UDF](https://www.autoitscript.com/forum/topic/169610-cmdline-udf-get-valueexistenceflag/), which is also available as a [PHP library](https://gist.github.com/jesobreira/4e8b5e4a1fa2b32676de).