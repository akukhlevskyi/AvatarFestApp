import React, {Component, PropTypes} from 'react';

import {
  Animated,
  StyleSheet,
  Platform,
  StatusBar,
  Text,
  Dimensions,
  View,
  Image,
} from 'react-native';

import Touchable from './Touchable';

const PROFILE_WIDTH = 90;
const PROFILE_RADIUS = PROFILE_WIDTH / 2;

const STATUSBAR_HEIGHT = (Platform.OS === 'android' ? (Platform.Version >= 21 ? 24 : 0)  : 26)
const TOOLBAR_HEIGHT = 56;

const NAVBAR_HEIGHT = TOOLBAR_HEIGHT + STATUSBAR_HEIGHT;
const HEADER_HEIGHT = 160;


class ParalaxToolbar extends Component {

  static propTypes = {
    leftIcon: PropTypes.shape({
      icon: PropTypes.string.isRequired,
      onPress: PropTypes.func,
    }),
    rightIcon: PropTypes.shape({
      icon: PropTypes.string.isRequired,
      onPress:PropTypes.func,
    }),
    title: PropTypes.string,
    navbarBackgroundColor: PropTypes.string.isRequired,
    navbarBackgroundImage: PropTypes.string,
    profileImage: PropTypes.string,
    headerHeight: PropTypes.number,
  };

  state = {
    scrollY: new Animated.Value(0),
  };

  render() {
    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT - NAVBAR_HEIGHT],
      outputRange: [1, 0],
    });
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, 200],
      outputRange: [0, 100],
    });
    const imageScale = this.state.scrollY.interpolate({
      inputRange: [-100, 0, 100],
      outputRange: [2.5, 1, 1],
      extrapolate: 'clamp',
    });
    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, 200],
      outputRange: [-1, -200],
    });

    return (
      <View style={{flex: 1}}>
        <View style={[styles.fill, { overflow: 'hidden' }]}>
          <Animated.ScrollView
            scrollEventThrottle={16}
            style={styles.fill}
            contentContainerStyle={styles.content}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
              { useNativeDriver: true }
            )}
          >
            {this.props.children}
          </Animated.ScrollView>

          <Animated.View style={[styles.header, {  backgroundColor: this.props.navbarBackgroundColor, transform: [{ translateY: headerTranslate }] }]} pointerEvents="none">
            <Animated.Image
              style={[styles.image, { opacity: imageOpacity, transform: [{ translateY: imageTranslate }, { scale: imageScale } ] }]}
              resizeMode="cover"
              source={{ uri: this.props.navbarBackgroundImage }}
            />
          </Animated.View>

          {this.renderProfileImage()}
          {this.renderNavbar()}
          {this.renderStatusBar()}

        </View>
      </View>
    );
  }

  renderStatusBar = () => {
    if (Platform.OS === 'android')
      return (<StatusBar backgroundColor="#00000066" translucent={true}/>);

    return (<StatusBar barStyle="light-content" />);
  }

  renderNavbar = () => {
    const navBarBackgroundOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT - NAVBAR_HEIGHT - 1, HEADER_HEIGHT - NAVBAR_HEIGHT],
      outputRange: [0, 0, 1],
    });

    const titleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, 220, 250],
      outputRange: [0, 0, 1],
    });
    const titleTranslate = this.state.scrollY.interpolate({
      inputRange:  [-1,  0, 220, 250, 251],
      outputRange: [20, 20,  20,   0,   0],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.navbar}>
        <Animated.View style={[styles.navbarBackground, { backgroundColor: this.props.navbarBackgroundColor, opacity: navBarBackgroundOpacity }]} />

        <View style={[StyleSheet.absoluteFill, {marginTop: STATUSBAR_HEIGHT, flexDirection: 'row', alignItems: 'center'}]}>
          {this.renderNavbarIcon(this.props.leftIcon)}

          <Animated.View pointerEvents="none" style={[styles.titleContainer, {opacity: titleOpacity, transform: [{ translateY: titleTranslate }] }]}>
            <Text style={styles.title}>
              {this.props.title}
            </Text>
          </Animated.View>

          {this.renderNavbarIcon(this.props.rightIcon)}
        </View>
      </View>
    )
  }

  renderProfileImage = () => {
    if (this.props.profileImage === undefined) {
      return undefined;
    }

    const profileTranslateY = this.state.scrollY.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [1, 0, -0.8],
    });
    const profileTranslateX = this.state.scrollY.interpolate({
      inputRange: [-1, 0, 150, 151],
      outputRange: [0, 0, -PROFILE_WIDTH/8, -PROFILE_WIDTH/8],
    });
    const profileScale = this.state.scrollY.interpolate({
      inputRange: [-1, 0, 150, 151],
      outputRange: [1, 1, 0.6, 0.6],
      extrapolate: 'clamp',
    });

    return (<Animated.View style={[
      styles.profile,
      { transform: [{ translateY: profileTranslateY }, { translateX: profileTranslateX }, { scale: profileScale }] }
    ]}>
      <Image
        resizeMode="cover"
        style={styles.profileImage}
        source={{uri: this.props.profileImage}}
      />
    </Animated.View>)
  }

  renderNavbarIcon = (config) => {
    if (config === undefined) {
      return (<View style={styles.navbarIconArea} />);
    }

    let view = (<View style={styles.navbarIconArea}>
          <Image
            style={styles.navbarIcon}
            source={{uri: config.icon}} />
        </View>);
    if (config.onPress !== undefined) {
      view = (<Touchable onPress={config.onPress}>{view}</Touchable>);
    }
    return view;
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  image: {
    height: HEADER_HEIGHT,
  },
  header: {
    overflow: 'hidden',
    position: 'absolute',
    top: -HEADER_HEIGHT - HEADER_HEIGHT,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT + HEADER_HEIGHT + HEADER_HEIGHT,
    paddingTop: HEADER_HEIGHT + HEADER_HEIGHT,
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: NAVBAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navbarBackground: {
    backgroundColor: '#008ca6',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  profile: {
    width: PROFILE_WIDTH+4,
    height: PROFILE_WIDTH+4,
    backgroundColor: 'white',
    borderRadius: (PROFILE_WIDTH + 4)/2,
    position: 'absolute',
    top: HEADER_HEIGHT - 48,
    left: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: PROFILE_WIDTH,
    height: PROFILE_WIDTH,
    borderRadius: PROFILE_RADIUS,
  },
  content: {
    backgroundColor: 'transparent',
    paddingTop: HEADER_HEIGHT,
    minHeight: Dimensions.get('window').height,
  },
  name: {
    backgroundColor: 'transparent',
    marginTop: 60,
    marginBottom: 16,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    backgroundColor: 'transparent',
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
    textAlign: 'justify',
    fontWeight: 'normal',
  },
  backButton: {
    width: 20,
    height: 20,
    marginLeft: 16,
    tintColor: 'white',
  },
  rightButton: {
    width: 20,
    height: 20,
    marginRight: 16,
  },

  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: Platform.OS === 'android' ? 'flex-start' : 'center',
  },
  title: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  navbarIconArea: {
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: TOOLBAR_HEIGHT - 16,
    height: TOOLBAR_HEIGHT - 16,
  },
  navbarIcon: {
    width: TOOLBAR_HEIGHT/2,
    height: TOOLBAR_HEIGHT/2,
    tintColor: 'white',
  },
});

export default ParalaxToolbar;
