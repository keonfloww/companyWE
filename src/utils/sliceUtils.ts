import {AnyAction} from '@reduxjs/toolkit';
import _ from 'lodash';

// TODO: Refactor utils
/**
 *
 * This function helps us handle pagination easily. ONE FOR ALL
 * @param {string} key
 * @param {*} state
 * @param {AnyAction} action
 * @return {*}
 */
const setReducerPaginateByKey = (
  key: string,
  state: any,
  action: AnyAction,
) => {
  if (!key) {
    return state;
  }
  const {data, meta} = action?.payload;

  const computedData = data?.filter(
    (i: any) => !state?.UIState?.addedIds?.includes(i?.id),
  );
  if (meta?.current_page === undefined) {
    return state;
  }

  const list =
    meta?.current_page === 1
      ? computedData
      : state?.[key]?.data?.concat(computedData);

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

const setDataAfterDelete = (state: any, _action: any, listData: any) => {
  if (_action?.payload?.id) {
    const findItem = listData?.findIndex((item: any) => {
      return item?.id === _action?.payload?.id;
    });
    if (findItem !== -1) {
      _.remove(listData, {id: listData[findItem]?.id});
    }

    // We use lodash so the item was deleted if found
    return state;
  } else {
    return state;
  }
};
const setDataAfterUpdate = (
  key: string,
  state: any,
  _action: any,
  listData: any,
) => {
  if (_action?.payload?.id) {
    const newlistData = listData?.map((item: any) => {
      if (item?.id === _action?.payload?.id && _action?.payload?.newData) {
        return {...item, ..._action?.payload?.newData};
      }
      return item;
    });

    return {
      ...state,
      [key]: {
        data: newlistData,
      },
    };
  } else {
    return state;
  }
};

const setDataAfterCreate = (key: string, state: any, _action: any) => {
  const newItem = _action?.payload?.newItem;
  if (newItem && newItem?.id) {
    return {
      ...state,
      [key]: {
        ...state[key],
        data: [newItem, ...state[key]?.data],
      },
      UIState: {
        addedIds: (state?.UIState?.addedIds ?? []).concat([newItem?.id]), // save UI first added id to prevent duplicate item on UX
      },
    };
  } else {
    return state;
  }
};

export const SliceUtils = {
  setReducerPaginateByKey,
  setDataAfterDelete,
  setDataAfterUpdate,
  setDataAfterCreate,
};
