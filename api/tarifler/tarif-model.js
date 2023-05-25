const db = require("../../data/db-config");

async function icindekileriGetir(adim_id) {
  const icindekiler = await db("icindekiler_adimlar as ia")
    .leftJoin("icindekiler as i", "i.icindekiler_id", "ia.icindekiler_id")
    .select("i.*", "ia.miktar")
    .where("ia.adim_id", adim_id);
  return icindekiler;
}

async function idyeGoreTarifGetir(tarif_id) {
  /**
     * select * from tarifler t
        left join adimlar a on t.tarif_id = a.tarif_id
        left join icindekiler_adimlar ia on ia.adim_id = a.adim_id
        left join icindekiler i on i.icindekiler_id = ia.icindekiler_id
     */

  const tarifler = await db("tarifler as t")
    .leftJoin("adimlar as a", "t.tarif_id", "a.tarif_id")
    .leftJoin("icindekiler_adimlar as ia", "ia.adim_id", "a.adim_id")
    .leftJoin("icindekiler as i", "i.icindekiler_id", "ia.icindekiler_id")
    .select(
      "t.*",
      "a.adim_id",
      "a.adim_sirasi",
      "a.adim_talimati",
      "i.*",
      "ia.miktar"
    )
    .where("t.tarif_id", tarif_id);
  if (!tarifler || tarifler.length == 0) {
    return [];
  }

  let tarifModel = {
    tarif_id: tarif_id,
    tarif_adi: tarifler[0].tarif_adi,
    kayit_tarihi: tarifler[0].kayit_tarihi,
    adimlar: [],
  };
  for (let i = 0; i < tarifler.length; i++) {
    let satir = tarifler[i];
    let adimModel = {
      adim_id: satir.adim_id,
      adim_sirasi: satir.adim_sirasi,
      adim_talimati: satir.adim_talimati,
      icindekiler: [],
    };
    let isInsertBefore = tarifModel.adimlar.filter(
      (x) => x.adim_id == satir.adim_id
    );
    if (isInsertBefore.length == 0) {
      let icindekiler = await icindekileriGetir(satir.adim_id);
      adimModel.icindekiler = icindekiler;
      tarifModel.adimlar.push(adimModel);
    }
  }
  return tarifModel;
}

module.exports = {
  idyeGoreTarifGetir,
};
