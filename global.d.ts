declare global {
  var props: {
    showLoading: () => void;
    hideLoading: () => void;

    showToast: (message: string, isError: boolean) => void;

    showDeleteMailModal: (targetMail: string) => void;
  };
}
export default global;
