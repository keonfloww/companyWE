import {Email} from '@models/mail/modelMail';
import {mailSliceActions} from '@redux/slices/mail.slice';
import {BaseState} from '@redux/stores';
import {useDispatch, useSelector} from 'react-redux';

const useMailItem = ({item}: {item: Email}) => {
  const dispatch = useDispatch();

  const handleMarkAsRead = () =>
    dispatch(mailSliceActions.mailMarkAsRead({metadata_id: item?.metadata_id}));
  const handleMarkBookMark = () =>
    dispatch(
      mailSliceActions.mailMarkBookmark({metadata_id: item?.metadata_id}),
    );

  const isRead = useSelector(
    (state: BaseState) =>
      state.mailReducer?.mailReadMetadataIds?.[item?.metadata_id],
  );
  const isBookMark = useSelector(
    (state: BaseState) =>
      state.mailReducer?.mailBookmarkMetadataIds?.[item?.metadata_id],
  );

  return {
    isRead,
    isBookMark,

    handleMarkAsRead,
    handleMarkBookMark,
  };
};

export default useMailItem;
