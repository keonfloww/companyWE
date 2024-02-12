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

export enum LOCAL_STORAGE_KEYS {
  USER = 'user',
  IS_CONNECTED_MAILS = 'is_connected_mails',
}

export const LocalUtils = {
  appendNewConnectedMailCrendentials,
  isConnectedMail,
};
