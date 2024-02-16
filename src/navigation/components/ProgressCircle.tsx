import {scale} from '@utils/mixins';
import React, {FC} from 'react';
import {Circle} from 'react-native-progress';

const ProgressCircle: FC = () => {
  return (
    <Circle
      style={{borderRadius: 99}}
      size={scale(25)}
      strokeCap="round"
      endAngle={0.8}
      indeterminate={true}
      borderColor="#50048A"
      borderWidth={scale(5)}
    />
  );
};

export default React.memo(ProgressCircle);
