export const safeString = (content: any) => {
  if (content == undefined || !content) {
    return '';
  }
  return content;
};
export const joinText = (...strings: any[]) => {
  return strings?.map((string: string) => safeString(string))?.join(' ') ?? '';
};
