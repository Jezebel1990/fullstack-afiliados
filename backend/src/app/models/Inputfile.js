import  Sequelize, { Model } from "sequelize";

class InputFile extends Model {
  static init(sequelize) {
    super.init(
      {
        type: DataTypes.INTEGER,
        date: DataTypes.DATE,
        product: DataTypes.STRING(70),
        amount: DataTypes.DECIMAL(10, 2),
        seller: DataTypes.STRING(50),
      },
      {
        sequelize,
      }
    );
    this.addHook("beforeSave", async (inputfile) => {
      
    });
  }
}

InputFile.init(sequelize);

export default InputFile;

