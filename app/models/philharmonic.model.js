module.exports = (sequelize, Sequelize) => {
  const Philharmonic = sequelize.define("philharmonic", {
    name: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    characteristics: {
      type: Sequelize.STRING
    }
  });

  return Philharmonic;
};
