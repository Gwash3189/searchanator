var mixin = require("../mixin.js");
var { expect } = require("chai");
var sinon = require("sinon");

var makeThisMock = function(ret) {
	return {
		isMounted: sinon.stub().returns(ret),
		setState: sinon.spy()
	}
}
var mockSearchList = [{name: "hello"}];
var thisMock;
var listenMock;
var publishMock;
var mockSearchTerm = "value";
var mockOptions = {};
var mockSearchArrays = [[],[]];
var mockRestParameters = [mockSearchArrays];

describe('Searchanator Mixin', function () {
	beforeEach(function() {
		listenMock = sinon.spy();
	});
	beforeEach(function() {
		publishMock = sinon.spy();
	});
	it('Should be a function', function () {
		expect(mixin).to.be.a("function")
	});
	it('Should return an object', function () {
		expect(mixin(listenMock, publishMock)).to.be.a("object");
	});
	describe('Initial State', function () {
		it('Should return an empty list', function () {
			expect(mixin(listenMock, publishMock).setInitialState().searchList.length).to.equal(0);
		});
	});
	describe('Compoenent did mount', function () {
		it('Should call the listener function', function () {
			mixin(listenMock, publishMock).componentDidMount();
			expect(listenMock.called).to.be.true;
		});
	});
	describe('updateSearchList', function () {
		describe('When is mounted', function () {
			beforeEach(function() {
				thisMock = makeThisMock(true);
			});
			it('Should call setState', function () {
				mixin(listenMock, publishMock).updateSearchList.apply(thisMock, mockSearchList);
				expect(thisMock.setState.called).to.be.true;
			});
			it('Should return the provided search list', function () {
				mixin(listenMock, publishMock).updateSearchList.apply(thisMock, mockSearchList);
				expect(thisMock.setState.args[0][0].searchList).to.deep.equal(mockSearchList[0]);
			});
			it('Should set the showSearch flag to true', function () {
				mixin(listenMock, publishMock).updateSearchList.apply(thisMock, mockSearchList);
				expect(thisMock.setState.args[0][0].showSearch).to.be.true;
			});
		});
		describe('When is not mounted', function () {
			beforeEach(function() {
				thisMock = makeThisMock(false);
			});
			it('Should not call setState', function () {
				mixin(listenMock, publishMock).updateSearchList.apply(thisMock, mockSearchList);
				expect(thisMock.setState.called).to.be.false;
			});
		});
	});
	describe('search', function () {
		describe('With a search term', function () {
			it('Should call publish', function () {
				mixin(listenMock, publishMock).search(mockSearchTerm, mockOptions, mockSearchArrays);
				expect(publishMock.called).to.be.true;
			});
			it('Should call publish with a searchTerm, optionsObject, and searchArrays', function () {
				mixin(listenMock, publishMock).search(mockSearchTerm, mockOptions, mockSearchArrays);
				expect(publishMock.args[0][0]).to.equal(mockSearchTerm);
				expect(publishMock.args[0][1]).to.deep.equal(mockOptions);
				expect(publishMock.args[0][2]).to.deep.equal(mockRestParameters);
			});
		});
		describe('Without a search term', function () {
			describe('And is mounted', function () {
				beforeEach(function(){
					thisMock = makeThisMock(true);
				});
				it('Should call setState', function () {
					mixin(listenMock, publishMock).search.apply(thisMock);
					expect(thisMock.setState.called).to.be.true;
				});
			})
		})
	});
});