declare global {
  var props: {
    showLoading: () => void;
    hideLoading: () => void;

    showToast: (message: string) => void;
  };
}
export default global;
