"use strict";

function flatMap(arrofArrays) {
    return [].concat.apply([], arrofArrays);
};

function restArgumentsFlatMap(arrays) {
    return flatMap(flatMap(arrays));
};

function complexSearchMixin(obj) {
    var o = {};
    o.search = obj.search || "";
    o.property = obj.property || "";
    return o;
};
var Searchanator = function Searchanator(searchTerm, options) {
    for (var _len = arguments.length, arrays = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        arrays[_key - 2] = arguments[_key];
    }

    var searchValue;
    var lst;
    var listToUse = restArgumentsFlatMap(arrays);
    var searchTerm;
    if (searchTerm == null || listToUse.length === 0) {
        return [];
    }
    if (options && (options.searchProperties === true || options.searchProperties === undefined) && searchTerm.indexOf(":") > 0) {
        var results = [];
        getSearchTerms(searchTerm).forEach(function (x) {
            results = results.concat(searchForValueOnProps(listToUse, x));
        });
        return results;
    } else {
        searchValue = searchTerm;
        lst = listToUse.filter(function (x) {
            if (isExactMatch(options.getSearchTerm(x).toLowerCase(), searchValue.toLowerCase())) {
                return true;
            } else if (containsPredicate(options.getSearchTerm(x).toLowerCase(), searchValue.toLowerCase())) {
                return true;
            }
        });
        return lst;
    }

    function getSearchTerms(value) {
        var replaceColonAndSpaceRegEx = /([,|\;]\s*)|\s/g;
        var splitByText = "SPLITBYTEXT";
        var splitBySecond = ":";
        return value.replace(replaceColonAndSpaceRegEx, splitByText).split(splitByText).map(function (x) {
            var t = x.split(splitBySecond);
            return complexSearchMixin({
                property: t[0],
                search: t[1]
            });
        });
    };

    function isExactMatch(mustMatch, check) {
        return mustMatch === check;
    }

    function containsPredicate(mustMatch, check) {
        return mustMatch.indexOf(check) > -1;
    }

    function searchForValueOnProps(list, complexSearchMixin) {
        return list.filter(function (player) {
            var validProps = Object.keys(player).filter(function (x) {
                return x.toLowerCase() === complexSearchMixin.property.toLowerCase();
            });
            return validProps.some(function (validPlayerProp) {
                if (player[complexSearchMixin.property.toLowerCase()].toString().toLowerCase() === complexSearchMixin.search.toLowerCase()) {
                    return true;
                }
            });
        });
    }
};

module.exports = Searchanator;