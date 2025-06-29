import { delay } from '@/utils/helpers'

const mockAnalyses = [
  {
    Id: 1,
    userId: "1",
    responses: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      education: "Master's Degree",
      experience: "8",
      skills: "Product Management, User Research, Data Analysis, Leadership, Strategy",
      interests: "Technology, Healthcare, Sustainability",
      goals: "Lead product teams at innovative companies, mentor junior PMs"
    },
    strengths: ["Leadership", "Strategic Thinking", "User-Centered Design", "Data-Driven Decision Making"],
    values: ["Innovation", "Collaboration", "Impact", "Growth"],
    completedAt: new Date().toISOString()
  }
]

let analyses = [...mockAnalyses]

const analysisService = {
  async getAll() {
    await delay(400)
    return [...analyses]
  },

  async getById(id) {
    await delay(300)
    const analysis = analyses.find(a => a.Id === parseInt(id))
    if (!analysis) {
      throw new Error('Analysis not found')
    }
    return { ...analysis }
  },

  async getByUserId(userId) {
    await delay(300)
    return analyses.filter(a => a.userId === userId)
  },

  async create(analysisData) {
    await delay(1000) // Simulate AI processing time
    const newAnalysis = {
      Id: Math.max(...analyses.map(a => a.Id), 0) + 1,
      ...analysisData,
      completedAt: new Date().toISOString()
    }
    analyses.push(newAnalysis)
    return { ...newAnalysis }
  },

  async update(id, analysisData) {
    await delay(500)
    const index = analyses.findIndex(a => a.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Analysis not found')
    }
    
    analyses[index] = { ...analyses[index], ...analysisData, updatedAt: new Date().toISOString() }
    return { ...analyses[index] }
  },

  async delete(id) {
    await delay(300)
    const index = analyses.findIndex(a => a.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Analysis not found')
    }
    
    analyses.splice(index, 1)
    return true
  }
}

export default analysisService