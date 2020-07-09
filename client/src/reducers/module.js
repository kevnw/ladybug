import {
  GET_MODULES,
  GET_MODULES_IN_UNIVERSITY,
  GET_MODULE,
  MODULES_ERROR,
  MODULE_ERROR,
  UPDATE_FOLLOWERS,
  GET_FOLLOWEDMODULES,
  GET_MODULES_RECOMMENDATIONS,
} from '../actions/types';

const initialState = {
  modules: [],
  followedModules: [],
  recommendedModules: [],
  modulesInUniversity: [],
  module: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MODULES:
      return {
        ...state,
        modules: payload,
        loading: false,
      };
    case GET_MODULES_RECOMMENDATIONS:
      return {
        ...state,
        recommendedModules: payload,
        loading: false,
      };
    case GET_MODULES_IN_UNIVERSITY:
      return {
        ...state,
        modulesInUniversity: payload,
        loading: false,
      };
    case GET_MODULE:
      return {
        ...state,
        module: payload,
        loading: false,
      };
    case MODULES_ERROR:
    case MODULE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_FOLLOWERS:
      return {
        ...state,
        modules: state.modules.map((module) =>
          module._id === payload.id
            ? { ...module, followers: payload.followers }
            : module
        ),
        followedModules: state.followedModules.map((module) =>
          module._id === payload.id
            ? { ...module, followers: payload.followers }
            : module
        ),
        recommendedModules: state.recommendedModules.map((module) =>
          module._id === payload.id
            ? { ...module, followers: payload.followers }
            : module
        ),
        modulesInUniversity: state.modulesInUniversity.map((module) =>
          module._id === payload.id
            ? { ...module, followers: payload.followers }
            : module
        ),
        module:
          state.module && state.module._id === payload.id
            ? {
                ...state.module,
                followers: payload.followers,
              }
            : null,
        loading: false,
      };
    case GET_FOLLOWEDMODULES:
      return {
        ...state,
        followedModules: payload,
        loading: false,
      };
    default:
      return state;
  }
}
