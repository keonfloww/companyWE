import IMAGES from '@assets/images/images';
import {Email} from '@models/mail/modelMail';
import CommonStyles from '@screens/styles';
import DateUtils from '@utils/dateUtils';
import {scale} from '@utils/mixins';
import {safeString} from '@utils/stringUtils';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {Pressable, StyleSheet, TextStyle} from 'react-native';
import {Checkbox, Colors, Drawer, Text, View} from 'react-native-ui-lib';
import useMailItem from '../hooks/useMailItem';
import {ColorUtils} from '@utils/colorUtils';
import useColors from '@utils/hooks/useColors';

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
  const _styles = useColors(styles);

  const {
    isRead,
    handleMarkAsRead,

    isBookMark,
    handleMarkBookMark,

    handleMarkDeleted,
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

  const leftItem = useMemo(() => {
    return {
      width: scale(78),
      customElement: isRead ? (
        <IMAGES.icMail color={Colors.white} />
      ) : (
        <IMAGES.icMailOpen />
      ),
      background: Colors.success,
      onPress: handleMarkAsRead,
    };
  }, [isRead, handleMarkAsRead]);

  const rightItems = useMemo(() => {
    return [
      {
        width: scale(78),
        customElement: isBookMark ? (
          <IMAGES.icUnBookmark {...CommonStyles.icon.icon24} />
        ) : (
          <IMAGES.icBookMarkAction {...CommonStyles.icon.icon24} />
        ),
        background: Colors.primary,
        onPress: handleMarkBookMark,
      },
      {
        width: scale(78),
        customElement: (
          <IMAGES.icTrash {...CommonStyles.icon.icon24} color={Colors.white} />
        ),
        background: Colors.error,
        onPress: handleMarkDeleted,
      },
    ];
  }, [isBookMark, handleMarkBookMark, handleMarkDeleted]);

  const onLongPressItem = useCallback(() => {
    onSelectMode();
    setSelected(true);
    onSelect(item?.metadata_id);
  }, [item?.metadata_id, onSelectMode, setSelected, onSelect]);

  /**
   * Whenever outside trigger cancel selection mode
   * => Clear selected
   */
  useEffect(() => {
    if (isSelectMode == false) {
      setSelected(false);
    }
  }, [isSelectMode]);

  return (
    <Drawer
      bounciness={1}
      // useNativeAnimations={true}
      disableHaptic={true}
      fullSwipeLeft={false}
      fullSwipeRight={false}
      onDragStart={onCancelSelectMode}
      leftItem={leftItem}
      rightItems={rightItems}>
      <Pressable onLongPress={onLongPressItem}>
        <View style={_styles.container}>
          {isSelectMode ? (
            <View>
              <Checkbox
                color={Colors.primary}
                iconColor={Colors.white}
                outline
                containerStyle={{
                  width: scale(34),
                  height: scale(34),
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
                _styles.logoContainer,
                {
                  backgroundColor: ColorUtils.getColorFromChar(
                    item?.sender_name,
                  ).SecondaryColor,
                },
              ]}>
              <Text
                style={[
                  _styles.logoText,
                  {
                    color: ColorUtils.getColorFromChar(item?.sender_name)
                      .MainColor,
                  },
                ]}>
                {safeString(item?.sender_name)?.[0]}
              </Text>
            </View>
          )}
          <View style={_styles.mailContent}>
            <View style={_styles.mailFirstRowContainer}>
              <View
                style={{
                  flex: 3,
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
                    _styles.senderName,
                    computedDisableStyle,
                    computedBookmarkTextStyle,
                  ]}
                  numberOfLines={1}>
                  {safeString(item?.sender_name)}
                </Text>
              </View>
              <Text style={[_styles.dateTime, computedDisableStyle]}>
                {DateUtils.unixToFormatDefault(item?.received_on_unix)}
              </Text>
            </View>
            <View style={CommonStyles.space.s5} />
            <View style={{flex: 1}}>
              <Text
                style={[_styles.subject, computedDisableStyle]}
                numberOfLines={1}>
                {safeString(item?.subject)}
              </Text>
              <View style={CommonStyles.space.s2} />
              <Text
                style={[_styles.shortBody, computedDisableStyle]}
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
    alignItems: 'center',
  },
  senderName: {
    ...CommonStyles.font.semiBold16,
    color: Colors.textSecondary,
    flex: 1,
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
