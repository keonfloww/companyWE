import IMAGES from '@assets/images/images';
import {Email} from '@models/mail/modelMail';
import CommonStyles from '@screens/styles';
import DateUtils from '@utils/dateUtils';
import {scale} from '@utils/mixins';
import {safeString} from '@utils/stringUtils';
import React, {FC, useMemo, useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Avatar, Checkbox, Drawer, Text, View} from 'react-native-ui-lib';
import useMailItem from '../hooks/useMailItem';

interface Props {
  item: Email;
  isSelectMode?: boolean;
  onSelect: (_: string) => void;
  onSelectMode: () => void;
  onCancelSelectMode: () => void;
}
const MailRow: FC<Props> = ({
  item,
  isSelectMode = false,
  onSelect = (_: string) => {},
  onSelectMode = () => {},
  onCancelSelectMode = () => {},
}) => {
  const {
    isRead,
    handleMarkAsRead,

    isBookMark,
    handleMarkBookMark,
  } = useMailItem({item});
  const [selected, setSelected] = useState(false);

  const computedDisableStyle = useMemo(() => {
    return isRead ? styles.textDisable : {};
  }, [isRead]);

  return (
    <Drawer
      onDragStart={onCancelSelectMode}
      rightItems={[
        {
          width: scale(78),
          customElement: <IMAGES.icUnBookmark />,
          background: '#50048A',
          onPress: handleMarkBookMark,
        },
      ]}
      leftItem={{
        width: scale(78),
        customElement: <IMAGES.icMailOpen />,
        background: '#20C997',
        onPress: () => console.log('icMailOpen pressed'),
      }}>
      <Pressable
        onPress={handleMarkAsRead}
        onLongPress={() => {
          onSelectMode();
          setSelected(true);
          onSelect(item?.metadata_id);
        }}>
        <View style={styles.container}>
          {isSelectMode ? (
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
                onValueChange={() => {
                  setSelected(!selected);
                  onSelect(item?.metadata_id);
                }}
              />
            </View>
          ) : (
            <Avatar
              size={scale(36)}
              source={
                item?.picture
                  ? {
                      uri: item?.picture,
                    }
                  : IMAGES.logoSrc
              }
            />
          )}
          <View style={styles.mailContent}>
            <View style={styles.mailFirstRowContainer}>
              <View
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                {isBookMark && (
                  <IMAGES.icBookMark
                    height={18}
                    color={'#50048A'}
                    fill={'#50048A'}
                  />
                )}
                <Text
                  style={[styles.senderName, computedDisableStyle]}
                  numberOfLines={1}>
                  {safeString(item?.sender_name)}
                </Text>
              </View>
              <Text style={[styles.dateTime, computedDisableStyle]}>
                {DateUtils.unixToFormatDefault(item?.received_on_unix)}
              </Text>
            </View>
            <View style={{height: scale(5)}} />
            <View style={{flex: 1}}>
              <Text
                style={[styles.subject, computedDisableStyle]}
                numberOfLines={1}>
                {safeString(item?.subject)}
              </Text>
              <View style={{height: scale(2)}} />
              <Text
                style={[styles.shortBody, computedDisableStyle]}
                numberOfLines={1}>
                {safeString(item?.short_body)}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: scale(12),
    paddingHorizontal: scale(20),
    paddingBottom: scale(10),
    backgroundColor: 'white',
  },

  mailContent: {flex: 1},
  mailFirstRowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  senderName: {
    ...CommonStyles.font.semiBold16,
    color: '#3C3C3C',
  },
  subject: {
    ...CommonStyles.font.semiBold14,
    color: '#3C3C3C',
  },
  dateTime: {
    ...CommonStyles.font.semiBold12,
    color: '#3C3C3C',
  },
  shortBody: {
    ...CommonStyles.font.regular14,
    color: '#3C3C3C',
  },
  textDisable: {
    color: '#757575',
    fontFamily: CommonStyles.fontFamily.regular,
  },
});

export default React.memo(MailRow);
