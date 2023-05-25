const tarifModel = require("./tarif-model");

async function checkTarifId(req, res, next) {
  try {
    const isExistTarif = await tarifModel.idyeGoreTarifGetir(
      req.params.tarif_id
    );
    if (isExistTarif.length == 0) {
      res.status(404).json({ message: "Tarif yok" });
    } else {
      req.currentTarif = isExistTarif;
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { checkTarifId };
