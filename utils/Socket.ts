import { io } from "socket.io-client";
const socketClient = io("https://wc-pronos-strapi.herokuapp.com");
export default socketClient;