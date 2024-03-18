import {useCallback, useMemo, useState} from 'react';

const usePagination = <T extends any>(data: T[], volume: number = 10) => {
  const clonedData = useMemo(() => data, [data]);

  /** All pages in total. */
  const totalPages = useMemo(
    () => Math.floor(clonedData?.length / volume ?? 1),
    [volume, clonedData?.length],
  );

  const [page, setPage] = useState(0);
  /** Data representing one single page. */
  const slicedData = useMemo(
    () => clonedData?.slice(0, page * volume + volume),
    [volume, page, data],
  );

  const nextPage = useCallback(() => {
    setPage((prevState: number) => {
      if (prevState < totalPages) {
        return prevState + 1;
      }

      return prevState;
    });
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setPage((prevState: number) => {
      if (prevState > 0) {
        return prevState - 1;
      }

      return prevState;
    });
  }, []);

  return {
    data: slicedData,
    page,
    totalPages,

    setPage,
    nextPage,
    prevPage,
  };
};

export default usePagination;
