import createDbConnection from 'Src/config/createDbConnection'
import app from 'Src/app'

const PORT = process.env.PORT || 8080
const ENV = process.env.NODE_ENV || 'production'

createDbConnection
  .then(async connection => {
    app.listen(PORT, () => {
      console.info(`\nServer running on environment ${ENV} and listening on port ${PORT}\n`)
    }).on('close', async () => {
      await connection.close()
    })
  })
  .catch(error => console.error(error))
