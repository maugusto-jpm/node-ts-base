import type { Config } from '@jest/types'
import { defaults } from 'jest-config'
import { resolve } from 'path'
import mapper from 'jest-module-name-mapper'

export default {
  preset: 'ts-jest',
  testRegex: '.*\.(test\.ts)',
  maxWorkers: 1,
  globalSetup: resolve(__dirname, './scripts/setupTestEnv.ts'),
  moduleNameMapper: mapper(resolve(__dirname, './tsconfig.json')),
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
} as Config.InitialOptions
