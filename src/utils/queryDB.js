import axios from "axios";
const localStorageName = "myDriveUser";
const folderUrl = "/api/folders";
const fileUrl = "/api/files";
const loginUrl = "/api/login";
const registerUrl = "/api/register";

let token;

const getToken = () => {
  return JSON.parse(localStorage.getItem(localStorageName)).token;
};

export const getFolderData = (queryValue, queryType) => {
  token = getToken();

  return axios.get(`${folderUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      queryValue,
      queryType,
    },
  });
};

export const createNewFolder = (queryValue, queryType, name) => {
  token = getToken();

  return axios.post(
    `${folderUrl}`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        queryValue,
        queryType,
      },
    }
  );
};

export const uploadFile = (queryValue, queryType, fileDetails) => {
  token = getToken();

  return axios.post(
    `${fileUrl}`,
    fileDetails,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        queryValue,
        queryType,
      },
    }
  );
}

export const getImageData = (queryValue, queryType) => {
  token = getToken();

  return axios.get(`${fileUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      queryValue,
      queryType,
    },
  });
};

export const getAllFilesMetadata = (queryValue, queryType) => {
  token = getToken();

  return axios.get(`${fileUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      queryValue,
      queryType,
    },
  });
}

export const deleteFile = (queryValue, queryType) => {
  token = getToken();

  return axios.delete(`${fileUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      queryValue,
      queryType,
    },
  });
};

export const deleteFolder = (queryValue, queryType) => {
  token = getToken();

  return axios.delete(`${folderUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      queryValue,
      queryType,
    },
  });
}

export const loginUser = (credentials) => {
  return axios.post(loginUrl, credentials);
};

export const registerUser = (credentials) => {
  return axios.post(registerUrl, credentials);
};
