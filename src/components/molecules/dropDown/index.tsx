// Project: 683e4c13beb883f0af73f124470835537f7011c7c4368b76c753dbf620b4c90f

import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './styles';

interface DropDownProps {
  open: boolean;
  value: string;
  items: any[];
  onOpen: () => void;
  onValueChange: (value: any) => void;
  setItems: (items: any) => void;
  placeholder: string;
  style?: any;
  placeholderStyle?: any;
  dropDownContainerStyle?: any;
}

const DropDownApp: React.FC<DropDownProps> = ({
  open,
  value,
  items,
  onOpen,
  onValueChange,
  setItems,
  placeholder,
  style,
  placeholderStyle,
  dropDownContainerStyle,
}) => {
  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={onOpen}
      setValue={onValueChange}
      setItems={setItems}
      placeholder={placeholder}
      style={style ?? styles.dropDownPicker}
      placeholderStyle={placeholderStyle ?? styles.placeholderStyle}
      dropDownContainerStyle={
        dropDownContainerStyle ?? styles.dropDownContainerStyle
      }
    />
  );
};

export default DropDownApp;
