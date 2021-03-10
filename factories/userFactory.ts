import faker from 'faker'

import User from 'Src/models/User'

interface UserProperties extends Partial<User> {
  password?: string
}

export default async (userProperties: UserProperties = {}): Promise<User> => {
  const user = new User()
  user.id = userProperties.id
  user.name = userProperties.name || faker.name.findName()
  user.email = userProperties.email || faker.internet.email()
  user.createdAt = userProperties.createdAt
  user.updatedAt = userProperties.updatedAt

  if (!!userProperties.password)
    user.setPassword(userProperties.password)
  else
    user.setPassword(faker.lorem.slug(3))

  return user.save()
}
