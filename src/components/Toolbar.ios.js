import React, {PropTypes, Component} from 'react';
import {
   NavigationExperimental,
   Text,
   Image,
   View,
 } from 'react-native';

const {
  Header: NavigationHeader,
} = NavigationExperimental;

class Toolbar extends Component {
  static displayName = 'Toolbar';

  static propTypes = {
    navIcon: React.PropTypes.object,
    onIconClicked: React.PropTypes.func,
    title: React.PropTypes.string,
  };

  render() {
    return (
      <NavigationHeader
        {...this.props.sceneProps}
        onNavigateBack={this.props.onNavigateBack}
        renderTitleComponent={() => {
          return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Image title={this.props.navIcon} onPress={this.props.onIconClicked}/>
              <NavigationHeader.Title>
                {this.props.title}
              </NavigationHeader.Title>

            </View>
          );
        }}
        />
    );
  }
}

export default Toolbar;
