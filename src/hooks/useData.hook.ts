import { useEffect } from 'react';
import { AsyncThunk, Selector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const useData = <DispatchResult, SelectType, ThunkArg>(
  thunk: AsyncThunk<DispatchResult, ThunkArg, any>,
  selector: Selector<RootState, SelectType>,
  thunkArg?: ThunkArg
): SelectType => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selector);

  useEffect(() => {
    dispatch(thunk(thunkArg as ThunkArg));
  }, [dispatch, thunk, thunkArg]);

  return data;
};

export default useData;
