import express from 'express'
import pkg from '@prisma/client'
import cors from 'cors'
const { PrismaClient } = pkg

const prisma = new PrismaClient()
const PORT = 3000
const app = express()
const users = []

app.use(express.json())
app.use(cors())

app.post('/users', async (req, res) => {
    await prisma.user.create({
        data: {
            name: req.body.name,
            age: req.body.age ? parseInt(req.body.age) : undefined,
            email: req.body.email,
        }
    })
    res.status(201).json(req.body)
})

app.put('/users/:id', async (req, res) => {
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name,
            age: req.body.age ? parseInt(req.body.age) : undefined,
            email: req.body.email,
        }
    })
    res.status(201).json(req.body)
})

app.get('/users', async (req, res) => {

    let users = []

    if (req.query) {

    
       users = await prisma.user.findMany({
        where: {
            name: req.query.name,
            age: req.query.age ? parseInt(req.query.age) : undefined,
            email: req.query.email,
       }

    })
 } else {
    users = await prisma.user.findMany()

    }

    res.status(200).json(users)
})

app.delete('/users/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({message: 'Usuário deletado com sucesso!'})
})

app.listen(PORT)
console.log(`O servidor está rodando na porta ${PORT}`)