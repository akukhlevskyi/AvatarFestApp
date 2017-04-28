import React, {Component} from 'react';
import {
  Platform,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import {
  createNavigationContainer,
  createNavigator,
  TabNavigator,
  StackNavigator,
  DrawerNavigator,
  DrawerView,
  StackRouter,
} from 'react-navigation';

import AboutViewContainer from '../about/AboutViewContainer';
import MastersViewContainer from '../masters/MastersViewContainer';
import NewsViewContainer from '../news/NewsViewContainer';
import SimpleContentViewContainer from '../content/SimpleContentViewContainer';
import LineUpViewContainer from '../lineup/LineUpViewContainer';

import TransitionerSwitcher from '../../components/TransitionerSwitcher';
import DrawerDecorator from '../../components/DrawerDecorator';

const MastersRouter = StackRouter({
  MastersListScene: {
    path: '/masters',
    screen: MastersViewContainer,
  },
  MasterDetailsScene: {
    path: 'masters/:title',
    screen: SimpleContentViewContainer,
  }
});
const MastersSceneNavigator = createNavigationContainer(createNavigator(MastersRouter)(TransitionerSwitcher));

const NewsRouter = StackRouter({
  NewsListScene: {
    path: '/news',
    screen: NewsViewContainer,
  },
  NewsDetailsScene: {
    path: 'news/:title',
    screen: SimpleContentViewContainer,
  }
});
const NewsSceneNavigator = createNavigationContainer(createNavigator(NewsRouter)(TransitionerSwitcher));

const AppNavigator = DrawerNavigator({
  NewsScene: {
    screen: NewsSceneNavigator,
    navigationOptions: {
      drawer: () => ({
        label: 'News',
      }),
    },
  },
  LineUpScene: {
    screen: LineUpViewContainer,
    navigationOptions: {
      drawer: () => ({
        label: 'Line Up',
      }),
    },
  },
  MastersScene: {
    screen: MastersSceneNavigator,
    navigationOptions: {
      drawer: () => ({
        label: 'Masters',
      }),
    },
  },
  AboutScene: {
    screen: AboutViewContainer,
    navigationOptions: {
      drawer: () => ({
        label: 'About',
      }),
    },
  },
}, {
  initialRouteName: 'NewsScene',
  contentOptions: {
    activeTintColor: '#e91e63',
  },
  contentComponent: props => (
    <DrawerDecorator>
      <DrawerView.Items {...props} />
    </DrawerDecorator>
  )
});

export default AppNavigator;
