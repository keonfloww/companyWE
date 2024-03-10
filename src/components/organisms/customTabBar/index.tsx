import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import IMAGES from '@assets/images/images';
import {SCREEN_WIDTH} from 'src/themes/mixins';
import Icon from '@components/atoms/Icon/Icon';
import styles from './styles';
import {colors} from 'src/themes';

interface CustomTabBarProps {
  navigationState: any;
  position: any;
  onIndexChange: (index: number) => void; // Thêm prop onIndexChange
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({
  navigationState,
  onIndexChange,
}) => {
  const handleTabPress = (index: number) => {
    onIndexChange(index);
  };

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      {navigationState.routes.map((route: any, index: number) => {
        const isFocused = index === navigationState.index;

        return (
          <TouchableOpacity key={index} onPress={() => handleTabPress(index)}>
            <View
              style={[
                styles.optionsContainer,
                {
                  backgroundColor: isFocused
                    ? colors.appColor
                    : colors.backgroundBorder,
                },
              ]}>
              <Icon
                source={route.image}
                color={isFocused ? colors.white : colors.textAppColor}
              />
              <Text
                style={{
                  color: isFocused ? colors.white : colors.textAppColor,
                  marginLeft: 4,
                }}>
                {route.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
