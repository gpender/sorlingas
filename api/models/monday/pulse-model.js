module.exports = function(sequelize, DataTypes) {
    return sequelize.define('pulse', {
        pulseId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
          },
          boardId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
          },
          pulseName: {
            type: DataTypes.STRING(200),
            allowNull: true
          }
        }, 
        {
          timestamps: false
        }, 
        {
          tableName: 'pulses'
        });
  };