import {useDispatch, useSelector} from 'react-redux';
import {BaseState} from '@redux/stores';
import {useUserRegisterMutation} from '@redux/slices/api/userApi.slice';

const useAuth = ({type}: {type: string}) => {
  const [userRegister] = useUserRegisterMutation();
  const user = useSelector((state: BaseState) => state?.userReducer?.user?.id);
  const connectedMails = useSelector(
    (state: BaseState) => state?.userReducer.connectedMails,
  );
  return {user};
};
export default useAuth;
