import axios from "axios";

const API_URL = "http://localhost:4000/users";

export const login = async (name: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URL + `/find/${name}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const singUp = async (data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(API_URL + "/add", data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
