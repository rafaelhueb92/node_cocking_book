const http = require("http");
const opts = {
  method: "POST",
  hostname: "reqres.in",
  port: 80,
  path: "/api/users",
  headers: {
    "Content-Type": "application/json",
    "Transfer-Encoding": "chunked",
  },
};

http.get("http://google.com", (res) => {
  console.log(res);
});
