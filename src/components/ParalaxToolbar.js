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
const HEADER_HEIGHT = 160;
export const NAVBAR_HEIGHT = TOOLBAR_HEIGHT + STATUSBAR_HEIGHT;

class ParalaxToolbar extends Component {

  static propTypes = {
    leftIcon: PropTypes.shape({
      icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      onPress: PropTypes.func,
    }),
    rightIcon: PropTypes.shape({
      icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      onPress:PropTypes.func,
    }),
    title: PropTypes.string,
    navbarBackgroundColor: PropTypes.string.isRequired,
    navbarBackgroundImage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    profileImage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    headerHeight: PropTypes.number,
    headerRender: PropTypes.func,
    showShadow: PropTypes.bool,
  };

  static defaultProps = {
    headerHeight: NAVBAR_HEIGHT,
    showShadow: true,
  }

  state = {
    scrollY: new Animated.Value(0),
  };

  constructor(props) {
    super(props);
    const headerAnimated = !!props.headerHeight && props.headerHeight > NAVBAR_HEIGHT
    this.state.headerHeight = headerAnimated ? props.headerHeight : NAVBAR_HEIGHT;
    this.state.headerAnimated = headerAnimated;
  }

  componentWillReceiveProps(props) {
    if (!!props.headerHeight) {
      const headerAnimated = props.headerHeight > NAVBAR_HEIGHT
      const headerHeight = headerAnimated ? props.headerHeight : NAVBAR_HEIGHT;
      this.setState({ headerAnimated, headerHeight});
    }
  }

  _provideImageOpacity = () => {
    const {headerHeight} = this.state;
    return (headerHeight - NAVBAR_HEIGHT > 0) ? this.state.scrollY.interpolate({
      inputRange: [0, headerHeight - NAVBAR_HEIGHT],
      outputRange: [1, 0],
    }) : 1;
  }

  _provideHeaderTranslate = () => {
    const {headerHeight} = this.state;
     return (headerHeight - NAVBAR_HEIGHT > 0) ? this.state.scrollY.interpolate({
       inputRange: [0, headerHeight - NAVBAR_HEIGHT, headerHeight - NAVBAR_HEIGHT + 1],
       outputRange: [0, -(headerHeight - NAVBAR_HEIGHT), -(headerHeight - NAVBAR_HEIGHT)],
     }) : 0;
  }

  _velidateImageRes = (image) => {
    if (typeof image === 	"string"){
       return { uri: image };
    }
    return image;
  }

