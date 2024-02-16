import {userSliceActions} from '@redux/slices/user.slice';
import {useDispatch} from 'react-redux';

const useInboxScreenAction = () => {
  const dispatch = useDispatch();
  const handleMarkDeletedMany = (metadata_ids: string[]) =>
    dispatch(userSliceActions.mailMarkDeletedMany({metadata_ids}));

  return {handleMarkDeletedMany};
};

export default useInboxScreenAction;
