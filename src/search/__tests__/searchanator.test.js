var search = require("../search.js");
var { expect } = require("chai");
var mockName = "hello";
var mockObjectSearch = "name:" + mockName;
var mockSearchTerm = mockName;
var mockSearchArray = [{name: mockName}];
var mockMultiSearchArray = [[{name: mockName}], [{name: mockName}]];
var mockOptions = {
	getSearchTerm: (x) => {
		return x.name
	}
}

describe('Searchanator', function () {
	it('Should be a function', function () {
		expect(search).to.be.a("function");
	});
	describe('With no search term', function () {
		it('Should return an empty array', function () {
			expect(search("", {}, []).length).to.equal(0);
		});
	});
	describe('With no arrays', function () {
		it('Should return an empty array', function () {
			expect(search("asdasd", {}, []).length).to.equal(0);
		});
	});
	describe("With a empty multidimensional array", function() {
		it('Should return an empty array', function () {
			expect(search("asd", {}, [[],[]]).length).to.equal(0);
		});
	});
	describe('With a search term of ' + mockSearchTerm + " and a single array", function () {
		it('Should return an array containing an object with the name of ' + mockName, function () {
			expect(search(mockSearchTerm, mockOptions, mockSearchArray)[0].name).to.equal(mockName);
		});
	});
	describe('With a multidimensional array', function () {
		it('Should return a single array containing all restuls', function () {
			expect(search(mockSearchTerm, mockOptions, mockMultiSearchArray)[0].name).to.equal(mockName);
			expect(search(mockSearchTerm, mockOptions, mockMultiSearchArray)[1].name).to.equal(mockName);
		});
	});
	describe('Searching on properties', function () {
		describe('Single dimentional array', function () {
			it('Should return the name of the provided object', function () {
				expect(search(mockObjectSearch, mockOptions, mockSearchArray)[0].name).to.equal(mockName);
			});	
		});
		describe('Multi dimentional array', function () {
			it('Should return the name of the provided object', function () {
				expect(search(mockObjectSearch, mockOptions, mockMultiSearchArray)[0].name).to.equal(mockName);
			});	
		});
		
	});
});