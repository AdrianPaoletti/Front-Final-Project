import { Commit, Dispatch } from "vuex";
import { State } from "../src/types/interface";

const configActionContext = (commit: Commit): any => ({
  commit,
  dispatch: jest.fn(),
  getters: jest.fn(),
  rootState: {} as State,
  rootGetters: jest.fn(),
});

const configActionContextDispatch = (dispatch: Dispatch): any => ({
  commit: jest.fn(),
  dispatch,
  getters: jest.fn(),
  rootState: {} as State,
  rootGetters: jest.fn(),
});

const localStorageMock = () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
});

export { configActionContext, configActionContextDispatch, localStorageMock };
