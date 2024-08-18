import axios from "axios";

const API_URL = "http://localhost:4000/products";

export const getAllProduct = async (): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URL+"/all")
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const findByName = async (name: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URL+`/find/${name}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}


export const saveProduct = async (data: any): Promise<any> => {
  console.log(data);
  return new Promise((resolve, reject) => {
    axios
      .post(API_URL+"/add", data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const updateProduct = async (data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .put(API_URL+"/update", data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const enableOrDisableProduct = async (status: boolean,name: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .put(API_URL+`/disable/${status}/${name}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
} 