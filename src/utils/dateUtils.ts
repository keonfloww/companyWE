import moment from 'moment';

export const DateFormatUtils = {
  BACKEND_FORMAT: 'YYYY/MM/DD',
  FRONTEND_FORMAT_DEFAULT: 'h:mm A D MMM YYYY',
  FRONTEND_FORMAT_DEFAULT_DATE: 'D MMM YYYY',
  FRONTEND_FORMAT_DEBUG: 'HH:mm:ss A D MMM YYYY',
};
const DateUtils = {
  formatDefault: (dateString: string) => {
    if (!dateString) {
      return '';
    }
    return moment(dateString).format(DateFormatUtils.FRONTEND_FORMAT_DEFAULT);
  },
  unixToFormatDefault: (unix?: number, format?: string) => {
    if (!unix) {
      return '';
    }
    return moment
      .unix(unix)
      .format(format ?? DateFormatUtils.FRONTEND_FORMAT_DEFAULT);
  },
};

export default DateUtils;
