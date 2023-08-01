import  Sequelize, { Model } from 'sequelize';

class InputFile extends Model {
  static init(sequelize) {
    super.init(
      {
        type: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        product: {
          type: Sequelize.STRING(70),
          allowNull: false,
        },
        amount: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        seller: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
      }
    );
    this.addHook("beforeSave", async (inputfile) => {
   
    });
  }
}

export default InputFile;