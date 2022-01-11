const tsconfig = require('./tsconfig.json')
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig)

module.exports = {
  testTimeout : 10000,
  testEnvironment: 'node',
  preset: 'ts-jest',
  moduleNameMapper
}
