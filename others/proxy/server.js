const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer();
const app = require("express")();

app.get("/", (req, res) => {
  proxy.web(req, res, { target: req.query.URL }, (err) => {
    if (err) {
      return res.sendStatus(500);
    }
    console.log(request.headers, request);
    return res.send("OK");
  });
});

app.listen(9000, () =>
  console.log(`Server running on http://localhost:${9000}`)
);
