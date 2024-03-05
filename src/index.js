import app from './app.js'

async function main() {
  app.listen(app.get('port'))

  console.log(`server runnign on port ${app.get('port')}`)
}

main()
