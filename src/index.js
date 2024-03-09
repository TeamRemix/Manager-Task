import app from './app.js'
import router from './routes/task.routes.js'

async function main() {
  app.use(router)

  app.listen(app.get('port'))

  console.log(
    `server runnign on port ${app.get('port')} http://localhost:4600/main`
  )
}

main()
