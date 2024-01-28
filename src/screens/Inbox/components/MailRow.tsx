import IMAGES from '@assets/images/images';
import {scale} from '@utils/mixins';
import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {Avatar, Checkbox, Drawer, Text, View} from 'react-native-ui-lib';

const MailRow = ({isSelectMode = false, onSelectMode = () => {}}) => {
  const [selected, setSelected] = useState(false);

  return (
    <Drawer
      rightItems={[
        {
          width: scale(78),
          customElement: <IMAGES.icUnBookmark />,
          background: '#50048A',
          onPress: () => console.log('icUnBookmark pressed'),
        },
      ]}
      leftItem={{
        width: scale(78),
        customElement: <IMAGES.icMailOpen />,
        background: '#20C997',
        onPress: () => console.log('icMailOpen pressed'),
      }}>
      <Pressable
        onLongPress={() => {
          onSelectMode();
          setSelected(true);
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            columnGap: scale(12),
            paddingHorizontal: scale(20),
            paddingBottom: scale(10),
            backgroundColor: 'white',
          }}>
          {isSelectMode && (
            <View>
              <Checkbox
                color="#50048A"
                iconColor="white"
                outline
                containerStyle={{
                  width: scale(36),
                  height: scale(36),
                  backgroundColor: selected ? '#50048A' : 'white',
                }}
                borderRadius={99}
                value={selected}
                onValueChange={() => setSelected(!selected)}
              />
            </View>
          )}
          <View>
            <Avatar
              size={scale(36)}
              source={{
                uri: 'https://lh3.googleusercontent.com/-CMM0GmT5tiI/AAAAAAAAAAI/AAAAAAAAAAA/-o9gKbC6FVo/s181-c/111308920004613908895.jpg',
              }}
            />
          </View>
          <View style={{flex: 1}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flex: 1}}>
                <Text style={{fontSize: scale(16)}}>Amazon Prime</Text>
              </View>
              <Text>3:00 PM 14 Apr 2023</Text>
            </View>
            <View style={{height: scale(5)}} />
            <View style={{flex: 1}}>
              <Text style={{fontSize: scale(14)}} numberOfLines={1}>
                Now streaming on Prime Video ,Now streaming on Prime Video
              </Text>
              <View style={{height: scale(2)}} />
              <Text style={{fontSize: scale(12)}} numberOfLines={1}>
                Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit
                amet, consectetur
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Drawer>
  );
};

export default React.memo(MailRow);
