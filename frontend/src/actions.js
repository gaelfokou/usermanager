import * as constants from "./constants";
import requests from "./requests";

export const fillUser = (event) => ({
  type: constants.FILL_USER,
  payload: event,
});

export const resetUser = () => ({
  type: constants.RESET_USER,
});

export const startUser = () => ({
  type: constants.START_USER,
});

export const successUser = () => ({
  type: constants.SUCCESS_USER,
});

export const failureUser = () => ({
  type: constants.FAILURE_USER,
});

export const listUsers = (data) => ({
  type: constants.LIST_USERS,
  payload: data,
});

export function fetchFillUser(event) {
  return async (dispatch) => {
    dispatch(fillUser(event));
  };
}

export function fetchResetUser() {
  return async (dispatch) => {
    dispatch(resetUser());
  };
}

export function fetchDeleteUser(id) {
  return async (dispatch) => {
    dispatch(startUser());
    const baseUrl = `${process.env.API_URL}/api/user/destroy/${id}/`;

    requests.axios(baseUrl, 'DELETE')
    .then((response) => {
      dispatch(fetchListUsers());
      dispatch(successUser());
    })
    .catch((error) => dispatch(failureUser()));
  };
}

export function fetchAddUser(data, callbackAddUser) {
  return async (dispatch) => {
    if (
      data.username.trim() != "" &&
      data.email.trim() != "" &&
      data.password.trim() != "" &&
      data.confirm_password.trim() != "" &&
      data.password.trim() == data.confirm_password.trim() &&
      data.first_name.trim() != "" &&
      data.userprofile.hometown.trim() != "" &&
      data.userprofile.age.trim() != "" &&
      data.userprofile.gender.trim() != ""
    ) {
      dispatch(startUser());
      const baseUrl = `${process.env.API_URL}/api/user/create/`;

      requests.axios(baseUrl, 'POST', {}, data)
      .then((response) => {
        if (response.status === 201) {
          dispatch(resetUser());
          dispatch(successUser());
          dispatch(callbackAddUser({
            title: "Success",
            message: "Enregistrement effectué avec succès",
            type: 'success',
            success: true
          }));
        }
      })
      .catch((error) => {
        dispatch(failureUser());
        dispatch(callbackAddUser({
          title: "Error",
          message: JSON.stringify(error.response.data),
          type: 'error',
          success: false
        }));
      });
    } else if (data.password.trim() != data.confirm_password.trim()) {
      dispatch(callbackAddUser({
        title: "Error",
        message: "Confirmation du mot de passe incorrect",
        type: 'warning',
        success: false
      }));
    } else {
      dispatch(callbackAddUser({
        title: "Error",
        message: "Veuillez remplir tous les champs",
        type: 'warning',
        success: false
      }));
    }
  };
}

export function fetchListUsers(search='', page=1, page_size=Number.parseInt(process.env.PAGE_SIZE)) {
  return async (dispatch) => {
    dispatch(startUser());
    const baseUrl = `${process.env.API_URL}/api/user/`;

    requests.axios(baseUrl, 'GET', {}, {search, page, page_size})
    .then((response) => {
      dispatch(listUsers(response.data));
      dispatch(successUser());
    })
    .catch((error) => dispatch(failureUser()));
  };
}

export function fetchEditUser(data, callbackEditUser) {
  return async (dispatch) => {
    if (
      data.username.trim() != "" &&
      data.email.trim() != "" &&
      data.password.trim() != "" &&
      data.confirm_password.trim() != "" &&
      data.password.trim() == data.confirm_password.trim() &&
      data.first_name.trim() != "" &&
      data.userprofile.hometown.trim() != "" &&
      data.userprofile.age.trim() != "" &&
      data.userprofile.gender.trim() != ""
    ) {
      dispatch(startUser());
      const baseUrl = `${process.env.API_URL}/api/user/update/${data.id}/`;

      requests.axios(baseUrl, 'PUT', {}, data)
      .then((response) => {
        if (response.status === 200) {
          dispatch(resetUser());
          dispatch(successUser());
          dispatch(callbackEditUser({
            title: "Success",
            message: "Modification effectué avec succès",
            type: 'success',
            success: true
          }));
        }
      })
      .catch((error) => {
        dispatch(failureUser());
        dispatch(callbackEditUser({
          title: "Error",
          message: JSON.stringify(error.response.data),
          type: 'error',
          success: false
        }));
      });
    } else if (data.password.trim() != data.confirm_password.trim()) {
      dispatch(callbackEditUser({
        title: "Error",
        message: "Confirmation du mot de passe incorrect",
        type: 'warning',
        success: false
      }));
    } else {
      dispatch(callbackEditUser({
        title: "Error",
        message: "Veuillez remplir tous les champs",
        type: 'warning',
        success: false
      }));
    }
  };
}
