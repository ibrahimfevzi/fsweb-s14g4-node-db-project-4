const router = require("express").Router();
const mw = require("./tarif-middleware");

router.get("/:tarif_id", mw.checkTarifId, (req, res, next) => {
  try {
    res.json(req.currentTarif);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
