const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");


const app = express();

app.use(
    cors({
        origin: "*",
    })
);

const DATA = path.join(__dirname, "data.json");

app.set("port", process.env.PORT || 3001);

app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
});

app.post("/api/products", (req, res) => {
    fs.readFile(DATA, (err, data) => {
        const products = JSON.parse(data);
        const newProduct = {
            name: req.body.name,
            kcal: req.body.kcal,
            protein: req.body.protein,
            fats: req.body.fats,
            carbs: req.body.carbs,
        };
        products.push(newProduct);
        fs.writeFile(DATA, JSON.stringify(products, null, 4), () => {
            res.setHeader("Cache-Control", "no-cache");
            res.json(products);
        });
    });
});

app.get("/api/products", (_, res) => {
    setTimeout(() => {
        fs.readFile(DATA, (err, data) => {
            res.setHeader("Cache-Control", "no-cache");
            res.json(JSON.parse(data));
        });
    }, 1000);
});

app.get("/api/products/:query", (req, res) => {
    const query = req.params.query;
    console.log("called for query: " + query);
    fs.readFile(DATA, (err, data) => {
        res.setHeader("Cache-Control", "no-cache");
        const filtered = JSON.parse(data).filter((p) => p.name.toLowerCase().includes(query.toLocaleLowerCase()));
        res.json(JSON.parse(JSON.stringify(filtered, null, 4)));
    });
});

app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`);
  });