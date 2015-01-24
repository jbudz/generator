'use strict';
var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');
var readline = require('readline');
var chalk = require('chalk');

var GENERATOR_JSON = 'generator.json';

function getRootDir(cb) {
	exec('git rev-parse --show-toplevel', function(error, stdout, stderr) {
		if (error) {
			cb(process.cwd())
		} else {
			cb(stdout.trim())
		}
	});
}

function generateFiles(paths, requests, name) {
	var options = Object.keys(paths);

	requests.forEach(function(request) {
		var index = options.indexOf(request);
		if (index >= 0 &&
			typeof paths[options[index]].src === "string" && 
			typeof paths[options[index]].dest === "string") {
			getRootDir(function(dir) {
				var src = dir + '/' + paths[options[index]].src;
				var srcFile = src.split('/').slice('-1')[0];
				var extension = srcFile.split('.').slice('-1')[0];
				var dest = dir + '/' + paths[options[index]].dest;
				var outputFile = dest + '/' + name + '.' + extension

				if (fs.existsSync(outputFile)) {
					console.log(chalk.red('Error ') + outputFile + ' already exists');
					return;
				}
				if (!fs.existsSync(dest)) {
					console.log(chalk.red('Error ') + dest + ' does not exist');
					return;
				}
				if (!fs.existsSync(src)) {
					console.log(chalk.red('Error ') + src + ' does not exist');
					return;
				}

				var rl = readline.createInterface({
					input: fs.createReadStream(src),
					output: fs.createWriteStream(outputFile, {
						encoding: 'utf-8'
					}),
					terminal: false
				})

				rl.on('line', function(line) {
					var replacedLine = line.replace('__name__', name);
					rl.output.write(replacedLine + '\n');
				}).on('close', function() {
					console.log(chalk.green('Success ') + rl.output.path);
				});
			});

		} else {
			console.log(chalk.red('Error ') + request + ' not found')
		}
	});
}

module.exports = {
	init: function(success, error) {
		getRootDir(function(dir) {
			var file = dir + '/' + GENERATOR_JSON;
			fs.exists(file, function(exists) {
				if (!exists) {
					fs.writeFile(file, '{\n\n}', function(err) {
						console.log(chalk.red('Error ') + 'Not able to make file ' + file);
					})
				}
			})
		});
	},

	make: function(profiles, name) {
		if (!(profiles && profiles.length && name)) {
			return;
		}

		getRootDir(function(dir) {
			if (!fs.existsSync(dir + '/' + GENERATOR_JSON)) {
				console.log(chalk.red('Error ') + 'Not able to find generator.json')
				return;
			}

			fs.readFile(dir + '/' + GENERATOR_JSON, {
				encoding: 'utf-8'
			}, function(err, data) {
				generateFiles(JSON.parse(data), profiles, name);
			})

		});
	}
}