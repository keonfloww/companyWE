import AvatarMailSender from '@components/mailComponents/AvatarMailSender';
import {Email} from '@models/mail/modelMail';
import CommonStyles from '@screens/styles';
import DateUtils, {DateFormatUtils} from '@utils/dateUtils';
import {scale} from '@utils/mixins';
import React, {FC} from 'react';
import {View, Text} from 'react-native';

interface Props {
  item: Email;
}
const InboxDetailCustomHeader: FC<Props> = ({item}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        columnGap: scale(5),
      }}>
      <View
        style={{
          width: scale(48),
        }}>
        <AvatarMailSender
          name={item?.sender_name}
          width={scale(40)}
          height={scale(40)}
        />
      </View>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          rowGap: scale(3),
        }}>
        <Text
          numberOfLines={1}
          style={[CommonStyles.font.semiBold16, {color: '#3C3C3C'}]}>
          {item?.sender_name}
        </Text>
        <Text
          numberOfLines={1}
          style={[CommonStyles.font.regular12, {color: '#3C3C3C'}]}>
          {DateUtils.unixToFormatDefault(
            item?.received_on_unix,
            DateFormatUtils.FRONTEND_FORMAT_DEFAULT_DATE,
          )}
        </Text>
        <View style={{height: scale(2)}} />
        <Text style={[CommonStyles.font.regular14, {color: '#3C3C3C'}]}>
          {item?.subject}
        </Text>
      </View>
    </View>
  );
};

export default React.memo(InboxDetailCustomHeader);
