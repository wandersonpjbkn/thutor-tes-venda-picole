import icePops from './../model'

// Insere um novo item
const addIcePops = (req, res, next) => {
  const promise = icePops.create({
    name: req.body.name
  })

  promise
    .then(data => {
      res
        .status(201)
        .send(data)
    })
    .catch(err => {
      res
        .status(400)
        .send(err.errors['name'].message)
    })
}

// Retorna uma lista de item que tenham a opção 'wasDeleted' como falsa
// Ou retorna um objeto indicando que não localizou nada
const listIcePops = (req, res, next) => {
  const promise = icePops.find({
    wasDeleted: false
  },
  '_id name qtty_sells')

  promise
    .then(data => {
      const resul = !data[0]
        ? {
          empty: true,
          message: 'Sem produtos cadastrados'
        }
        : data

      res
        .status(200)
        .send(resul)
    })
    .catch(err => {
      res
        .status(404)
        .send(err)
    })
}

// Atualiza um item
const updateIcePops = (req, res, next) => {
  const promise = icePops.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  )

  promise
    .then(data => {
      res
        .status(200)
        .send(data)
    })
    .catch(err => {
      res
        .status(404)
        .send(err.errors)
    })
}

// Atualiza um item, alterando a opção 'wasDeleted' para verdadeiro
const deleteIcePops = (req, res, next) => {
  const promise = icePops.findOneAndUpdate(
    { _id: req.params.id },
    { wasDeleted: true },
    { new: true }
  )

  promise
    .then(data => {
      res
        .status(200)
        .send(data)
    })
    .catch(err => {
      res
        .status(404)
        .send(err.errors)
    })
}

// Exclui em definitivo um item do banco
const permaDeleteIcePops = (req, res, next) => {
  const promise = icePops.findOneAndDelete({
    _id: req.params.id
  })

  promise
    .then(data => {
      res
        .status(200)
        .send(data)
    })
    .catch(err => {
      res
        .status(404)
        .send(err.errors)
    })
}

export default {
  addIcePops,
  listIcePops,
  updateIcePops,
  deleteIcePops,
  permaDeleteIcePops
}
