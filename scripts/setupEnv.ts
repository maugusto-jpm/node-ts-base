import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import { resolve } from 'path'

dotenvExpand(dotenv.config({ path: resolve(__dirname, '../.env') }))
