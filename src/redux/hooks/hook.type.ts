export interface HookHandleFnc<T> {
  data: T;
  onSuccess: () => void;
  onError: () => void;
}
export interface HookHandleFncBasic {
  onSuccess: (_message?: string) => void;
  onError: (_message?: string) => void;
}
export const HookHandleFncBasicDefault = {
  onSuccess: () => {},
  onError: () => {},
};
