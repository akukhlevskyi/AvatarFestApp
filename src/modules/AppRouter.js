/*eslint-disable react/prop-types*/

import React from 'react';
import CounterViewContainer from './counter/CounterViewContainer';
import ColorViewContainer from './colors/ColorViewContainer';
import MastersViewContainer from './masters/MastersViewContainer';
import NewsViewContainer from './news/NewsViewContainer';
import SimpleContentContainer from './content/SimpleContentContainer';
import LineUpViewContainer from './lineup/LineUpViewContainer';

/**
 * AppRouter is responsible for mapping a navigator scene to a view
 */
export default function AppRouter(props) {
  //console.warn("AppRouter " + JSON.stringify(props.scene.route, null, 2));

  const {key} = props.scene.route;
  switch (key) {
    case 'News':
    return (<NewsViewContainer {...props.scene.route} />);
    case 'Masters':
    return (<MastersViewContainer {...props.scene.route} />);
    case 'LineUp':
    return (<LineUpViewContainer {...props.scene.route} />);
    case 'Master':
    case 'Article':
    return (<SimpleContentContainer {...props.scene.route} />);
    case 'Color':
    default:
      const index = props.scenes.indexOf(props.scene);
      return (
        <ColorViewContainer
          index={index}
        />
      );
  }
  // console.warn('Unknown navigation key: ' + key);
  throw new Error('Unknown navigation key: ' + key);
}
