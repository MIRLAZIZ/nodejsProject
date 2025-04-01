const request = require('supertest')
const Book = require('../../moduls/books')
const User = require('../../moduls/users')
let server

describe('books ', () => {

    beforeEach(() => {
        server = require('../../index')
    })
    afterEach(async () => {
        await server.close()
        await Book.deleteMany()

    })
    describe('Get /', () => {

        it('barcha kitoblarga sorov yuborish', async () => {
            await Book.collection.insertMany([
                { title: 'test1' },
                { title: 'test2' },
                { title: 'test3' },

            ])
            const response = await request(server).get('/books')
            expect(response.status).toBe(200)
            expect(response.body.length).toBe(3)




        })
    })


    describe('Get /:id', () => {

        it('kitobni id si bo\'yicha so\'rov yuborish', async () => {

            let book = new Book({ title: 'Ai', author: 'test' })
            await book.save()


            const response = await request(server).get('/books/' + book._id)
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('title', 'Ai')




        })

        it('kitobni id si notg\'ri id berib 404 qaytishini tekshirish', async () => {




            const response = await request(server).get('/books/123')
            expect(response.status).toBe(404)




        })
    })



    describe('Post', () => {
        let token;
        let title;

        const execute = async () => {
            return await request(server).post('/books').set('x-auth-token', token).send(title)
        }

        beforeEach(() => {
            token = new User({isAdmin:true}).generetToken()
            title = {
                title: 'dasturlash',
                author:'test',
            }
        })



        it('kitob nomi bo\'lmasa  400 qaytarishi kerak', async () => {

            title = ''
            const response = await execute()
            expect(response.status).toBe(400)


        })

        it('kitob bazada bo\'lasa success', async () => {

            const book = await Book.find({ title: 'dasturlash' })

            expect(book).not.toBeNull()


        })

        it('hamma malumotlar to\'liq bo\'lsa', async () => {

            const response = await execute()
            // console.log(response)
            expect(response.body).toHaveProperty('_id')

            expect(response.body).toHaveProperty('title', 'dasturlash')

        }) 

        it('token  bo\'lmasa 401 qaytarishi kerak', async () => {

            token = ''
            const response = await execute()
            expect(response.status).toBe(401)
        })
    })
}) 