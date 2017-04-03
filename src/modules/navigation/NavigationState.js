import {fromJS} from 'immutable';
import {NavigationExperimental} from 'react-native';
import {isNumber} from 'lodash';

const {StateUtils: NavigationStateUtils} = NavigationExperimental;

// Actions
const PUSH_ROUTE = 'NavigationState/PUSH_ROUTE';
const POP_ROUTE = 'NavigationState/POP_ROUTE';
const SWITCH_SCENE = 'NavigationState/SWITCH_SCENE';

const SCENES = 'scenes';
const MENU_ITEMS = 'menuItems';

export function switchScene(key) {
  return {
    type: SWITCH_SCENE,
    payload: key,
  };
}

export function showBackButton(navigationState) {
  const items = navigationState.get('menuItems');
  const sceneKey = items.getIn(['routes', items.get('index')]).get('key');
  const currentScene = navigationState.getIn(['scenes', sceneKey]);

  // if we are in the beginning of our tab stack
  return (currentScene.get('index') !== 0);
}

// Action creators
export function pushRoute(route) {
  return {
    type: PUSH_ROUTE,
    payload: route,
  };
}

export function popRoute() {
  return {type: POP_ROUTE};
}

// reducers for MENU_ITEMS and MENU_ITEMS are separate
const initialState = fromJS({
  // SideBar menu items
  menuItems: {
    index: 0,
    routes: [
      {
        key: 'NewsScene',
        title: 'News',
        icon: 'ic_action_news'
      },
      {
        key: 'LineUpScene',
        title: 'Line Up',
        icon: 'ic_action_lineup',
      },
      {
        key: 'MastersScene',
        title: 'Masters',
        icon: 'ic_action_lineup',
      },
      {
        key: 'AboutScene',
        title: 'About',
        icon: 'ic_action_location',
      },
    ],
  },
  // MENU_ITEMS:
  scenes: {
    NewsScene: {
      index: 0,
      routes: [{key: 'Counter', title: 'News'}]
    },
    LineUpScene: {
      index: 0,
      routes: [{key: 'Color', title: 'LineUp'}]
    },
    MastersScene: {
      index: 0,
      routes: [{key: 'Masters', title: 'Masters'}]
    },
    MasterScene: {
      index: 1,
      routes: [{key: 'Master', title: 'Master'}]
    },
    AboutScene: {
      index: 0,
      routes: [{key: 'Color', title: 'About'}]
    },
  },
});

export default function NavigationReducer(state = initialState, action) {
  switch (action.type) {
    case PUSH_ROUTE: {
      console.log("PUSH_ROUTE state " + JSON.stringify(state, null, 2));
      //Push a route into the scenes stack.
      const route = action.payload;
      const items = state.get(MENU_ITEMS);
      const sceneKey = items.getIn(['routes', items.get('index')]).get('key');
      const scene = state.getIn([SCENES, sceneKey]).toJS();
      let nextScene;
      // fixes issue #52
      // the try/catch block prevents throwing an error when the route's key pushed
      // was already present. This happens when the same route is pushed more than once.
      try {
        nextScene = NavigationStateUtils.push(scene, route);
        return state.setIn([SCENES, sceneKey], fromJS(nextScene));
      } catch (e) {
        return state;
      }
    }
    case POP_ROUTE: {
      // Pops a route from the MENU_ITEMS stack.
      const items = state.get(MENU_ITEMS);
      const sceneKey = items.getIn(['routes', items.get('index')]).get('key');
      const scene = state.getIn([SCENES, sceneKey]).toJS();
      const nextScene = NavigationStateUtils.pop(scene);
      if (scene !== nextScene) {
        return state.setIn([SCENES, sceneKey], fromJS(nextScene));
      }
      return state;
    }
    case SWITCH_SCENE: {
      // Switches the tab.
      const items = state.get(MENU_ITEMS).toJS();
      console.log("SWITCH_SCENE items " + JSON.stringify(items, null, 2));
      console.log("SWITCH_SCENE action.payload " + action.payload);

      let nextScene;
      try {
        nextScene = isNumber(action.payload)
          ? NavigationStateUtils.jumpToIndex(items, action.payload)
          : NavigationStateUtils.jumpTo(items, action.payload);

          console.log("SWITCH_SCENE nextScene " + JSON.stringify(nextScene, null, 2));
          return state.set(MENU_ITEMS, fromJS(nextScene));
      } catch (e) {
        console.log("SWITCH_SCENE error " + JSON.stringify(e, null, 2));
        return state;
      }
    }

    default:
      return state;
  }
}
