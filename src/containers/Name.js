import React, { Component } from 'react';
import { connect } from 'react-redux';

class Name extends Component {
    render() {
        const { name } = this.props;

        if (!name) {
            return (<span>Select a name...</span>);
        }
        return (
            <span>{name.world}</span>
        );
    }
}
function mapStateToProps(state) {
    return {
        name: state.activeName
    };
}

export default connect(mapStateToProps)(Name);