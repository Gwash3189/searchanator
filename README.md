# Searchanator
Search for somthing within multiple arrays.

# Problem it solves
There have been many a time where i have one, or multiple, arrays where i want to only show the objects that meet some sort of criteria. 

# Usage

```
searchanator.search(searchTerm: string, options: object, ...searchableArrays);

```

## Searchanator.search
### Search Term
A string with the value you are searching for

## Options
An object that defines the default property to search by, and whether or not you want to search by property

```
{
	getSearchTerm: function(modelBeingSearch){
		return modelBeingSearch.propertyIWantToSearchOn
	},
	searchProperties: true // Defaults to true
	// allows you to search via property ("age: 15, name: 'Joe'")
}
```

## searchableArrays
The arrays you want to search

#Example

```
var searchanatorOptions = function(modelBeingSearch){
	return x.name;
};
var searchanator = require("searchanator");

var result = searchanator.search("hello", searchanatorOptions, [{name: "hello"}, {name: "bye"}]);

console.log(result) // [{name: "hello"}];

```



#Object Property Search

In addition to the usage above, you can also search via object properties. 

```
var searchanatorOptions = {
	getSearchTerm: function(x){
		return x.name;
	},
	searchProperties: true // defaults to true
};
var searchanator = require("searchanator");

var result = searchanator.search("name:hello", searchanatorOptions, [{name: "hello"}, {name: "bye"}]);

console.log(result) // [{name: "hello"}];

```

#Chaining searches

You can also chain the property searches 

```

var searchanatorOptions = function(modelBeingSearch){
	return x.name;
};
var searchanator = require("searchanator");

var result = searchanator.search("name:hello, age: 15", searchanatorOptions, [{name: "hello", age: 15}, {name: "bye", age: 47}]);

console.log(result) // [{name: "hello", age: 15}];

```

# React Mixin

Searchanator also comes with a react.js mixin

## Usage

```
searchanator.mixin(listener: function, publisher: function): object;
```


## Explanation

the mixin function accepts a listener function, and a publisher function. This is specifically so that the mixin is Flux implementation agnostic.

### Listner 
This parameter is a function and is passed a function. So if you were using Reflux, then you could do the following 


```
var Store = Reflux.createStore({...})
searchable.mixin(Store.listen,...)

```

### Publish
Just like the listener, this parameter is also a function, and is passed the result of the `.search` function. If you were using Reflux, you could do the following.

```
var Action = Reflux.createActions(["search"]);

searchable.mixin(..., Action.search)

```

### Putting it all together

```
var Action = Reflux.createActions(["search"]);

var Store = Reflux.createStore({...})

searchable.mixin(Store.listen Action.search)

```