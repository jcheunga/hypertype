import React, {PropTypes} from 'react';
import {
  NavigationExperimental,
  View,
  StyleSheet,
  Text
} from 'react-native';
const {
  CardStack: NavigationCardStack,
  Header: NavigationHeader,
  PropTypes: NavigationPropTypes
} = NavigationExperimental;
import AppRouter from '../AppRouter';
import TabBar from '../../components/TabBar';
import * as theme from '../../utils/theme';

import DropdownAlert from 'react-native-dropdownalert';

// Customize bottom tab bar height here if desired
const TAB_BAR_HEIGHT = 50;

const NavigationView = React.createClass({
  propTypes: {
    onNavigateBack: PropTypes.func.isRequired,
    onNavigateCompleted: PropTypes.func.isRequired,
    navigationState: PropTypes.shape({
      tabs: PropTypes.shape({
        routes: PropTypes.arrayOf(PropTypes.shape({
          key: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired
        })).isRequired
      }).isRequired,
      PlayTab: NavigationPropTypes.navigationState.isRequired,
      HighscoreTab: NavigationPropTypes.navigationState.isRequired,
      ProfileTab: NavigationPropTypes.navigationState.isRequired,
      TypeTab: NavigationPropTypes.navigationState.isRequired
    }),
    switchTab: PropTypes.func.isRequired,
    pushRoute: PropTypes.func.isRequired
  },
  // NavigationHeader accepts a prop style
  // NavigationHeader.title accepts a prop textStyle
  componentWillReceiveProps (nextProps) {
    if (nextProps.errorMessage) {
      this.dropdown.alert('custom', nextProps.errorMessage);
    }
  },
  renderHeader(sceneProps) {
    return (
      <NavigationHeader
        {...sceneProps}
        onNavigateBack={this.props.onNavigateBack}
        style={styles.navigationBar}
        renderTitleComponent={() => {
          return (
            <NavigationHeader.Title>
              <Text style={styles.title}>{sceneProps.scene.route.title}</Text>
            </NavigationHeader.Title>
          );
        }}
      />
    );
  },
  renderScene(sceneProps) {
    // render scene and apply padding to cover
    // for app bar and navigation bar
    return (
      <View style={styles.sceneContainer}>
        {AppRouter(sceneProps)}
      </View>
    );
  },
  closeAlert () {
    this.props.playStateActions.removeErrors();
  },
  render() {
    const {tabs} = this.props.navigationState;
    const tabKey = tabs.routes[tabs.index].key;
    const scenes = this.props.navigationState[tabKey];
    return (
      <View style={styles.container}>
        <NavigationCardStack
          key={'stack_' + tabKey}
          onNavigateBack={this.props.onNavigateBack}
          navigationState={scenes}
          renderHeader={this.renderHeader}
          renderScene={this.renderScene}
        />
        <TabBar
          height={TAB_BAR_HEIGHT}
          tabs={tabs}
          currentTabIndex={tabs.index}
          switchTab={this.props.switchTab}
        />
        <DropdownAlert
          ref={(ref) => this.dropdown = ref}
          containerStyle={{
            backgroundColor: '#cd853f'
          }}
          onClose={this.closeAlert}
          onCancel={this.closeAlert}
          showCancel={false}
          imageSrc={'https://facebook.github.io/react/img/logo_og.png'}
        />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sceneContainer: {
    flex: 1,
    marginBottom: TAB_BAR_HEIGHT
  },
  title: {
    color: theme.colors.text
  },
  navigationBar: {
    backgroundColor: theme.colors.navBar,
    borderBottomWidth: 0,
    height: 40
  }
});

export default NavigationView;
