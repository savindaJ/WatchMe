import axios from "axios";

const API_URL = "http://localhost:4000/orders";

export const getPrnndingOrders = async (): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URL)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const saveOrder = async (order: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(API_URL+'/add', order)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const approveOrder = async (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${API_URL}/${id}`, { status: "Approved" })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const setDate = async (id: string, date: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${API_URL}/update`, { date: date, id: id })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
