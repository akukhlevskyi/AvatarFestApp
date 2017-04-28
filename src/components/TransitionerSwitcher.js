import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';

import { CardStack } from 'react-navigation';
import SharedElementTransitioner from './SharedElementTransitioner';
import CrossFadeTransitioner from './CrossFadeTransitioner';
import AndroidDefaultTransitioner from './AndroidDefaultTransitioner';
import CardStackTransitioner from './CardStackTransitioner';

type TransitionName = 'cardStack' | 'materialSharedElement' | 'crossFade' | 'androidDefault';

class TransitionerSwitcher extends Component {
    state: {
        transition: TransitionName,
        //duration: number,
    }
    constructor(props) {
        super(props);
        this.state = {
            transition: 'materialSharedElement',
        };
    }
    render() {
        const transitionMap = {
            cardStack: CardStackTransitioner,
            materialSharedElement: SharedElementTransitioner,
            crossFade: CrossFadeTransitioner,
            androidDefault: AndroidDefaultTransitioner,
        }
        const Transitioner = transitionMap[this.state.transition];
        return (
            <Transitioner {...this.props} />
        );
    }

    // For simplicity, we use context to pass these functions to PhotoGridScreen and SettingsScreen
    // In real apps, we can use Redux to manage the state.
    static childContextTypes = {
        setActiveTransition: React.PropTypes.func,
        getActiveTransition: React.PropTypes.func,
    }
    getChildContext() {
        const self = this;
        return {
            setActiveTransition(transition:TransitionName) {
                self.setState({ transition });
            },
            getActiveTransition():TransitionName {
                return self.state.transition;
            }
        }
    }
}

export default TransitionerSwitcher;
