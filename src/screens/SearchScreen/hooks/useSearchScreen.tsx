import IMAGES from '@assets/images/images';
import {Email} from '@models/mail/modelMail';
import {userSliceActions} from '@redux/slices/user.slice';
import {BaseState} from '@redux/stores';
import {useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const useSearchScreen = () => {
  const dispatch = useDispatch();

  const [searchContent, setSearchContent] = useState<string>('');

  const userState = useSelector((state: BaseState) => state.userReducer);

  const searchHistoryList = useMemo(
    () => userState.searchHistories,
    [userState.searchHistories],
  );

  const searchResultList = useMemo(() => {
    return (
      userState?.mailbox?.filter((mail: Email) => {
        const foundSubject =
          mail?.subject && mail?.subject?.indexOf(searchContent) != -1;
        const foundSenderName =
          mail?.sender_name && mail?.sender_name?.indexOf(searchContent) != -1;

        const foundShortBody =
          mail?.short_body && mail?.short_body?.indexOf(searchContent) != -1;
        const foundSenderEmail =
          mail?.sender_email &&
          mail?.sender_email?.indexOf(searchContent) != -1;

        return (
          foundSubject || foundSenderName || foundSenderEmail || foundShortBody
        );
      }) ?? []
    );
  }, [searchContent]);

  const handleSearch = ({keyword}: {keyword: string}) => {
    if (!keyword) {
      setSearchContent('');
      return;
    }

    setSearchContent(keyword?.trim());

    dispatch(userSliceActions.searchAppendNewHistory({keyword}));
  };
  const handleRemoveSearchHistory = ({keyword}: {keyword: string}) => {
    dispatch(userSliceActions.searchRemoveHistory({keyword}));
  };

  const categoryList = [
    {label: 'Fashion', icon: () => <IMAGES.icM1 />},
    {label: 'LifeStyle', icon: () => <IMAGES.icM2 />},
    {label: 'Gourmet', icon: () => <IMAGES.icM3 />},
    {label: 'Travel', icon: () => <IMAGES.icM4 />},
    {label: 'Gaming', icon: () => <IMAGES.icM5 />},
    {label: 'Hotel', icon: () => <IMAGES.icM6 />},
    {label: 'Fashion', icon: () => <IMAGES.icM1 />},
    {label: 'LifeStyle', icon: () => <IMAGES.icM2 />},
    {label: 'Gourmet', icon: () => <IMAGES.icM3 />},
    {label: 'Travel', icon: () => <IMAGES.icM4 />},
    {label: 'Gaming', icon: () => <IMAGES.icM5 />},
    {label: 'Hotel', icon: () => <IMAGES.icM6 />},
  ];

  return {
    categoryList,
    searchHistoryList,
    searchContent,
    searchResultList,

    handleSearch,
    handleRemoveSearchHistory,
  };
};

export default useSearchScreen;
