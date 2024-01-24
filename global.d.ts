declare global {
  var props: {
    showLoading: () => void;
    hideLoading: () => void;

    showToast: (message: string, isError: boolean) => void;
  };
}
export default global;
