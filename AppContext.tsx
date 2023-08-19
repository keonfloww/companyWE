import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react';
import {RootSiblingPortal} from 'react-native-root-siblings';
import Loading from '@components/atoms/Loading';
import DebugView from '@components/molecules/DebugView';
import Toast from 'react-native-easy-toast';

const Context = createContext({});

/**
 * This FC handle global func/props for app totally
 * @param {PropsWithChildren} {children}
 * @return {*}
 */
const AppProvider = ({children}: PropsWithChildren) => {
  const [showNetwork, setShowNetwork] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  let toasts: any;

  const handleShowNetwork = useCallback(
    () => setShowNetwork(prev => !prev),
    [showNetwork],
  );

  const showToast = useCallback((message: string) => {
    if (message) {
      try {
        toasts.show(message, 3000);
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
        style={{
          backgroundColor: 'black',
          borderRadius: 5,
          padding: 10,
          marginHorizontal: 20,
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
