import { createStore } from "vuex";
import axiosClient from "../axios";

const tmpSurveys = [
  {
    id: 100,
    title: "teste_title",
    slug: "test_sluig",
    status: "test_status",
    image: "",
    description: "test_description",
    created_at: "test_created_at",
    upadated_at: "test_updated_at",
    expire_date: "test_expire_date",
    questions: [
      {
        id: 1,
        type: "select",
        questions: "From witch country are you?",
        description: null,
        data: {
          options: [
            { uuid: "9663f23c-c271-11ec-9d64-0242ac120002", text: "USA" },
            { uuid: "a9dec486-c271-11ec-9d64-0242ac120002", text: "Mexico" },
          ],
        },
      },
      {
        id: 2,
        type: "checkbox",
        questions: "From witch country are you asdasdasd?",
        description: null,
        data: {
          options: [
            { uuid: "9663f23c-c271-11ec-9d64-0242ac120002", text: "asdasd" },
            { uuid: "a9dec486-c271-11ec-9d64-0242ac120002", text: "12312" },
            { uuid: "9663f23c-c271-11ec-9d64-0242ac120002", text: "qwe" },
            { uuid: "a9dec486-c271-11ec-9d64-0242ac120002", text: "as" },
          ],
        },
      },
      {
        id: 5,
        type: "text",
        questions: "From asdasd country are you asdasdasd?",
        description: null,
        data: {},
      },
      {
        id: 6,
        type: "textarea",
        questions: " asdasd country are you asdasdasd?",
        description: null,
        data: {},
      },
    ],
  },
  {
    id: 299,
    title: "teste_title1",
    slug: "test_sluig1",
    status: "test_status1",
    image: "",
    description: "test_description1",
    created_at: "test_created_a1",
    upadated_at: "test_updated_at1",
    expire_date: "test_expire_date1",
    questions: [
      {
        id: 1,
        type: "select",
        questions: "From witch country are you?",
        description: null,
        data: {
          options: [
            { uuid: "9663f23c-c271-11ec-9d64-0242ac120002", text: "USA" },
            { uuid: "a9dec486-c271-11ec-9d64-0242ac120002", text: "Mexico" },
          ],
        },
      },
      {
        id: 2,
        type: "checkbox",
        questions: "From witch country are you asdasdasd?",
        description: null,
        data: {
          options: [
            { uuid: "9663f23c-c271-11ec-9d64-0242ac120002", text: "asdasd" },
            { uuid: "a9dec486-c271-11ec-9d64-0242ac120002", text: "12312" },
            { uuid: "9663f23c-c271-11ec-9d64-0242ac120002", text: "qwe" },
            { uuid: "a9dec486-c271-11ec-9d64-0242ac120002", text: "as" },
          ],
        },
      },
      {
        id: 5,
        type: "text",
        questions: "From asdasd country are you asdasdasd?",
        description: null,
        data: {},
      },
      {
        id: 6,
        type: "textarea",
        questions: " asdasd country are you asdasdasd?",
        description: null,
        data: {},
      },
    ],
  },
];

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
    surveys: [...tmpSurveys],
    questionsTypes: ["text", "select", "radio", "checkbox", "textarea"],
  },

  getters: {},

  actions: {
    saveSurvey({ commit }, survey) {
      let response;
      if (survey.id) {
        response = axiosClient
          .put(`/survey/${survey.id}`, survey)
          .then((res) => {
            commit("updateSurvey", res.data);
            return res;
          });
      } else {
        response = axiosClient.post("/survey", survey).then((res) => {
          commit("saveSurvey", res.data);
          return res;
        });
      }

      return response;
    },

    register({ commit }, user) {
      return axiosClient.post("/register", user).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },

    login({ commit }, user) {
      return axiosClient.post("/login", user).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },

    logout({ commit }) {
      return axiosClient.post("/logout").then((response) => {
        commit("logout");
        return response;
      });
    },
  },

  mutations: {
    saveSurvey: (state, survey) => {
      state.surveys = [...state.surveys, survey.data];
    },

    updateSurvey: (state, survey) => {
      state.surveys = state.surveys.map((s) => {
        if (s.id === survey.data.id) {
          return survey.data;
        }
        return s;
      });
    },

    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem("TOKEN", userData.token);
    },
  },

  modules: {},
});

export default store;
