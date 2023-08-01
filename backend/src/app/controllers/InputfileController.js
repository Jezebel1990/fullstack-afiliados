import Inputfile from '../models/Inputfile';


// Função para criar um novo registro na tabela "inputfiles"

const InputfileController = {
async create (req, res) {
  try {
    const { type, date, product, amount, seller } = req.body;

    // Cria o novo registro no banco de dados;

     const newInputFile = await Inputfile.create({
      type,
      date,   
      product,
      amount,
      seller,
     });

        // Retorna uma resposta de sucesso
        return res.status(204).json();
      } catch (error) {
        return res.status(500).json({ error: 'Erro ao excluir o arquivo de entrada.' });
      }
    },

async getAll(req, res) {
  try {
    // Obtém todos os registros da tabela InputFile
    const inputFiles = await Inputfile.findAll();

    // Retorna os registros como resposta
    return res.status(200).json(inputFiles);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao obter os arquivos de entrada.' });
  }
},

async getById(req, res) {
  try {
    // Obtém o id do arquivo de entrada a partir dos parâmetros da requisição
    const { id } = req.params;

    // Busca o registro pelo id no banco de dados
    const inputFile = await Inputfile.findByPk(id);

    // Verifica se o registro foi encontrado
    if (!inputFile) {
      return res.status(404).json({ error: 'Arquivo de entrada não encontrado.' });
    }

    // Retorna o registro como resposta
    return res.status(200).json(inputFile);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao obter o arquivo de entrada.' });
  }
},

async update(req, res) {
  try {
    // Obtém o id do arquivo de entrada a partir dos parâmetros da requisição
    const { id } = req.params;

    // Extrai os dados do corpo da requisição
    const { type, date, product, amount, seller } = req.body;

    // Busca o registro pelo id no banco de dados
    const inputFile = await Inputfile.findByPk(id);

    // Verifica se o registro foi encontrado
    if (!inputFile) {
      return res.status(404).json({ error: 'Arquivo de entrada não encontrado.' });
    }

        // Atualiza os dados do registro
        inputFile.type = type;
        inputFile.date = date;
        inputFile.product = product;
        inputFile.amount = amount;
        inputFile.seller = seller;
        await inputFile.save();
  
        // Retorna o registro atualizado como resposta
        return res.status(200).json(inputFile);
      } catch (error) {
        return res.status(500).json({ error: 'Erro ao atualizar o arquivo de entrada.' });
      }
    },
  
    async delete(req, res) {
      try {
        // Obtém o id do arquivo de entrada a partir dos parâmetros da requisição
        const { id } = req.params;
  
        // Busca o registro pelo id no banco de dados
        const inputFile = await Inputfile.findByPk(id);
  
        // Verifica se o registro foi encontrado
        if (!inputFile) {
          return res.status(404).json({ error: 'Arquivo de entrada não encontrado.' });
        }
  
        // Remove o registro do banco de dados
        await inputFile.destroy();
  
        // Retorna uma resposta de sucesso
        return res.status(204).json();
      } catch (error) {
        return res.status(500).json({ error: 'Erro ao excluir o arquivo de entrada.' });
      }
    },
  };



export default InputfileController;