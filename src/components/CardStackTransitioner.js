// @flow
import React, { Component } from 'react';

import { CardStack } from 'react-navigation';
import type { NavigationSceneRendererProps } from 'react-navigation';

class CardStackTransitioner extends Component {
    render() {
        const _configureTransition = (transitionProps, prevTransitionProps) => ({
            screenInterpolator: (sceneProps: NavigationSceneRendererProps) => {
                const { position, scene, progress } = sceneProps;
                const { index } = scene;
                const opacity = position.interpolate({
                    inputRange: [index - 1, index, index + 0.999, index + 1],
                    outputRange: [0, 1, 1, 0],
                });

                const translateX = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [250, 0, 0],
                })

                return { opacity, transform: [{ translateX }], };
            },
            duration: 5000,
        });
        return (
            <CardStack mode="card"
                navigation={this.props.navigation}
                router={this.props.router}
                transitionConfig={_configureTransition}
                headerMode="none"
                />
        )
    }
}


export default CardStackTransitioner;
