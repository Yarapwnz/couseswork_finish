module.exports = (sequelize, Sequelize) => {
  const Impresario = sequelize.define("impresario", {
    full_name: {
      type: Sequelize.STRING
    },
    age: {
      type: Sequelize.STRING
    },
    genre: {
      type: Sequelize.STRING
    }
  });

  return Impresario;
};
