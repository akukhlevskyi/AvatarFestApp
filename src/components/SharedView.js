// @flow
import React, { Component } from 'react';
import {
    View,
    UIManager,
    findNodeHandle,
} from 'react-native';

import { SharedItem } from './SharedItems';

class SharedView extends Component {
    _view: any;
    static contextTypes = {
        registerSharedView: React.PropTypes.func,
        unregisterSharedView: React.PropTypes.func,
    };
    static propTypes = {
      name: React.PropTypes.string.isRequired,
      containerRouteName: React.PropTypes.string.isRequired,
      itemZIndex: React.PropTypes.number.isRequired,
    };
    static defaultProps = {
      itemZIndex: 0,
    };

    render() {
        // collapsable={false} is required for UIManager.measureInWindow to get the actual measurements
        // instead of undefined, see https://github.com/facebook/react-native/issues/9382
        return (
            <View collapsable={false} style={this.props.style}
                ref={c => this._view = c}>
                {this.props.children}
            </View>
        )
    }
    componentDidMount() {
        const { registerSharedView } = this.context;
        if (!registerSharedView) return;

        const { name, containerRouteName, itemZIndex } = this.props;
        const nativeHandle = findNodeHandle(this._view);
        registerSharedView(new SharedItem(
            name,
            containerRouteName,
          //  itemZIndex,
            React.Children.only(this.props.children),
            nativeHandle,
        ));
    }

    componentWillUnmount() {
        const { unregisterSharedView } = this.context;
        if (!unregisterSharedView) return;

        const { name, containerRouteName } = this.props;
        unregisterSharedView(name, containerRouteName);
    }
}

export default SharedView;
