declare global {
  var props: {
    showLoading: () => void;
    hideLoading: () => void;

    showToast: (message: string, isError: boolean) => void;

    showDeleteMailModal: () => void;
  };
}
export default global;
