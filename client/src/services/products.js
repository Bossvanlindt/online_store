import axios from "axios";
const baseURL = "http://localhost:3001";

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const purchaseAll = async (cart) => {
  cart.map((prod) => axios.put(baseURL + "/" + prod.id));
  return {};
};

const productHandler = { getAll, purchaseAll };
export default productHandler;
