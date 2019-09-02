import * as express from "express";
const app = express();

app.get("/message", (req, res) => {
  setTimeout(() => res.json({message: "This is working!!!"}), 1000);
});

app.listen(3001, () => {
  console.log("Express server has started");
});
