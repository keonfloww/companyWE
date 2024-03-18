const InAppBrowserUtils = {
  configDefault: {
    // iOS Properties
    dismissButtonStyle: 'cancel',
    preferredBarTintColor: '#50048A',
    preferredControlTintColor: 'white',
    readerMode: false,
    animated: true,
    modalPresentationStyle: 'fullScreen',
    modalTransitionStyle: 'coverVertical',
    modalEnabled: true,
    enableBarCollapsing: false,
    // Android Properties
    showTitle: true,
    toolbarColor: '#50048A',
    secondaryToolbarColor: 'black',
    navigationBarColor: 'black',
    navigationBarDividerColor: 'white',
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    forceCloseOnRedirection: true,
    // Specify full animation resource identifier(package:anim/name)
    // or only resource name(in case of animation bundled with app).
    animations: {
      startEnter: 'slide_in_right',
      startExit: 'slide_out_left',
      endEnter: 'slide_in_left',
      endExit: 'slide_out_right',
    },
  },
};

export default InAppBrowserUtils;
