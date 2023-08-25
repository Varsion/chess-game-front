import axios from "axios";

const api = axios.create({
  baseURL: "https://chess-game-server-fw18.onrender.com",
  timeout: 5000,
});

export const getNextStep = async (position, destination) => {
  let { data: { next_step } } = await api.get("next_step", {
    params: {
      position,
      destination,
    }
  });
  return next_step;
}