"use strict";

module.exports = function (listen, publish) {
    return {
        setInitialState: function setInitialState() {
            return {
                searchList: [],
                showSearch: false
            };
        },
        componentDidMount: function componentDidMount() {
            listen(this.updateSearchList);
        },
        updateSearchList: function updateSearchList(searchList) {
            if (this.isMounted()) {
                this.setState({
                    searchList: searchList || [],
                    showSearch: true
                });
            }
        },
        search: function search(value, options) {
            for (var _len = arguments.length, arrays = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                arrays[_key - 2] = arguments[_key];
            }

            if (value == null) {
                if (this.isMounted()) {
                    this.setState({
                        showSearch: false
                    });
                }
            } else {
                publish(value, options, arrays);
            }
        }
    };
};