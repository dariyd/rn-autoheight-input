import React, {Component} from 'react';
import { View, StyleSheet, Platform, TextInput} from 'react-native';
import PropTypes from 'prop-types';

class InputView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isIOS : Platform.OS === 'ios', value: props.value, placeholder: props.placeholder,
      textHeight: props.defaultHeight,
    };

    this.inputsRefs = null;
  }

  render() {
    let {isIOS, value, textHeight, placeholder} = this.state;
    let {inputStyle, blurOnSubmit, onContentSizeChange, onValueChange } = this.props;

    return (
      <View style={[styles.inputWrapper, this.props.viewStyle]}>
        <TextInput
          ref={(ref) => {this.inputsRefs = ref; }}
          multiline={true}
          blurOnSubmit={blurOnSubmit}
          keyboardType="default"
          returnKeyType="default"
          returnKeyLabel="Enter"
          style={[styles.input, inputStyle, { height: Math.max(40, textHeight)}]} 
          underlineColorAndroid={UNDERLINE_COLOR_ANDROID}
          placeholder={placeholder ? placeholder : 'Add Response'}
          placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
          {...this.props}
          onContentSizeChange={
            (event) => { 
              this.changeValue('textHeight', value ? event.nativeEvent.contentSize.height + 5 : textHeight);
              (isIOS && this.inputsRefs.isFocused() && onContentSizeChange) && onContentSizeChange(event);
            } 
          }
          onChangeText={
            (text) => {
              this.changeValue('value', text); 
              onValueChange(text);
            }
          }
          value={value} 
          onSubmitEditing={() => { (!isIOS && blurOnSubmit) && this.inputsRefs.blur(); }}
        />
      </View>
    );
  }

  changeValue = (property, value) => {
    this.setState({[property] : value});
  }

  onBlurInput = () => {
    this.props.onValueChange(this.state.value);
  }
}

InputView.defaultProps = {
  value: '',
  defaultHeight: 40,
  placeholder: "",
  viewStyle: {},
  inputStyle: {},
  blurOnSubmit: true,
  onValueChange: () => {},
  onContentSizeChange: () => {},
};

InputView.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  defaultHeight: PropTypes.number,
  blurOnSubmit: PropTypes.bool,
  placeholder: PropTypes.string,
  viewStyle: PropTypes.shape({}),
  inputStyle: PropTypes.shape({}),
  onValueChange: PropTypes.func,
  onContentSizeChange: PropTypes.func,
};

const BORDER_COLOR = "#488fb1";
const INPUT_COLOR = "#212226";
const UNDERLINE_COLOR_ANDROID = "#fff";
const PLACEHOLDER_TEXT_COLOR = "#909095";

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  input: {
    flex: 1,
    justifyContent: 'center',
    color: INPUT_COLOR,
    fontSize: 16,
    textAlignVertical: 'center'
  },
});

export default InputView;