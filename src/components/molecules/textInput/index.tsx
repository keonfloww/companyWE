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
import IMAGES from '@assets/images/images';
interface TextInputProps {
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
  iconLeft?: any;
  title?: string;
  styleInputProps?: any;
}

const TextInputComponent: React.FC<TextInputProps> = ({
  placeholder,
  onChangeText,
  value,
  keyboardType = 'default',
  secureTextEntry = false,
  styleProps,
  styleInputProps,
  placeholderTextColor = '#4C4C4C',
  multiline = false,
  numberOfLines = 1,
  textAlignVertical = 'top',
  maxLength,
  editable = true,
  onPressIn,
  textInputRef,
  iconLeft,
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
    <View style={styleProps}>
      {title && <Text style={styles.labelText}>{title}</Text>}

      <View style={[styles.input, styleInputProps]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {iconLeft && (
            <TouchableOpacity onPress={actionPassword}>
              <Icon source={iconLeft} style={styles.iconLeft} />
            </TouchableOpacity>
          )}
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
        </View>

        {secureTextEntry && (
          <TouchableOpacity onPress={actionPassword}>
            {hidePassword ? (
              <Icon source={IMAGES.icUnsecure} style={styles.iconShowHide} />
            ) : (
              <Icon source={IMAGES.icSecure} style={styles.iconShowHide} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TextInputComponent;
