module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Clients', {
    Client_Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    ClientType: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    SorlingasClient: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    IndirectClient: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    NonSorlingasCell: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    ENCProvider: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Conglomerate: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Contact: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, 
  {
    timestamps: false
  }, 
  {
    tableName: 'Clients'
  });
};