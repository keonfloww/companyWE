import React, {
  PropsWithChildren,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import {Modalize} from 'react-native-modalize';

interface Props extends PropsWithChildren {
  headerIcon?: ReactNode;
  headerTitle?: string;
}

export interface ImperativeBaseBottomSheet {
  show: () => void;
}
const BaseBottomSheet = forwardRef<ImperativeBaseBottomSheet, Props>(
  (props, ref) => {
    const modalizeRef = useRef<Modalize>(null);

    useImperativeHandle(
      ref,
      () => ({
        show: () => {
          modalizeRef?.current?.open();
        },
      }),
      [],
    );

    return <Modalize ref={modalizeRef}></Modalize>;
  },
);

export default React.memo(BaseBottomSheet);
