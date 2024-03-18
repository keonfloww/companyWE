import {AnyAction} from '@reduxjs/toolkit';
import _ from 'lodash';

const setReducerPaginateByKey = (
  key: string,
  state: any,
  _action: AnyAction,
) => {
  if (!key) {
    return state;
  }

  const {data, meta} = _action.data;

  if (meta?.current_page === undefined) {
    return state;
  }

  const list =
    meta?.current_page === 1 ? data : state?.[key]?.data?.concat(data);

  return {
    ...state,
    ...{
      [key]: {
        data: list,
        meta: data.length ? meta : {...state?.[key].meta, total: 0}, // Not update current_page when empty data
      },
    },
  };
};
const setDataAfterDelete = (
  state: any,
  _action: any,
  listData: any,
  key: any,
) => {
  if (_action?.data?.id) {
    const findItem = listData?.findIndex((item: any) => {
      return item?.id === _action?.data?.id;
    });
    if (findItem !== -1) {
      _.remove(listData, {id: listData[findItem].id});
    }

    return {
      ...state,
      [key]: listData,
    };
  } else {
    return state;
  }
};

const SliceUtils = {
  setReducerPaginateByKey,
  setDataAfterDelete,
};

export default SliceUtils;
