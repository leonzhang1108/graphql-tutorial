const http = require('http')
const https = require('https')
const Koa = require('koa')
const schema = require('./data/schema.js')
const KoaRouter = require('koa-router')
const KoaBody = require('koa-bodyparser')
const { graphqlKoa, graphiqlKoa } = require('graphql-server-koa')

const port = 8000

const router = new KoaRouter()

const app = new Koa()

app.use(KoaBody())

router.get('/api/test', function (ctx, next) {
  ctx.body = { data: "this is api" }
})

router.post('/graphql', KoaBody(), graphqlKoa({ schema }))

// router.post('/graphql', graphqlKoa(ctx => ({schema, context: ctx.request})))
router.get('/graphql', graphqlKoa({ schema }))

router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))

app.use(router.routes())
app.use(router.allowedMethods())


const httpServer = http.Server(app.callback())
httpServer.listen(port, err => console.log(err || `Server started on port ${port}`))