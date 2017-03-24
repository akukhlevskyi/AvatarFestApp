import React, {PropTypes, Component} from 'react';

const POS_LEFT='left';
const POS_RIGHT='right';

class BaseSideBar extends Component {
  static get POSITION_LEFT() { return POS_LEFT; };
  static get POSITION_RIGHT() { return POS_RIGHT; };

  static displayName = 'SideBar'
  static propTypes = {
    menu: PropTypes.func,
    menuWidth: PropTypes.number,
    menuPosition: PropTypes.oneOf([POS_LEFT, POS_RIGHT]),
    onChange: PropTypes.func,
  }
}

export default BaseSideBar;
