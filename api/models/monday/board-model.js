module.exports = function(sequelize, DataTypes) {
    return sequelize.define('board', {
          boardId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
          },
          boardName: {
            type: DataTypes.STRING(200),
            allowNull: true
          }
        }, 
        {
          timestamps: false
        }, 
        {
          tableName: 'boards'
        });
  };