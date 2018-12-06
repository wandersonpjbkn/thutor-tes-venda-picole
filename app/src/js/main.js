import '@babel/polyfill' // lidar com async/await
import axios from 'axios' // Para fazer as requisições ao servidor
import UIkit from 'uikit' // Para invocar os componentes da biblioteca do UIKit
import Icons from 'uikit/dist/js/uikit-icons' // Para usar o icones do UIKit

UIkit.use(Icons)

// eslint-disable-next-line
const app = new Vue({

  // Elemento que o Vue irá controlar
  el: '#app',

  // Dados que o Vue irá manipular
  // Detalhes no link: https://vuejs.org/v2/guide/instance.html#Data-and-Methods
  data: {
    editMode: false,
    isLoading: true,
    enableToInsert: true,
    serverHost: 'http://localhost:5000/ice-pops/',
    title: 'Venda de Picolés',
    listProducts: []
  },

  // Vue trabalha com 'lifehooks' / 'ciclos de vida'
  // Detalhes no link: https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks
  mounted () {
    this.getProducts()
  },

  methods: {

    /**
     * Lança um alerta na base da tela
     * @param {String} text Texto que será exibido
     */
    thowMessage (text) {
      UIkit.notification.closeAll()
      UIkit.notification({
        message: `<div class="uk-text-center">${text}</div>`,
        pos: 'bottom-center'
      })
    },

    /**
     * Desabilita a aplicação de continuar salvando
     * devido à natureza do erro indicar que não é possível se comunicar com o servidor
     */
    requestServerFailed () {
      this.enableToInsert = false
      this.listProducts.push({
        empty: true,
        message: 'Falha na solicitação ao servidor :('
      })
    },

    /**
     * Desabilita o loading se ainda não tiver sido
     */
    disableLoading () {
      if (this.isLoading) {
        this.isLoading = false
      }
    },

    /**
     * Altera os controles no modo de edição
     * @param {Number} index Indice do item para edição
     */
    editItem (index) {
      const item = this.$refs.itemToEdit[index]
      const btn1 = this.$refs.btnEdit[index]
      const btn2 = this.$refs.btnClose[index]
      const btn3 = this.$refs.btnSave[index]

      item.disabled = !item.disabled

      if (!item.disabled) {
        btn1.style = 'display: none'
        btn2.style = 'display: block'
        btn3.style = 'display: block'
      } else {
        btn1.style = 'display: block'
        btn2.style = 'display: none'
        btn3.style = 'display: none'

        // Na saída da edição do item
        // Se o nome do produto estiver vazio
        // Retorna o valor original
        if (item.value === '') {
          item.value = this.listProducts[index].name
        }
      }
    },

    /**
     * Salva as alterações de volta à listagem
     * somente quando o valor não for nulo
     * @param {Number} index Indice do item para edição
     */
    saveValueOnChange (index, event) {
      event.target.value !== '' &&
       (this.listProducts[index].name = event.target.value)
    },

    /**
     * Adiciona um novo item
     */
    async addProduct () {
      const item = this.$refs.newProduct

      // Se o nome for vazio ou menor que três, lança um alerta e para a função
      if (!item.value || item.value.length < 3) return this.thowMessage('Nome inválido')

      try {
        const response = await axios.post(this.serverHost, { name: item.value })

        response.status === 201
          ? this.getProducts()
          : this.thowMessage(response.data.message)

        item.value = ''
      } catch (err) {
        this.requestServerFailed()
      }
    },

    /**
     * Lista os produtos
     */
    async getProducts () {
      try {
        const response = await axios.get(this.serverHost)

        this.disableLoading()
        this.listProducts = response.data

        response.status === 200
          ? console.log('Requisição efetuada com sucesso')
          : console.error.bind(response.data, 'Error: ')
      } catch (err) {
        this.disableLoading()
        this.requestServerFailed()
      }
    },

    /**
     * Altera o nome do produto
     * @param {Number} index Indice do item para edição
     */
    async updateProduct (index) {
      const item = this.$refs.itemToEdit[index]

      // Se o nome for vazio, menor que três ou não tiver alteração
      // Para a função a lança um alerta
      if (!item.value || item.value.length < 3) return this.thowMessage('Nome inválido')

      const id = this.listProducts[index]._id

      console.log(item)

      try {
        const response = await axios.put(`${this.serverHost}${id}`, { name: item.value })

        if (response.status === 200) {
          this.thowMessage('Nome alterado')
          this.getProducts()
        } else {
          this.thowMessage(response.data.message)
        }

        // Fecha a caixa de edição do item em questão
        this.editItem(index)
      } catch (err) {
        this.requestServerFailed()
      }
    },

    /**
     * Remove um item da listagem
     * @param {Number} index Indice do item para edição
     */
    deleteProduct (index) {
      // Solicita conformação da ação
      UIkit.modal.confirm('Você realmente deseja remover este produto?')
        .then(async () => {
          const id = this.listProducts[index]._id

          try {
            const response = await axios.put(`${this.serverHost}delete/${id}`)

            if (response.status === 200) {
              this.thowMessage('Produto removido')
              this.getProducts()
            } else {
              this.thowMessage(response.data.message)
            }
          } catch (err) {
            this.requestServerFailed()
          }
        }, () => {
          // Se não confirmada, só lança um alerta notificando
          this.thowMessage('Ação cancelada')
        })
    },

    /**
     * Incrementa a quantidad de itens vendidos
     * @param {Number} index Indice do item para edição
     */
    async sellProduct (index) {
      const id = this.listProducts[index]._id
      const qtty = this.listProducts[index].qtty_sells + 1

      try {
        const response = await axios.put(`${this.serverHost}${id}`, { qtty_sells: qtty })

        if (response.status === 200) {
          this.getProducts()
        } else {
          this.thowMessage(response.data.message)
        }
      } catch (err) {
        this.requestServerFailed()
      }
    }

  }
})
