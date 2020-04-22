const proxy = (url) =>
  new Promise((resolve, reject) => {
    let data, sCode;
    require("http")
      .get(url, (res) => {
        const { headers } = res;
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve({ headers, data, statusCode: sCode }));
      })
      .on("response", ({ statusCode }) => (sCode = statusCode))
      .on("error", (err) => {
        throw reject(err);
      });
  });

const express = require("express");
const app = express();

app.use("/", (req, res, next) => {
  if (req.method !== "GET") return res.sendStatus(405);
  next();
});

app.get("/", async (req, res) => {
  try {
    const { query } = req;
    const { headers, data, statusCode } = await proxy(query.URL);

    if (statusCode != 200) return res.sendStatus(statusCode);

    Object.keys(headers).forEach((key) => {
      res.append(key, headers[key]);
    });

    console.log("header", headers);

    return res.send(data);
  } catch (ex) {
    console.error(ex);
    return res.sendStatus(501);
  }
});

app.listen(9000, () =>
  console.log(`Server running on http://localhost:${9000}`)
);
