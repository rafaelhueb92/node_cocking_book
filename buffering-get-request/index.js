const http = require("http");
const assert = require("assert");
const url = "http://www.google.com"; // "http://www.davidmarkclements.com/ncb3/some.json";
http.get(url, (res) => {
  const { headers } = res;
  /*const size = parseInt(res.headers["content-length"], 10);
  const buffer = Buffer.allocUnsafe(size);*/
  let data;
  res.on("data", (chunk) => {
    data += chunk;
  });
  res.on("end", () => {
    //assert.equal(size, buffer.length);
    console.log("headers", headers);
    console.log("data", data);
    // console.log("GUID:", JSON.parse(buffer).guid);
  });
});
