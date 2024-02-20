import moment from 'moment';

const DateUtils = {
  BACKEND_FORMAT: 'YYYY/MM/DD',
  FRONTEND_FORMAT_DEFAULT: 'h:mm A D MMM YYYY',
  formatDefault: (dateString: string) => {
    if (!dateString) {
      return '';
    }
    return moment(dateString).format('h:mm A D MMM YYYY');
  },
  unixToFormatDefault: (unix?: number) => {
    if (!unix) {
      return '';
    }
    return moment.unix(unix).format('h:mm A D MMM YYYY');
  },
};

export default DateUtils;
