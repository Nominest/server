const express = require("express");
let cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 2500;
app.use(cors());
app.use(bodyParser.json());
const upload = multer({ dest: "uploads/" });

app.get("/products", (req, res) => {
  console.log("get req avlaa");
  fs.readFile("./data/data.json", (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      const products = JSON.parse(data);
      res.status(200).send(products);
    }
  });
});

app.post("/product/add", (req, res) => {
  console.log("Post huselt orj irlee:", req.body);
  fs.readFile("./data/data.json", (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      const products = JSON.parse(data);
      products.push(req.body);
      fs.writeFile("./data/data.json", JSON.stringify(products), (err) => {
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
  //   console.log("Post huselt orj irlee:", req.body);
  const { id } = req.params;
  console.log(id);
  fs.readFile("./data/data.json", (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      const products = JSON.parse(data);
      // products.push(req.body);
      const dataNew = products.filter((product) => product.id !== id);
      fs.writeFile("./data/data.json", JSON.stringify(dataNew), (err) => {
        if (err) {
          res.status(500).send({ message: err });
        } else {
          res.status(200).send({ message: "Product added successfully" });
        }
      });
    }
  });
});

app.get("/orders", (req, res) => {
  console.log("get req avlaa in orders");
  fs.readFile("./data/orders.json", (err, orders) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      const order = JSON.parse(orders);
      res.status(200).send(order);
    }
  });
});

app.get("/moderators", (req, res) => {
  console.log("get req avlaa in orders");
  fs.readFile("./data/moderators.json", (err, orders) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      const order = JSON.parse(orders);
      res.status(200).send(order);
    }
  });
});

//dashboard products
app.get("/home/products", (req, res) => {
  console.log("get req avlaa dashboar products");
  fs.readFile("./data/data.json", (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      const products = JSON.parse(data);
      res.status(200).send(products);
    }
  });
});

//dashboard user
app.get("/home/user", (req, res) => {
  console.log("get req avlaa dashboar user");
  fs.readFile("./data/users.json", (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      const user = JSON.parse(data);
      res.status(200).send(user);
    }
  });
});

// //dashbo  ard users
// app.get("/home/users", (req, res) => {
//   console.log("get req avlaa dashboar users");
//   fs.readFile("./data/users.json", (err, data) => {
//     if (err) {
//       res.status(500).send({ message: err });
//     } else {
//       const user = JSON.parse(data);
//       res.status(200).send(user);
//     }
//   });
// });

app.listen(port, () => {
  console.log(`Server is starting in ${port} port`);
});

//orders
// app.get("/orders", (req, res) => {
//   console.log(" orders get req avlaa");
//   fs.readFile("./data/orders.json", (err, data) => {
//     if (err) {
//       res.status(500).send({ message: err });
//     } else {
//       const products = JSON.parse(data);
//       res.status(200).send(products);
//     }
//   });
// });
//npm i random-id
// app.get("/products", (request, response) => {
//   console.log("huselt orj irlee");
//   response.status(200).json(datas);
// });

// app.delete("/products/:id", (req, res) => {
//   const id = req.params.id;
//   console.log("delete huselt", id);
//   //   datas = datas.filter((product) => product.id !== id);
//   //   console.log("datas", datas);
// });

// app.listen(port, () => {
//   console.log(`Server is starting in ${port} port`);
// });

// app.get("/reservations", (request, response) => {
//   console.log("huselt orj irlee orders");
//   response.status(200).json(orders);
// });

// app.get("/users", (request, response) => {
//   console.log("huselt orj irlee orders");
//   response.status(200).json(users);
// });

// app.get("/moderators", (request, response) => {
//   console.log("huselt orj irlee orders");
//   response.status(200).json(users);
// });

// app.get("/users", (request, response) => {
//   console.log("huselt orj irlee orders");
//   response.status(200).json(users);
// });
