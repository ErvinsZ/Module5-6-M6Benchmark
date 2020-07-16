const orm = require("../../../db")
const  Sequelize  = require("sequelize")
const Project = require("../projects")

const Student = orm.define("students", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dob: {
        type: Sequelize.DATE,
        allowNull: false
    }, 
    
   },{   timestamps: false
})

Student.hasMany(Project, {
    foreignKey: "studentid"
})



module.exports = Student