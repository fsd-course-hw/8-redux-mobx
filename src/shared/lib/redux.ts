import {
  combineReducers,
  configureStore,
  createListenerMiddleware,
} from "@reduxjs/toolkit";
import { Slice } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export const listenerMiddleware = createListenerMiddleware();
export const store = configureStore({
  reducer: {
    app: (store = {}) => store,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export const useAppSelector = useSelector;
export const useAppDispatch = (): typeof store.dispatch => {
  return useDispatch();
};

export const createBaseSelector = <S, N extends string>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slice: Slice<S, any, N>,
) => {
  return (store: unknown) => {
    const anyStore = store as Record<string, unknown>;
    return anyStore[slice.name] as S;
  };
};

export const useAction = <T, A extends Parameters<typeof store.dispatch>[0]>(
  factory: (p: T) => A,
) => {
  const dispatch = useAppDispatch();

  return useCallback(
    (params: T) => {
      return dispatch(factory(params));
    },
    [dispatch, factory],
  );
};

export const useActionWithDeps = <
  T extends { deps: unknown },
  A extends Parameters<typeof store.dispatch>[0],
>(
  factory: (p: T) => A,
  deps: T["deps"],
) => {
  const dispatch = useAppDispatch();
  return useCallback(
    (params: Omit<T, "deps">) => {
      return dispatch(factory({ deps, ...params } as T));
    },
    [dispatch, factory, deps],
  );
};

const slicesSet = new Set<Slice>();

export const registerSlice = (slices: Slice[]) => {
  console.log(slices, slicesSet);
  slices.forEach((slice) => {
    slicesSet.add(slice);
  });

  store.replaceReducer(
    combineReducers({
      ...Array.from(slicesSet).reduce(
        (acc, slice) => {
          acc[slice.name] = slice.reducer;
          return acc;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {} as Record<string, any>,
      ),
    }),
  );
};
