import { createConnection } from 'typeorm'

import TypeOrmConfig from './TypeOrmConfig'

export default createConnection(TypeOrmConfig)
