import IMAGES from '@assets/images/images';
import CommonStyles from '@screens/styles';
import {scale} from '@utils/mixins';
import React, {FC} from 'react';
import {
  FloatingButton,
  FloatingButtonLayouts,
  Colors,
} from 'react-native-ui-lib';

interface Props {
  visible: boolean;
  onDelete: () => void;
  onCancel: () => void;
}
const DeleteMailFloatingButton: FC<Props> = ({
  visible = false,
  onDelete = () => {},
  onCancel = () => {},
}) => {
  return (
    <FloatingButton
      visible={visible}
      hideBackgroundOverlay={true}
      bottomMargin={scale(12)}
      buttonLayout={FloatingButtonLayouts.HORIZONTAL}
      customButtonContainer={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: scale(12),
        paddingRight: scale(23),
        columnGap: scale(10),
      }}
      button={{
        flex: false,
        animateTo: 'right',
        round: true,
        fullWidth: false,
        activeOpacity: 0.7,
        iconSource: IMAGES.icTrashSrc,
        iconStyle: CommonStyles.icon.icon24,
        style: {
          borderRadius: 99,
          height: scale(50),
          width: scale(50),
          right: 0,
        },
        onPress: onDelete,
        backgroundColor: Colors.error,
        right: true,
      }}
      secondaryButton={{
        flex: false,
        animateTo: 'right',
        round: true,
        fullWidth: false,
        activeOpacity: 0.7,
        iconSource: IMAGES.icCloseSrc,
        iconStyle: {
          ...CommonStyles.icon.icon20,
          tintColor: Colors.primary,
        },
        style: {
          borderRadius: 99,
          height: scale(50),
          width: scale(50),
          right: 0,
          backgroundColor: Colors.white,
        },
        onPress: onCancel,
        backgroundColor: 'black',
      }}
    />
  );
};

export default React.memo(DeleteMailFloatingButton);
