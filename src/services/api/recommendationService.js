import { delay } from '@/utils/helpers'

const mockRecommendations = [
  {
    Id: 1,
    userId: "1",
    type: "Job Role",
    title: "Senior Product Manager",
    company: "Google",
    location: "San Francisco, CA",
    salary: "$150,000 - $200,000",
    matchScore: 92,
    reasons: [
      "Strong background in product management",
      "Experience with cross-functional teams",
      "Technical skills align with requirements",
      "Leadership experience matches role needs"
    ]
  },
  {
    Id: 2,
    userId: "1",
    type: "Job Role",
    title: "Data Science Manager",
    company: "Microsoft",
    location: "Seattle, WA",
    salary: "$140,000 - $180,000",
    matchScore: 88,
    reasons: [
      "Advanced analytics background",
      "Team management experience",
      "Machine learning expertise",
      "Strategic thinking skills"
    ]
  }
]

let recommendations = [...mockRecommendations]

const recommendationService = {
  async getAll() {
    await delay(400)
    return [...recommendations]
  },

  async getById(id) {
    await delay(300)
    const recommendation = recommendations.find(r => r.Id === parseInt(id))
    if (!recommendation) {
      throw new Error('Recommendation not found')
    }
    return { ...recommendation }
  },

  async getByUserId(userId) {
    await delay(300)
    return recommendations.filter(r => r.userId === userId)
  },

  async create(recommendationData) {
    await delay(500)
    const newRecommendation = {
      Id: Math.max(...recommendations.map(r => r.Id), 0) + 1,
      ...recommendationData,
      createdAt: new Date().toISOString()
    }
    recommendations.push(newRecommendation)
    return { ...newRecommendation }
  },

  async update(id, recommendationData) {
    await delay(500)
    const index = recommendations.findIndex(r => r.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Recommendation not found')
    }
    
    recommendations[index] = { ...recommendations[index], ...recommendationData, updatedAt: new Date().toISOString() }
    return { ...recommendations[index] }
  },

  async delete(id) {
    await delay(300)
    const index = recommendations.findIndex(r => r.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Recommendation not found')
    }
    
    recommendations.splice(index, 1)
    return true
  }
}

export default recommendationService