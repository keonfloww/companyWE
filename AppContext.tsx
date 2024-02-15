import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {RootSiblingPortal} from 'react-native-root-siblings';
import Loading from '@components/atoms/Loading';
// import DebugView from '@components/molecules/DebugView';
import Toast from 'react-native-easy-toast';
import BaseModal from '@components/atoms/Modal/BaseModal';
import useInboxScreen from '@screens/Inbox/hooks/useInboxScreen';
import IMAGES from '@assets/images/images';
import CommonStyles from '@screens/styles';
import {scale} from '@utils/mixins';
import {t} from 'i18next';
import {StyleSheet, Text, View} from 'react-native';

const Context = createContext({});

/**
 * This FC handle global func/props for app totally
 * @param {PropsWithChildren} {children}
 * @return {*}
 */
let toasts: any;
const AppProvider = ({children}: PropsWithChildren) => {
  const {
    mailCountUnread,
    computedIsShowDeleteAfterSyncedMail,

    handleMoveMailToTrash,
    handleSetFlagAskForDelete,
  } = useInboxScreen();

  const [isShowDeleteAfterSyncedMail, setIsShowDeleteAfterSyncedMail] =
    useState(false);

  useEffect(() => {
    console.log(
      'computedIsShowDeleteAfterSyncedMail',
      computedIsShowDeleteAfterSyncedMail,
    );
    if (computedIsShowDeleteAfterSyncedMail && mailCountUnread > 0) {
      console.log('sohw');
      setIsShowDeleteAfterSyncedMail(true);
    }
  }, [computedIsShowDeleteAfterSyncedMail]);

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
        console.log('isError', isError);
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
      <RootSiblingPortal>
        <BaseModal
          isShow={isShowDeleteAfterSyncedMail}
          headerIcon={<IMAGES.icTrash color={'#E74C3C'} />}
          confirmTitle={t('Yes, I am sure')}
          cancelTitle={t('No')}
          actionViewStyle={{height: scale(40)}}
          buttonContainerStyle={{paddingVertical: scale(0)}}
          onClose={() => {
            handleSetFlagAskForDelete({shouldAsk: false});
            setIsShowDeleteAfterSyncedMail(false);
          }}
          onConfirm={() => {
            setIsShowDeleteAfterSyncedMail(false);
            handleMoveMailToTrash();
          }}>
          <Text
            style={{
              ...CommonStyles.font.bold24,
              ...style.text,
              textAlign: 'center',
            }}>
            {`Want to delete promotional emails from your mail inbox?`}
          </Text>
          <View style={{height: scale(16)}} />
          <Text
            style={{
              ...CommonStyles.font.regular14,
              ...style.text,
              textAlign: 'center',
            }}>
            It will move all the promotional emails to the trash folder. You can
            restore them later.
          </Text>
        </BaseModal>
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
