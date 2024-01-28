import {BaseState} from '@redux/stores';
import {useMemo} from 'react';
import {useSelector} from 'react-redux';

const useUserViewModel = () => {
  // const dispatch = useDispatch();
  const connectedMails = useSelector(
    (state: BaseState) => state?.userReducer.connectedMails,
  );

  const isEmptyConnectedMails = useMemo(() => {
    return !connectedMails?.length;
  }, [connectedMails]);

  return {isEmptyConnectedMails};
};

export default useUserViewModel;
