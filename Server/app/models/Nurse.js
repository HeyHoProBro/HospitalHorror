/*jslint node: true */
'use strict';

const Sequelize = require('sequelize');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
	let Nurse = sequelize.define('Nurse', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		firstname: DataTypes.STRING,
		lastname: DataTypes.STRING,
		dateofbirth: DataTypes.DATEONLY,
		phone: DataTypes.STRING,
		email: DataTypes.STRING,
		image: DataTypes.STRING,
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.fn('NOW')
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.fn('NOW')
		}
	}, {
		tableName: 'Nurse',
		timestamps: true,
		getterMethods: {
			fullname: function() {
				return this.firstname + ' ' + this.lastname;
			},
			age: function() {
				return moment().diff(this.dateofbirth, 'years');
			},
			dateofbirth_formatted: function() {
				return moment(this.dateofbirth).format('Do MMM YYYY');
			}
		}
	});


	Nurse.associate = function(models) {
		models.Nurse.belongsTo(models.User);
	};

	return Nurse;
};
