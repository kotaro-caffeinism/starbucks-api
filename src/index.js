const { setupServer } = require("./server");
require("dotenv").config({
  path: "../.env.local",
});

const server = setupServer();
const PORT = process.env.SERVER_PORT || 3000;

server.listen(PORT, () => {
  console.log("Server listening on Port", PORT);
});
