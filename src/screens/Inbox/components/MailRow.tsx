import IMAGES from '@assets/images/images';
import {Email} from '@models/mail/modelMail';
import CommonStyles from '@screens/styles';
import DateUtils from '@utils/dateUtils';
import {scale} from '@utils/mixins';
import {safeString} from '@utils/stringUtils';
import React, {FC, useMemo, useState} from 'react';
import {Pressable, StyleSheet, TextStyle} from 'react-native';
import {Checkbox, Colors, Drawer, Text, View} from 'react-native-ui-lib';
import useMailItem from '../hooks/useMailItem';
import {ColorUtils} from '@utils/colorUtils';
// import { LightenDarkenColor } from '@utils/colorUtils';

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

  const computedBookmarkTextStyle = useMemo((): TextStyle => {
    if (!isBookMark) {
      return {};
    }

    return {
      color: Colors.primary,
    };
  }, [isBookMark]);

  return (
    <Drawer
      useNativeAnimations={true}
      onDragStart={onCancelSelectMode}
      rightItems={[
        {
          width: scale(78),
          customElement: <IMAGES.icUnBookmark />,
          background: Colors.primary,
          onPress: handleMarkBookMark,
        },
      ]}
      leftItem={{
        width: scale(78),
        customElement: <IMAGES.icMailOpen />,
        background: Colors.success,
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
                color={Colors.primary}
                iconColor={Colors.white}
                outline
                containerStyle={{
                  width: scale(36),
                  height: scale(36),
                  backgroundColor: selected ? Colors.primary : Colors.white,
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
            <View
              style={[
                styles.logoContainer,
                {
                  backgroundColor: ColorUtils.getColorFromChar(
                    item?.sender_name,
                  ).SecondaryColor,
                },
              ]}>
              <Text
                style={[
                  styles.logoText,
                  {
                    color: ColorUtils.getColorFromChar(item?.sender_name)
                      .MainColor,
                  },
                ]}>
                {safeString(item?.sender_name)?.[0]}
              </Text>
            </View>
            // <Avatar
            //   size={scale(36)}
            //   imageProps={{resizeMode: 'contain',}}
            //   source={
            //     item?.images.length
            //       ? {
            //           uri: item?.images[0].src,
            //         }
            //       : IMAGES.logoSrc
            //   }
            // />
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
                    height={scale(18)}
                    color={Colors.primary}
                    fill={Colors.primary}
                  />
                )}
                <Text
                  style={[
                    styles.senderName,
                    computedDisableStyle,
                    computedBookmarkTextStyle,
                  ]}
                  numberOfLines={1}>
                  {safeString(item?.sender_name)}
                </Text>
              </View>
              <Text style={[styles.dateTime, computedDisableStyle]}>
                {DateUtils.unixToFormatDefault(item?.received_on_unix)}
              </Text>
            </View>
            <View style={CommonStyles.space.s5} />
            <View style={{flex: 1}}>
              <Text
                style={[styles.subject, computedDisableStyle]}
                numberOfLines={1}>
                {safeString(item?.subject)}
              </Text>
              <View style={CommonStyles.space.s2} />
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
    backgroundColor: Colors.white,
  },
  logoContainer: {
    borderRadius: scale(36),
    borderColor: Colors.borderAvatar,
    borderWidth: scale(1),
    width: scale(36),
    height: scale(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    ...CommonStyles.font.semiBold16,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingTop: scale(2),
    paddingLeft: scale(0.5),
  },
  mailContent: {flex: 1},
  mailFirstRowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  senderName: {
    ...CommonStyles.font.semiBold16,
    color: Colors.textSecondary,
  },
  subject: {
    ...CommonStyles.font.semiBold14,
    color: Colors.textSecondary,
  },
  dateTime: {
    ...CommonStyles.font.semiBold12,
    color: Colors.textSecondary,
  },
  shortBody: {
    ...CommonStyles.font.regular14,
    color: Colors.textSecondary,
  },
  textDisable: {
    color: Colors.textDisable,
    fontFamily: CommonStyles.fontFamily.regular,
  },
});

export default React.memo(MailRow);
