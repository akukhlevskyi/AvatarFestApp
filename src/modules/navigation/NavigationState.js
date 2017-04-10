import {fromJS} from 'immutable';
import {NavigationExperimental} from 'react-native';
import {isNumber} from 'lodash';

const {StateUtils: NavigationStateUtils} = NavigationExperimental;

// Actions
const TOGGLE_MENU = 'NavigationState/TOGGLE_MENU';
const OPEN_MENU = 'NavigationState/OPEN_MENU';
const PUSH_ROUTE = 'NavigationState/PUSH_ROUTE';
const POP_ROUTE = 'NavigationState/POP_ROUTE';
const SWITCH_SCENE = 'NavigationState/SWITCH_SCENE';

const SCENES = 'scenes';
const MENU = 'menu';

export function switchScene(key) {
  return {
    type: SWITCH_SCENE,
    payload: key,
  };
}

export function showBackButton(navigationState) {
  const items = navigationState.get(MENU);
  const sceneKey = items.getIn(['routes', items.get('index')]).get('key');
  const currentScene = navigationState.getIn(['scenes', sceneKey]);

  // if we are in the beginning of our tab stack
  return (currentScene.get('index') !== 0);
}

// Action creators
export function toggleMenu() {
  return {
    type: TOGGLE_MENU,
  };
}

export function openMenu(isOpen) {
  return {
    type: OPEN_MENU,
    payload: isOpen,
  };
}

export function pushRoute(route) {
  return {
    type: PUSH_ROUTE,
    payload: route,
  };
}

export function popRoute() {
  return {type: POP_ROUTE};
}

// reducers for menu and scenes are separate
const initialState = fromJS({
  // SideBar menu items
  menu: {
    opened: false,
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
        icon: 'ic_action_jedi',
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
      opened: false,
      index: 0,
      routes: [{
        key: 'News',
        title: 'News',
        headerHeight: 240,
        videoInHeader: true,
      }]
    },
    LineUpScene: {
      index: 0,
      routes: [{key: 'LineUp', title: 'LineUp'}]
    },
    MastersScene: {
      index: 0,
      routes: [{key: 'Masters', title: 'Masters'}]
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
      //Push a route into the scenes stack.
      const route = action.payload;
      const items = state.get(MENU);
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
      const items = state.get(MENU);
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
      const items = state.get(MENU).toJS();

      let nextScene;
      try {
        nextScene = isNumber(action.payload)
          ? NavigationStateUtils.jumpToIndex(items, action.payload)
          : NavigationStateUtils.jumpTo(items, action.payload);

          return state.set(MENU, fromJS(nextScene));
      } catch (e) {
        return state;
      }
    }
    case TOGGLE_MENU: {
      const oldValue = state.getIn([MENU, "opened"]);
      const newValue = !oldValue;

      return state.setIn([MENU, "opened"], newValue);
    }
    case OPEN_MENU: {
      const oldValue = state.getIn([MENU, "opened"]);
      const newValue = action.payload;
      if (oldValue !== newValue) {
        return state.setIn([MENU, "opened"], newValue);
      }
      return state;
    }
    default:
      return state;
  }
}
