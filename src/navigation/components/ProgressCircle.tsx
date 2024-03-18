import IMAGES from '@assets/images/images';
import LottieView from 'lottie-react-native';
import React, {FC} from 'react';

const ProgressCircle: FC = () => {
  return (
    <LottieView
      source={IMAGES.gifProgressSrc}
      style={{width: '100%', height: '100%'}}
      autoPlay
      loop
    />
  );
};

export default React.memo(ProgressCircle);
