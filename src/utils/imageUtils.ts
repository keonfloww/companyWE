import {Platform} from 'react-native';
import {Image} from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-crop-picker';

import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {scale, scaleHeight} from './mixins';

enum CONFIG {
  DEFAULT_IMAGE_TYPE = 'jpeg',
  DEFAULT_IMAGE_MINE_TYPE = 'image/jpeg',
  // '2MB' = 2097152,
  '2MB' = 2000000,
}
const handleCameraPermission = async ({
  onBlocked,
  onGranted,
}: {
  onBlocked: () => void;
  onGranted: () => void;
}) => {
  try {
    const permission =
      Platform.OS == 'ios' ? PERMISSIONS.IOS : PERMISSIONS.ANDROID;

    const status = await check(permission.CAMERA);
    if (status === RESULTS.DENIED) {
      const res = await request(permission.CAMERA);
      if ([RESULTS.GRANTED, RESULTS.LIMITED].includes(res)) {
        onGranted();
      } else {
        onBlocked();
      }
      return;
    }

    if (status === RESULTS.BLOCKED) {
      // Permission denied and not revocable. Inform the user to enable it manually.
      onBlocked();
      return;
    }
    onGranted();
  } catch (error) {
    console.error('Error checking camera permission: ', error);
  }
};

const handleGalleryPermission = async ({
  onBlocked = () => {},
  onGranted = () => {},
}: {
  onBlocked?: () => void;
  onGranted?: () => void;
}) => {
  try {
    const galleryPermission =
      Platform.OS == 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
    const status: any = await check(galleryPermission);

    if ([RESULTS.DENIED, RESULTS.BLOCKED].includes(status)) {
      const res = await request(galleryPermission);
      if ([RESULTS.GRANTED, RESULTS.LIMITED].includes(res)) {
        onGranted();
      } else {
        onBlocked();
        throw Error('Could not access gallery by permission');
      }
      return;
    }

    // if (status === RESULTS.BLOCKED) {
    //   // Permission denied and not revocable. Inform the user to enable it manually.
    //   onBlocked();
    //   return;
    // }
    // onGranted();
  } catch (error) {
    console.error('Error checking gallery permission: ', error);
    throw error;
  }
};

const computeBase64String = (image: Image) => {
  // data:${image.mime};base64,${image.data}`
  return `data:${image?.mime};base64,${image?.data}`;
};
const openGallery = () => {
  return ImagePicker.openPicker({
    // freeStyleCropEnabled: true,
    includeBase64: true,
    mediaType: 'photo',
    maxFiles: 1,
  });
};
const openCropper = ({path}: {path: string}) => {
  return ImagePicker.openCropper({
    cropBoxResizable: false,
    // height: scaleHeight(202),
    // width: scale(340),

    cropping: true,
    compressImageQuality: 0.8,
    compressImageMaxWidth: 5000,
    compressImageMaxHeight: 5000,
    ...(Platform.OS == 'ios' ? {height: 5000, width: 5000} : {}),
    avoidEmptySpaceAroundImage: false,
    freeStyleCropEnabled: true,
    includeBase64: true,
    mediaType: 'photo',
    path: Platform.OS == 'android' ? 'file://' + path : path,
    originalAspectRatio: true, // patched packagem IOS only for original size

    cropperActiveWidgetColor: '#24D4F7',
    // cropperStatusBarColor: 'red',
    cropperToolbarColor: '#24D4F7',
    // cropperToolbarWidgetColor
    cropperToolbarTitle: 'Troove Cropper',
    cropperStatusBarColor: '#24D4F7',
    // cropperTintColor: 'red',
    // cropperCircleOverlay: true,
    // cropperCancelColor: 'red',
    // cropperChooseText: 'red',
    // cropperChooseColor
  });
};

const isMaxAppFileSize = (size: number) => {
  return size > CONFIG['2MB'];
};

const ImageUtils = {
  handleCameraPermission,
  handleGalleryPermission,

  openCropper,
  openGallery,
  computeBase64String,
  isMaxAppFileSize,

  CONFIG,
};

export default ImageUtils;
