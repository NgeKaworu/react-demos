import * as aboutService from '../services/about';

export default {
  namespace: 'about',
  state: {
    about: {}
  },
  reducers: {
    save(state, { payload: { data: about } }) {
      return { ...state, about: JSON.parse(about) };
    },
  },
  effects: {
    *fetch({ payload: { author } }, { call, put }) {
      const { data } = yield call(aboutService.fetch, { author });
      yield put({ type: 'save', payload: { data } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/about') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
