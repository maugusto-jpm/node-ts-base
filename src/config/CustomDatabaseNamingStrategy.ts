import { DefaultNamingStrategy } from 'typeorm'
import { snakeCase } from 'typeorm/util/StringUtils'
import pluralize from 'pluralize'

export default class CustomDatabaseNamingStrategy extends DefaultNamingStrategy {
  tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName || snakeCase(pluralize(targetName))
  }

  columnName(
    propertyName: string,
    customName: string | undefined,
    embeddedPrefixes: string[]): string {
    return snakeCase(embeddedPrefixes.join('_')) + (customName || snakeCase(propertyName))
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName)
  }

  joinColumnName(relationName: string, referencedColumnName: string): string {
    return snakeCase(pluralize.singular(relationName) + '_' + referencedColumnName)
  }

  joinTableName(
    firstTableName: string,
    secondTableName: string): string {
    return snakeCase(firstTableName + '_' + secondTableName)
  }

  joinTableColumnName(tableName: string, propertyName: string, columnName?: string): string {
    return snakeCase(pluralize.singular(tableName) + '_' + (columnName || propertyName))
  }
}
