import axiosInstance from "./index";

export async function guess(number: number) {
  const requestData = {
    number: number,
  };
  const { data } = await axiosInstance.post("/guess", requestData);
  return data;
}

export async function refresh() {
  const { data } = await axiosInstance.get("/refresh");
  return data;
}
