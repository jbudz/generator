var assert = require('assert');
var generator = require('../generator');
var childProcess = require('child_process');
var path = require('path');
var fs = require('fs');
var sinon = require('sinon');

describe('init', function() {	
	var sandbox;
	beforeEach(function () {
	    sandbox = sinon.sandbox.create();
	});

	afterEach(function () {
	    sandbox.restore();
	});

	it('should create a startup file in the project root dir', function(done) {
		sandbox.stub(fs, 'exists', function(args, cb) {
			cb(false);
		});

		sandbox.stub(fs, 'writeFile', function(a, b, cb) {
			cb();
		});


		sandbox.stub(childProcess, 'exec', function(args, cb) {
			cb(null, '/home');
		})

		generator.init(function(file) {
			assert.equal(file, '/home/generator.json');
			done();
		});
	});

	it('should be able to make new files', function() {
		
	});
});