  render() {
    const {headerHeight} = this.state;

    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.8],
    });
    const imageScale = this.state.scrollY.interpolate({
      inputRange: [-100, 0, 100],
      outputRange: [2.5, 1, 1],
      extrapolate: 'clamp',
    });

    return (
      <View style={{flex: 1}}>
        <View style={[styles.fill, { overflow: 'hidden' }]}>
          <Animated.ScrollView
            scrollEventThrottle={16}
            style={styles.fill}
            contentContainerStyle={[styles.content, {paddingTop: headerHeight,}]}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
              { useNativeDriver: true }
            )}
          >
            {this.props.children}
          </Animated.ScrollView>

          <Animated.View style={[styles.header,
            { top: -2*headerHeight,
              height: 3*headerHeight,
              paddingTop: 2*headerHeight,
              transform: [{ translateY: this._provideHeaderTranslate() }] }]} pointerEvents="none">
              <View style={[(this.props.showShadow ? styles.navbarShadow : styles.navbarNoShadow),
                          {backgroundColor: this.props.navbarBackgroundColor, }]}>
                <Animated.Image
                  style={[styles.navbarImage, {height: headerHeight,
                          opacity: this._provideImageOpacity(),
                          transform: [{ translateY: imageTranslate }, { scale: imageScale }]}]}
                  resizeMode="cover"
                  source={this._velidateImageRes(this.props.navbarBackgroundImage)}
                />
                {
                  !!this.props.headerRender
                  ? (<Animated.View style={{opacity: this._provideImageOpacity(), transform: [{ translateY: imageTranslate }, { scale: imageScale }], height: headerHeight, position: 'absolute', left:0, right:0, bottom: 0,}}>
                       { this.props.headerRender()}
                    </Animated.View>)
                  : undefined
                }
            </View>
          </Animated.View>

          {this._renderProfileImage()}
          {this._renderNavbar()}
          {this._renderStatusBar()}

        </View>
      </View>
    );
  }

  _renderStatusBar = () => {
    if (Platform.OS === 'android')
      return (<StatusBar backgroundColor="#00000066" translucent={true}/>);

    return (<StatusBar barStyle="light-content" />);
  }

  _renderNavbar = () => {
    const {headerHeight} = this.state;

    let title = (<Text style={styles.title} numberOfLines={1}>{this.props.title}</Text>);
    if ((headerHeight - 1.5*NAVBAR_HEIGHT) >= 0) {
      const titleOpacity = this.state.scrollY.interpolate({
        inputRange: [0, headerHeight - 1.5*NAVBAR_HEIGHT, headerHeight - NAVBAR_HEIGHT],
        outputRange: [0, 0, 1],
      });
      const titleTranslate = this.state.scrollY.interpolate({
        inputRange:  [-1,  headerHeight - 1.5*NAVBAR_HEIGHT, headerHeight - NAVBAR_HEIGHT],
        outputRange: [20, 20,  0,],
        extrapolate: 'clamp',
      });

      title = (
        <Animated.View
            pointerEvents="none"
            style={[styles.titleContainer, {opacity: titleOpacity, transform: [{ translateY: titleTranslate }] }]}>
          {title}
        </Animated.View>);
    } else {
      title = (<View style={styles.titleContainer}>{title}</View>);
    }
    return (
      <View style={[styles.navbar, {height: headerHeight}]}>
        <View style={styles.toolbar}>
          {this._renderNavbarIcon(this.props.leftIcon)}

          {title}

          {this._renderNavbarIcon(this.props.rightIcon)}
        </View>
      </View>
    )
  }

  _renderProfileImage = () => {
    if (!this.props.profileImage) {
      return;
    }
    const {headerHeight} = this.state;
    const profileTranslateY = this.state.scrollY.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [1, 0, -1],
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
    const profileOpacity = this.state.scrollY.interpolate({
      inputRange: [0, headerHeight - NAVBAR_HEIGHT],
      outputRange: [1, 0],
    });

    return (<Animated.View style={[
      styles.profile,
      {top: headerHeight - 46,
       opacity: profileOpacity,
       transform: [{ translateY: profileTranslateY }, { translateX: profileTranslateX }, { scale: profileScale }] }
    ]}>
      <Image
        resizeMode="cover"
        style={styles.profileImage}
        source={this._velidateImageRes(this.props.profileImage)}
      />
    </Animated.View>)
  }

  _renderNavbarIcon = (config) => {
    if (!config) {
      return (<View style={styles.navbarIconArea} />);
    }

    let view = (<View style={styles.navbarIconArea}>
          <Image
            style={styles.navbarIcon}
            source={this._velidateImageRes(config.icon)} />
        </View>);
    if (!!config.onPress) {
      view = (<Touchable onPress={config.onPress}>{view}</Touchable>);
    }
    return view;
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  header: {
    overflow: 'hidden',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  navbarImage: {
    position: 'absolute',
    left:0,
    right:0,
    bottom: 0,
    resizeMode: 'contain',
  },
  navbarShadow: {
    position: 'absolute',
    elevation: 5,
    top: 0,
    left: 0,
    right: 0,
    bottom: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 3,
      width: 0,
    },
  },
  navbarNoShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  toolbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: STATUSBAR_HEIGHT,
    height: TOOLBAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navbarBackground: {
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
    minHeight: Dimensions.get('window').height,
  },
  backButton: {
    width: 20,
    height: 20,
    marginLeft: 16,
    tintColor: 'white',
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
