import { Connection } from 'typeorm'

export default async (dbConnection: Connection): Promise<void> => {
  // Model names to drop in order of dependency
  const entities = ['User']

  for (const entity of entities) {
    const repository = dbConnection.getRepository(entity)
    await repository.delete({})
  }
}
