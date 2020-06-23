module.exports = (sequelize, Sequelize) => {
  const Artist = sequelize.define("artist", {
    full_name: {
      type: Sequelize.STRING
    },
    age: {
      type: Sequelize.STRING
    },
    genre: {
      type: Sequelize.STRING
    },
    impresario: {
      type: Sequelize.STRING
    }
  });

  return Artist;
};
