const express = require("express");
let cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 2300;
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
app.listen(port, () => {
  console.log(`Server is starting in ${port} port`);
});

app.get("/allproducts", (req, res) => {
  fs.readFile("./data/be.json", (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      const products = JSON.parse(data);
      res.status(200).send(products);
    }
  });
});

app.post("/add", (req, res) => {
  console.log("Post huselt orj irlee:", req.body);
  fs.readFile("./data/be.json", (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      const products = JSON.parse(data);
      products.push(req.body);
      fs.writeFile("./data/be.json", JSON.stringify(products), (err) => {
        if (err) {
          res.status(500).send({ message: err });
        } else {
          res.status(200).send({ message: "Product added successfully" });
        }
      });
    }
  });
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  fs.readFile("./data/be.json", (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      const products = JSON.parse(data);
      const dataNew = products.filter((product) => product.id !== id);
      fs.writeFile("./data/be.json", JSON.stringify(dataNew), (err) => {
        if (err) {
          res.status(500).send({ message: err });
        } else {
          res.status(200).send({ message: "Product added successfully" });
        }
      });
    }
  });
});
