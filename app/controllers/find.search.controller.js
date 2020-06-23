const db = require("../models");
const Event = db.events;
const Artist = db.artists;
const Impresario = db.impresarios;
const Philharmonic = db.philharmonics;
const Op = db.Sequelize.Op;

exports.findAll = async (req, res) => {
  const searchWord = req.query.searchWord;

  var conditionEvent = searchWord ? {
    [Op.or]: [
    {name: { [Op.like]: '%' + searchWord + '%'} },
    {date: { [Op.like]: '%' + searchWord + '%' } },
    {philharmonic: { [Op.like]: '%' + searchWord + '%'} },
    {artist: { [Op.like]: '%' + searchWord + '%' } },
    {impresario: { [Op.like]: '%' + searchWord + '%' } }
  ]
  } : null;

  var conditionArtist = searchWord ? {
    [Op.or]: [
    {full_name: { [Op.like]: '%' + searchWord + '%'} },
    {age: { [Op.like]: '%' + searchWord + '%' } },
    {genre: { [Op.like]: '%' + searchWord + '%'} },
    {impresario: { [Op.like]: '%' + searchWord + '%' } }
  ]
  } : null;

  var conditionImpresario = searchWord ? {
    [Op.or]: [
    {full_name: { [Op.like]: '%' + searchWord + '%'} },
    {age: { [Op.like]: '%' + searchWord + '%' } },
    {genre: { [Op.like]: '%' + searchWord + '%'} }
  ]
  } : null;

  var conditionPhilharmonic = searchWord ? {
    [Op.or]: [
    {name: { [Op.like]: '%' + searchWord + '%'} },
    {type: { [Op.like]: '%' + searchWord + '%' } },
    {address: { [Op.like]: '%' + searchWord + '%'} },
    {characteristics: { [Op.like]: '%' + searchWord + '%'} }
    ]
  } : null;

  const events = await Event.findAll({ where: conditionEvent })
  const artists = await Artist.findAll({ where: conditionArtist })
  const impresarios = await Impresario.findAll({ where: conditionImpresario })
  const philharmonics = await Philharmonic.findAll({ where: conditionPhilharmonic })


  return res.json({
    events,
    artists,
    impresarios,
    philharmonics
  })
};
