/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import ReactNative, {
  Platform,
  StyleSheet,
  Text,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import InputView from 'rn-autoheight-input';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {

  state = {
    text: ''
  }

  render() {
    let {text} = this.state;
    return (
      <KeyboardAwareScrollView 
        ref={(ref) => this.scroll = ref} 
        contentContainerStyle={styles.container}
      >
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <InputView
          blurOnSubmit={false}  
          value={text} 
          onValueChange={(text) => this.setState({text})} 
          placeholder="Add Response"
          onContentSizeChange={
            (event) => { 
              this._scrollToInput(ReactNative.findNodeHandle(event.target));
            }
          } 
        /> 
      </KeyboardAwareScrollView>
    );
  }

  _scrollToInput = (reactNode: any) => {
    let extraHeight = 30; // twice the height of <Progress/> which avoids keyboard
    this.scroll.scrollToFocusedInput(reactNode, extraHeight);
  }
}


const BACKGROUND_COLOR = "#F5FCFF";
const TEXT_COLOR = "#333333";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: TEXT_COLOR,
    marginBottom: 5,
  },
});
