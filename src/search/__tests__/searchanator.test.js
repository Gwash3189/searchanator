var search = require("../search.js");
var { expect } = require("chai");
var mockName = "hello";
var mockAge = 15;
var mockObjectSearch = "name:" + mockName;
var mockAgeSearch = "age: " + mockAge;
var mockChainedObjectSearch = mockObjectSearch + " ," + mockAgeSearch;
var mockSearchTerm = mockName;
var mockSearchArray = [{name: mockName, age: 15}];
var mockMultiSearchArray = [[{name: mockName, age: 15}], [{name: mockName, age: 47}]];
var mockOptions = {
	getSearchTerm: x => x.name
}
var mockSearchByNumberOptions = {
	getSearchTerm: x => x.age
};

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
	describe('With a search term of ' + mockSearchTerm, function () {
		describe('And a single array', function () {
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
	});
	describe('With a search term of ' + mockAge , function () {
		it('Should return the correct object', function () {
			expect(search(mockAge, mockSearchByNumberOptions, mockMultiSearchArray)[0].name).to.equal(mockName);
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
		describe('With a chained search term', function () {
			describe('Seperated by commas (, )', function () {
				it('Should return the name of the provided object', function () {
					expect(search(mockChainedObjectSearch, mockOptions, mockSearchArray)[0].name).to.equal(mockName);
				});	
			});
			describe('Seperated by spaces ( )', function () {
				it('Should return the name of the provided object', function () {
					expect(search(mockChainedObjectSearch.replace(" ,", " "), mockOptions, mockSearchArray)[0].name).to.equal(mockName);
				});	
			});
			describe('Seperated by comma then space (, )', function () {
				it('Should return the name of the provided object', function () {
					expect(search(mockChainedObjectSearch.replace(" ,", ", "), mockOptions, mockSearchArray)[0].name).to.equal(mockName);
				});	
			});
			describe('Seperated by semi-colon then space (; )', function () {
				it('Should return the name of the provided object', function () {
					expect(search(mockChainedObjectSearch.replace(" ,", "; "), mockOptions, mockSearchArray)[0].name).to.equal(mockName);
				});	
			});
		});
		
	});
});