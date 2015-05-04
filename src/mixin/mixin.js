module.exports = function(listen, publish) {
    return {
        setInitialState: function() {
            return {
                searchList: [],
                showSearch: false
            }
        },
        componentDidMount: function() {
            listen(this.updateSearchList);
        },
        updateSearchList: function(searchList) {
            if (this.isMounted()) {
                this.setState({
                    searchList: searchList || [],
                    showSearch: true
                });
            }
        },
        search: function(value, options, ...arrays) {
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
}