/* eslint-disable no-param-reassign */
import Vue from 'vue';
import { PROFILE_LOAD, AUTH_LOGOUT, PROFILE_TRY_TO_LOAD } from '../actions';

const PROFILE_REQUEST_MUT = 'PROFILE_REQUEST_MUT';
const PROFILE_SUCCESS_MUT = 'PROFILE_SUCCESS_MUT';
const PROFILE_ERROR_MUT = 'PROFILE_ERROR_MUT';

const initialState = {
  status: '',
  profile: {},
  errorMessage: '',
};

const mutations = {
  [PROFILE_REQUEST_MUT]: (state) => {
    state.status = 'PENDING';
  },
  [PROFILE_SUCCESS_MUT]: (state, data) => {
    state.status = 'SUCCESS';
    state.profile = { ...data };
  },
  [PROFILE_ERROR_MUT]: (state, message) => {
    state.status = 'ERROR';
    state.errorMessage = message;
  },
};

const getters = {
  profile: state => state.profile,
  isProfileLoaded: state => !!state.profile.id,
  isLoadProfileBlocked: state => state.status === 'PENDING',
};

const actions = {
  [PROFILE_LOAD]: ({ commit, dispatch }) => {
    commit(PROFILE_REQUEST_MUT);

    Vue.axios.get('users/me')
      .then((response) => {
        commit(PROFILE_SUCCESS_MUT, response.data);
      })
      .catch((err) => {
        commit(PROFILE_ERROR_MUT, err.message);
        dispatch(AUTH_LOGOUT);
      });
  },
  [PROFILE_TRY_TO_LOAD]: ({ dispatch, getters, rootGetters }) => {
    if (rootGetters.isLoggedIn && !getters.isProfileLoaded) {
      dispatch(PROFILE_LOAD);
    }
  },
};

export default {
  state: initialState,
  actions,
  mutations,
  getters,
};
