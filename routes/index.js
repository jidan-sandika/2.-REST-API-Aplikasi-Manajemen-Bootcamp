var express = require("express");
var router = express.Router();
const fspromises = require("fs/promises");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Here Express" });
});

router.post("/register", async (req, res) => {
  try {
    let { name, role, password } = req.body;
    let obj = { name, role, password, isLogin: false };
    // Baca data.json
    let existingData = await fspromises.readFile("data.json");
    let realData = JSON.parse(existingData);
    realData.push(obj);
    // Simpan perubahan ke data.json menggunakan writeFIle
    await fspromises.writeFile("data.json", JSON.stringify(realData));
    return res.status(201).json(realData);
  } catch (error) {
    return res.status(400).json({ message: "error", error: error });
  }
});

module.exports = router;
