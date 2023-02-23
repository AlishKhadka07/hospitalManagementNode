module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.ENUM("admin", "user","hospital"),
        defaultValue : "user"
         
      },
      password: {
        type: Sequelize.STRING,
      },
    });
  
    return User;
  };
  