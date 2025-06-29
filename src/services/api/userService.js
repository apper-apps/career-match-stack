import { delay } from '@/utils/helpers'

const mockUsers = [
  {
    Id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Experienced product manager with a passion for creating user-centered solutions.",
    language: "en",
    selfAnalysisComplete: true,
    currentStatus: "active"
  }
]

let users = [...mockUsers]

const userService = {
  async getAll() {
    await delay(300)
    return [...users]
  },

  async getById(id) {
    await delay(300)
    const user = users.find(u => u.Id === parseInt(id))
    if (!user) {
      throw new Error('User not found')
    }
    return { ...user }
  },

  async create(userData) {
    await delay(500)
    const newUser = {
      Id: Math.max(...users.map(u => u.Id), 0) + 1,
      ...userData,
      createdAt: new Date().toISOString()
    }
    users.push(newUser)
    return { ...newUser }
  },

  async update(id, userData) {
    await delay(500)
    const index = users.findIndex(u => u.Id === parseInt(id))
    if (index === -1) {
      throw new Error('User not found')
    }
    
    users[index] = { ...users[index], ...userData, updatedAt: new Date().toISOString() }
    return { ...users[index] }
  },

  async delete(id) {
    await delay(300)
    const index = users.findIndex(u => u.Id === parseInt(id))
    if (index === -1) {
      throw new Error('User not found')
    }
    
    users.splice(index, 1)
    return true
  }
}

export default userService