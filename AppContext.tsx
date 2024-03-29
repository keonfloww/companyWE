import Loading from '@components/atoms/Loading';
import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react';
import {RootSiblingPortal} from 'react-native-root-siblings';
// import DebugView from '@components/molecules/DebugView';
import {scale} from '@utils/mixins';
import {StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-easy-toast';

const Context = createContext({});

/**
 * This FC handle global func/props for app totally
 * @param {PropsWithChildren} {children}
 * @return {*}
 */
let toasts: any;
const AppProvider = ({children}: PropsWithChildren) => {
  const [targetMailToDelete, setTargetMailToDelete] = useState<string | null>(
    null,
  );

  // useEffect(() => {
  //   console.log(
  //     'computedIsShowDeleteAfterSyncedMail',
  //     computedIsShowDeleteAfterSyncedMail,
  //   );
  //   if (isShowDeleteAfterSyncedMail == true) {
  //     return;
  //   }
  //   if (computedIsShowDeleteAfterSyncedMail) {
  //     console.log('sohw');
  //     setTargetMailToDelete(true);
  //   }
  // }, [computedIsShowDeleteAfterSyncedMail]);

  const [showNetwork, setShowNetwork] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleShowNetwork = useCallback(
    () => setShowNetwork(prev => !prev),
    [showNetwork],
  );

  const showToast = useCallback((message: string | any, isError?: boolean) => {
    if (message) {
      try {
        if (!toasts) {
          return;
        }
        const computedMessage = message;

        const textStyle = {
          color: isError ? 'white' : '#1A4656',
        };

        if (!message && !computedMessage) {
          console.log('Message empty to show message');
          return;
        }
        toasts.show(
          <View
            style={{
              display: 'flex',
              backgroundColor: isError ? 'rgba(255, 35, 64, 1)' : '#E4FFBF',
              width: '100%',
              borderRadius: scale(5),
              padding: scale(15),
            }}>
            {/* {isError ? (
              <IMAGES.icCloseRound
                {...CommonStyles.icon.icon24}
                color={'white'}
              />
            ) : (
              <IMAGES.icCheckMessage {...CommonStyles.icon.icon24} />
            )} */}
            <View style={{width: scale(15)}}></View>
            <Text numberOfLines={3} style={textStyle}>
              {isError ? computedMessage : message}
            </Text>
          </View>,
          7000,
        );
      } catch (error) {
        console.log('Toast was not exist');
      }
    }
  }, []);

  const globals = {
    showLoading: () => {
      setLoading(true);
    },
    hideLoading: () => {
      setLoading(false);
    },
    showToast,
    showDeleteMailModal: (targetEmail: string) => {
      if (targetMailToDelete) {
        return;
      }
      setTargetMailToDelete(targetEmail);
    },
  };
  return (
    <Context.Provider value={globals}>
      {children}
      <Toast
        position="top"
        style={{
          backgroundColor: 'transparent',
          borderRadius: 5,
          marginHorizontal: scale(25),
        }}
        ref={ref => {
          toasts = ref;
        }}
        fadeInDuration={0}
        fadeOutDuration={0}
        opacity={0.8}
      />
      <RootSiblingPortal>
        <Loading show={loading} />
      </RootSiblingPortal>

      {/* TODO: implement show debug button on dev env only */}
      {/* <DebugView
        showNetwork={showNetwork}
        handleShowNetwork={handleShowNetwork}
      /> */}
    </Context.Provider>
  );
};

export const AppConsumer = Context.Consumer;
export default AppProvider;

const style = StyleSheet.create({
  text: {
    color: '#3c3c3c',
  },
});
