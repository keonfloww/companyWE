import React, {useState} from 'react';
import {
  KeyboardTypeOptions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import Icon from '@components/atoms/Icon/Icon';
interface TextInputRightTextProps {
  placeholder: string;
  onChangeText?: (text: string) => void;
  value: any;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  styleProps?: any;
  placeholderTextColor?: string;
  multiline?: boolean;
  numberOfLines?: number;
  textAlignVertical?: any;
  maxLength?: any;
  editable?: boolean;
  onPressIn?: () => void;
  textInputRef?: any;
  textRight?: any;
  title?: string;
}

const TextInputRightTextComponent: React.FC<TextInputRightTextProps> = ({
  placeholder,
  onChangeText,
  value,
  keyboardType = 'default',
  secureTextEntry = false,
  styleProps,
  placeholderTextColor = '#4C4C4C',
  multiline = false,
  numberOfLines = 1,
  textAlignVertical = 'top',
  maxLength,
  editable = true,
  onPressIn,
  textInputRef,
  textRight,
  title,
}) => {
  const [hidePassword, setHidePassword] = useState(secureTextEntry);

  const actionPassword = () => {
    setHidePassword(!hidePassword);
  };

  // const secureIcon = hidePassword
  //   ? images.icHidePassword
  //   : images.icHidePassword;

  return (
    <View>
      {title && <Text style={styles.labelText}>{title}</Text>}

      <View style={styles.input}>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={styles.inputView}
            maxLength={maxLength}
            textAlignVertical={textAlignVertical}
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
            ref={textInputRef}
            multiline={multiline}
            keyboardType={keyboardType}
            secureTextEntry={hidePassword}
            placeholderTextColor={'#9E9E9E'}
            numberOfLines={numberOfLines}
            editable={editable}
            onPressIn={onPressIn}
          />
          {textRight && <Text style={styles.textRight}>{textRight}</Text>}
        </View>

        {/* {secureTextEntry && (
        <TouchableOpacity onPress={actionPassword}>
          <Icon source={secureIcon} style={styles.iconShowHide} />
        </TouchableOpacity>
      )} */}
      </View>
    </View>
  );
};

export default TextInputRightTextComponent;
