import { delay } from '@/utils/helpers'

const mockDocuments = [
  {
    Id: 1,
    userId: "1",
    type: "resume",
    templateId: 1,
    name: "Software Engineer Resume",
    content: {
      position: "Software Engineer",
      industry: "Technology",
      skills: "JavaScript, React, Node.js, Python"
    },
    generatedUrl: "#",
    status: "completed",
    createdAt: new Date().toISOString()
  },
  {
    Id: 2,
    userId: "1",
    type: "cover-letter",
    templateId: 4,
    name: "Google Cover Letter",
    content: {
      company: "Google",
      position: "Product Manager",
      motivation: "Passionate about creating user-centered products that make a difference"
    },
    generatedUrl: "#",
    status: "completed",
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
]

let documents = [...mockDocuments]

const documentService = {
  async getAll() {
    await delay(400)
    return [...documents]
  },

  async getById(id) {
    await delay(300)
    const document = documents.find(d => d.Id === parseInt(id))
    if (!document) {
      throw new Error('Document not found')
    }
    return { ...document }
  },

  async getByUserId(userId) {
    await delay(300)
    return documents.filter(d => d.userId === userId)
  },

  async create(documentData) {
    await delay(1500) // Simulate document generation time
    const newDocument = {
      Id: Math.max(...documents.map(d => d.Id), 0) + 1,
      ...documentData,
      status: "completed",
      generatedUrl: "#",
      createdAt: new Date().toISOString()
    }
    documents.push(newDocument)
    return { ...newDocument }
  },

  async update(id, documentData) {
    await delay(500)
    const index = documents.findIndex(d => d.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Document not found')
    }
    
    documents[index] = { ...documents[index], ...documentData, updatedAt: new Date().toISOString() }
    return { ...documents[index] }
  },

  async delete(id) {
    await delay(300)
    const index = documents.findIndex(d => d.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Document not found')
    }
    
    documents.splice(index, 1)
    return true
  }
}

export default documentService