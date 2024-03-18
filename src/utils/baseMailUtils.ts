import {FirebaseAuthTypes} from '@react-native-firebase/auth';

const DEBUG = false;

/**
 * Generate the key for persist store and logic restore persist data
 * Use email for debugging and development
 * Use UID for releasing
 *
 * @param {FirebaseAuthTypes.UserCredential} fireBaseCredential
 * @return {*}
 */
const getValueForPersistMail = (
  fireBaseCredential:
    | FirebaseAuthTypes.UserCredential
    | FirebaseAuthTypes.User
    | null,
) => {
  if (DEBUG) {
    console.info('KEY FOR PERSIST DATA IS EMAIL');
    return fireBaseCredential?.user?.email ?? fireBaseCredential?.email ?? '';
  }
  console.info('KEY FOR PERSIST DATA IS UID');
  return fireBaseCredential?.user?.uid ?? fireBaseCredential?.uid ?? '';
};
const BaseMailUtils = {getValueForPersistMail};
export default BaseMailUtils;
