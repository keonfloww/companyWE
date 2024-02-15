import AsyncStorage from '@react-native-async-storage/async-storage';

const appendNewConnectedMailCrendentials = async (
  value: string,
): Promise<void> => {
  if (!value) {
    throw Error('Error in appendNewConnectedMailCrendentials');
  }
  const oldConnectedMailByCredentialsString: string | null =
    await AsyncStorage.getItem(LOCAL_STORAGE_KEYS.IS_CONNECTED_MAILS);
  const oldConnectedMailByCredentials: string[] =
    oldConnectedMailByCredentialsString
      ? JSON.parse(oldConnectedMailByCredentialsString)
      : [];

  return AsyncStorage.setItem(
    LOCAL_STORAGE_KEYS.IS_CONNECTED_MAILS,
    JSON.stringify(oldConnectedMailByCredentials.concat(value)),
  );
};
const isConnectedMail = async (value: string) => {
  const oldConnectedMailByCredentialsString: string | null =
    await AsyncStorage.getItem(LOCAL_STORAGE_KEYS.IS_CONNECTED_MAILS);

  const oldConnectedMailByCredentials: string[] =
    oldConnectedMailByCredentialsString
      ? JSON.parse(oldConnectedMailByCredentialsString)
      : [];

  console.log('oldConnectedMailByCredentials', oldConnectedMailByCredentials);
  return oldConnectedMailByCredentials?.includes(value);
};

const shouldClearLocalStorageOnFirstTime = async ({
  key = '',
  onYes = () => {},
}) => {
  const storageKey = await AsyncStorage.getItem(LOCAL_STORAGE_KEYS.STORAGE_KEY);
  if (storageKey != key) {
    console.info(
      '------------CLEAN UP OLD STORAGE ON INSTALL APPLICATION------------',
    );
    await AsyncStorage.setItem(LOCAL_STORAGE_KEYS.USER, '');
    await AsyncStorage.setItem(LOCAL_STORAGE_KEYS.IS_CONNECTED_MAILS, '');
    onYes();
  }
  await AsyncStorage.setItem(LOCAL_STORAGE_KEYS.STORAGE_KEY, key);
};

export enum LOCAL_STORAGE_KEYS {
  STORAGE_KEY = 'storage_key',
  USER = 'user',
  IS_CONNECTED_MAILS = 'is_connected_mails',
}

export const LocalUtils = {
  appendNewConnectedMailCrendentials,
  isConnectedMail,
  shouldClearLocalStorageOnFirstTime,
};
