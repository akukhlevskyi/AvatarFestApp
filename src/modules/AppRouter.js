/*eslint-disable react/prop-types*/

import React from 'react';
import CounterViewContainer from './counter/CounterViewContainer';
import ColorViewContainer from './colors/ColorViewContainer';
import MastersViewContainer from './masters/MastersViewContainer';
import NewsViewContainer from './news/NewsViewContainer';
import SimpleContent from '../components/SimpleContent';

/**
 * AppRouter is responsible for mapping a navigator scene to a view
 */
export default function AppRouter(props) {
  console.log("AppRouter " + JSON.stringify(props, null, 2));

  const {key} = props.scene.route;
  switch (key) {
    case 'News':
    return (<NewsViewContainer />);
    case 'Masters':
    return (<MastersViewContainer />)

    case 'Master':
    case 'Article':
    return (<SimpleContent data={props.scene.route.data} />)

    case 'Color':
    default:
  //  if (key.indexOf('Color') === 0) {
      const index = props.scenes.indexOf(props.scene);
      return (
        <ColorViewContainer
          index={index}
        />
      );
//    }
  }
  // console.warn('Unknown navigation key: ' + key);
  throw new Error('Unknown navigation key: ' + key);
}
