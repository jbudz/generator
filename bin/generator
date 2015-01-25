#!/usr/bin/env node

var generator = require('../generator');
var pkg = require('../package.json');

var args = process.argv.slice(2);

function help() {
	console.log([
		'',
		'Usage: generate [template 1, template 2, ..., template n] name',
		'',
		pkg.description,
		'',
		'Example: generate test view template Clock'
	].join('\n'));
}


function run(args) {
	if(args.length === 0 ) {
		help();
	} else if(args.length === 1 && args[0] === 'init') {
			generator.init();
	} else {
		generator.make(args.slice(0, args.length - 1), args[args.length -1])
	}
}

run(args);