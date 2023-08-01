import InputFile from "../models/inputfile";

// Função para criar um novo registro na tabela "inputfiles"
async function createInputFile(req, res) {
  try {
    const { type, date, product, amount, seller } = req.body;

    // Cria o novo registro na tabela "inputfiles"
    const newInputFile = await InputFile.create({
      type,
      date,
      product,
      amount,
      seller,
    });

    res.status(201).json(newInputFile);
  } catch (error) {
    console.error('Erro ao criar registro:', error);
    res.status(500).json({ message: 'Erro ao criar registro' });
  }
}


export default {
  createInputFile,
};
