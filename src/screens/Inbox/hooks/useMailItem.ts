import {Email} from '@models/mail/modelMail';
import {userSliceActions} from '@redux/slices/user.slice';
import {BaseState} from '@redux/stores';
import {useDispatch, useSelector} from 'react-redux';

const useMailItem = ({item}: {item: Email}) => {
  const dispatch = useDispatch();

  const handleMarkAsRead = () =>
    dispatch(userSliceActions.mailMarkAsRead({metadata_id: item?.metadata_id}));
  const handleMarkBookMark = () =>
    dispatch(
      userSliceActions.mailMarkBookmark({metadata_id: item?.metadata_id}),
    );
  const handleMarkDeleted = () =>
    dispatch(
      userSliceActions.mailMarkDeleted({metadata_id: item?.metadata_id}),
    );

  const isRead = useSelector(
    (state: BaseState) =>
      state.userReducer?.mailReadMetadataIds?.[item?.metadata_id],
  );
  const isBookMark = useSelector(
    (state: BaseState) =>
      state.userReducer?.mailBookmarkMetadataIds?.[item?.metadata_id],
  );

  return {
    isRead,
    handleMarkAsRead,

    isBookMark,
    handleMarkBookMark,

    handleMarkDeleted,
  };
};

export default useMailItem;
