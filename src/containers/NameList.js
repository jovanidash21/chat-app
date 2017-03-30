import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectName } from '../actions/index'

class NameList extends Component {
    render() {
        const {
            names,
            selectName
        } = this.props;

        return (
            <div>
                {
                    names.map(name =>
                        <h3
                            key={name.id}
                            onClick={() => selectName(name)}
                        >
                            &#45;
                            &nbsp;
                            <a>
                                {name.world}
                            </a>
                        </h3>
                    )
                }

            </div>
        );
    }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({selectName: selectName}, dispatch);
}
function mapStateToProps(state) {
    return {
        names: state.names
    };
}

export default connect(
    mapStateToProps,
    matchDispatchToProps
)(NameList);