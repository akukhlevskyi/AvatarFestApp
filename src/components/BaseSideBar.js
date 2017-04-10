import React, {PropTypes, Component} from 'react';
import {
  Dimensions,
} from 'react-native';

const POS_LEFT='left';
const POS_RIGHT='right';

class BaseSideBar extends Component {
  static get POSITION_LEFT() { return POS_LEFT; };
  static get POSITION_RIGHT() { return POS_RIGHT; };

  static displayName = 'SideBar'
  static propTypes = {
    menu: PropTypes.func.isRequired,
    menuWidth: PropTypes.number.isRequired,
    menuPosition: PropTypes.oneOf([POS_LEFT, POS_RIGHT]).isRequired,
    onChange: PropTypes.func,
    isOpen: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    isOpen: false,
    menuPosition: POS_LEFT,
    menuWidth: Dimensions.get('window').width * 0.8,
  }
}

export default BaseSideBar;
