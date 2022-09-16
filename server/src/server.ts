import express from 'express'

const app = express()

app.get('/ads', (req, res) => {
  return res.json([
    {id: 1, name: 'Anúncio 1'},
    {id: 2, name: 'Anúncio 2'},
    {id: 3, name: 'Anúncio 3'},
    { id: 4, name: 'Anúncio 4' },
  ])
})

app.listen(3333, () => {
  console.log('Rodando server na porta 3333 🚀')
})