const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Cocktail', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        season: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        taste: {
            type: DataTypes.STRING,
            allowNull: false
        },
        glassware: {
            type: DataTypes.STRING,
            allowNull: false
        },
        method: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ingredients: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        instructions: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: 'User',
                key: 'id'
            }
        }
    },
    { freezeTableName: true, timestamps: false });
};
