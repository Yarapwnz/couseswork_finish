module.exports = (sequelize, Sequelize) => {
  const Events = sequelize.define("event", {
    name: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.STRING
    },
    philharmonic: {
      type: Sequelize.STRING
    },
    artist: {
      type: Sequelize.STRING
    },
    impresario: {
      type: Sequelize.STRING
    }
  });

  return Events;
};
