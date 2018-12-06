import mongoose from 'mongoose' // Permite criar um template para estruturação e validação dos dados

// Create a schema to better deal with data
const icePopsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome não pode ficar vazio'], // Servidor irá rejeitar nomes vazios
    trim: true
  },
  qtty_sells: {
    type: Number,
    required: true,
    default: 0 // Servidor irá automaticamente incluir valor como 0
  },
  created: {
    type: Date,
    required: true,
    default: Date.now // Servidor irá automaticamente incluir a data atual
  },
  wasDeleted: {
    type: Boolean,
    required: true,
    default: false // Servidor irá automaticamente incluir valor como false
  }
})

const IcePops = mongoose.model('IcePops', icePopsSchema)

export default IcePops
