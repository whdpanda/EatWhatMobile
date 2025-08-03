import { apiFetch } from "./api";
import { API_URL } from "../constants";

// 推荐类型定义（和你的后端返回结构一致）
export type Restaurant = {
  name: string;
  rating: number;
  types: string[];
  address: string;
  url?: string;
};

type RandomRestaurantParams = {
  latitude: number;
  longitude: number;
  distance: number;
  price: number;
  currency: string;
};

type RandomRestaurantResult = {
  restaurants: Restaurant[];
};

// 新写法
export function fetchRandomRestaurants(params: RandomRestaurantParams) {
  return apiFetch<RandomRestaurantResult>(
    `${API_URL}/api/random-restaurants`,
    {
      method: "POST",
      body: JSON.stringify(params),
    }
  );
}
