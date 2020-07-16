const Sequelize  = require("sequelize")
const { NUMBER, STRING, DATE } = require("sequelize")
const orm = require("../../../db")

const Project = orm.define("projects", {
    id: {
        type: NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
    
    name: {
        type: STRING,
        allowNull: false
    },
    description: {
        type: STRING,
        allowNull: false
    },
    creationdate: {
        type: DATE,
        allowNull: false
    },
    repourl: {
        type: STRING,
        allowNull: false
    },
    liveurl: {
        type: STRING,
        allowNull: false
    },
    studentid: {
        type: NUMBER,
        allowNull: false
    },
}, {
    timestamps: false
})

module.exports = Project