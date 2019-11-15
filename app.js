const express = require("express");
const app = express();
const port = 3000;

// 設定 express handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// 設定 body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// 設定 public 資料夾
app.use(express.static("public"));

// 設定 資料庫連結
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/restaurant", { useNewUrlParser: true });
const db = mongoose.connection;
const Restaurant = require("./models/restaurant");

// 載入 utils tool
const { checkRequired, checkImageUrl } = require("./utils/check");

// db 偵聽
db.on("error", () => {
  console.log("app.js: mongodb error!");
});

db.once("open", () => {
  console.log("app.js: mongodb connected!");
});

// router 設定
app.get("/", (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err);
    return res.render("index", { restaurants });
  });
});

// 查詢_全部 restaurant
app.get("/restaurants", (req, res) => {
  return res.redirect("/");
});

// 新增_頁面 restaurant (順序必須在這)
app.get("/restaurants/new", (req, res) => {
  return res.render("new");
});

// 查詢_單筆 restaurant 詳細內容
app.get("/restaurants/:id", (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    return res.render("show", { restaurant });
  });
});

// 新增_單筆 restaurant
app.post("/restaurants", (req, res) => {
  let isValidated = checkRequired(req.body);
  let data = {
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: checkImageUrl(req.body.image)
      ? req.body.image
      : "http://" + req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description
  };
  if (!isValidated) return res.render("new", { isError: true, data });
  const restaurant = new Restaurant(data);
  restaurant.save(err => {
    if (err) return console.error(err);
    return res.redirect("/");
  });
});

// 修改_頁面 restaurant
app.get("/restaurants/:id/edit", (req, res) => {
  Restaurant.findById(req.params.id, (err, data) => {
    if (err) return console.error(err);
    return res.render("edit", { data });
  });
});

// 修改_單筆 restaurant
app.post("/restaurants/:id/edit", (req, res) => {
  let isValidated = checkRequired(req.body);
  let data = {
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: checkImageUrl(req.body.image)
      ? req.body.image
      : "http://" + req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description
  };
  if (!isValidated) {
    console.log("???");
    return res.render("edit", {
      isError: true,
      data: Object.assign({}, data, { id: req.params.id })
    });
  }
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    restaurant.name = req.body.name;
    restaurant.name_en = req.body.name_en;
    restaurant.category = req.body.category;
    restaurant.image = checkImageUrl(req.body.image)
      ? req.body.image
      : "http://" + req.body.image;
    restaurant.location = req.body.location;
    restaurant.phone = req.body.phone;
    restaurant.google_map = req.body.google_map;
    restaurant.rating = req.body.rating;
    restaurant.description = req.body.description;
    restaurant.save(err => {
      if (err) return console.error(err);
      return res.redirect(`/restaurants/${req.params.id}`);
    });
  });
});

// 刪除_單筆 restaurant
app.post("/restaurants/:id/delete", (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    restaurant.remove(err => {
      if (err) return console.error(err);
      return res.redirect("/");
    });
  });
});

app.get("/search", (req, res) => {
  const { keyword = "" } = req.query;
  if (!keyword.trim()) return res.redirect("/");

  Restaurant.find((err, result) => {
    if (err) return console.error(err);
    else {
      const restaurants = result.filter(el =>
        el.name.toLowerCase().includes(keyword.toLowerCase())
      );
      return res.render("index", { restaurants, keyword });
    }
  });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
