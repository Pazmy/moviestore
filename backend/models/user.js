"use strict";
const { encrypt } = require("../helper/bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: { notEmpty: "name cant be empty" },
      },
      email: {
        type: DataTypes.STRING,
        validate: { notEmpty: "email cant be empty" },
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        validate: { notEmpty: "password cant be empty" },
      },
      role: { type: DataTypes.STRING, defaultValue: "customer" },
      avatarpath: DataTypes.STRING,
      gender: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          if (!user.password) {
          } else {
            user.password = encrypt(user.password);
          }
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
