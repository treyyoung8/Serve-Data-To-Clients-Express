const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

var data = [
    {id: 1, make: "Ford", model: "Shelby GT500"},
    {id: 2, make: "BMW", model: "M3"},
    {id: 3, make: "Chevrolet", model: "Corvette ZR1"},
    {id: 4, make: "Jeep", model: "Grand Cherokee SRT8"},
    {id: 5, make: "Saleen", model: "S7"},
    {id: 6, make: "Dodge", model: "Viper ACR"},
    {id: 7, make: "Mercedes", model: "SLS AMG Black Series"},
    {id: 8, make: "Ferrari", model: "FXX-K"},
    {id: 9, make: "Lamborghini", model: "Veneno"},
    {id: 10, make: "Porsche", model: "959S"},
    {id: 11, make: "Mclaren", model: "F1"},
    {id: 12, make: "Ford", model: "GT"}
]

app.use(bodyParser.json())

app.get('/', (req, res, next) => {
    res.send({ data })
})

// app.get('/:id', (req, res, next) => {
//     var { id } = req.params
//     var filtered = data.filter(obj => {
//         return obj.id == id
//     })
//     res.send({ data: filtered })
// })

app.get('/:id', (req, res, next) => {
    let { id } = req.params
    let filtered = data.filter(obj => obj.id == id)
    if (!filtered.length) {
        res.status(404).send({ message: 'ERRORRRRRRRR YOU DONE MESSED UP MAN!!!!!' })
    } else {
        res.send({ data: filtered[0] })
    }
})

// app.use('/', (req, res, next) => {
//     let { id } = req.params
//     let filtered = data.filter(obj => obj.id == id)
//     if (!filtered.length) {
//         res.status(500).send({ message: 'Bruh, you really broken\'ed\'d it!' })
//     } else {
//         res.send({ data: filtered[0] })
//     }
// })


app.post('/', (req, res, next) => {
    var { body } = req
    var newObj = {
        id: data.length + 1,
        make: body.make,
        model: body.model
    }
    data.push(newObj)
    res.send({ data: newObj })
})

app.put('/:id', (req, res, next) => {
    var { id } = req.params
    var { body } = req
    var newArr = data.map(obj => {
        if (id == obj.id){
            obj.make = body.make
            obj.model = body.model
        }
        return obj
    })
    data = newArr
    res.send({ data })
})

app.delete('/:id', (req, res, next) => {
    var { id } = req.params
    var newArr = data.map(obj => {
        if (id == obj.id){
            delete obj.id
            delete obj.make
            delete obj.model
            return "DELETED"
        }
        return obj
    })
    data = newArr
    res.send({ data })
})

app.listen(port)