function flatMap(arrofArrays) {
    return [].concat.apply([], arrofArrays);
};

function restArgumentsFlatMap(arr) {
    debugger;
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? restArgumentsFlatMap(toFlatten) : toFlatten);
      }, [])
};

function complexSearchMixin(obj) {
    var o = {};
    o.search = obj.search || "";
    o.property = obj.property || "";
    return o;
};
var Searchanator = function(searchTerm, options, ...arrays) {
    var searchValue;
    var lst
    var listToUse = restArgumentsFlatMap(arrays);
    var searchTerm;
    if (searchTerm == null || listToUse.length === 0) {
        return [];
    }
    if (options && (options.searchProperties === true || options.searchProperties === undefined) && (searchTerm.toString()).indexOf(":") > 0) {
        var results = [];
        getSearchTerms(searchTerm)
            .forEach(x => {
                results = results.concat(searchForValueOnProps(listToUse, x));
            });
        return results;
    } else {
        searchValue = searchTerm;
        lst = listToUse.filter(x => {
            if (isExactMatch((options.getSearchTerm(x)).toString()
                    .toLowerCase(), searchValue.toString().toLowerCase())) {
                return true;
            } else if (containsPredicate(options.getSearchTerm(x)
                                .toString().toLowerCase(), searchValue.toString().toLowerCase())) {
                return true;
            }
        });
        return lst;
    }

    function getSearchTerms(value) {
        var replaceColonAndSpaceRegEx = /([,|\;]\s*)|\s/g;
        var splitByText = "SPLITBYTEXT";
        var splitBySecond = ":";
        return value.replace(replaceColonAndSpaceRegEx, splitByText)
            .split(splitByText)
            .map(x => {
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
        return list.filter((player) => {
            var validProps = Object.keys(player)
                .filter(x => {
                    return x.toLowerCase() === complexSearchMixin.property.toLowerCase();
                });
            return validProps.some(validPlayerProp => {
                if (player[complexSearchMixin.property.toLowerCase()].toString()
                    .toLowerCase() === complexSearchMixin.search.toLowerCase()) {
                    return true;
                }
            });

        });
    }

}


module.exports = Searchanator;