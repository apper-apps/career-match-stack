import { delay } from '@/utils/helpers'

const mockApplications = [
  {
    Id: 1,
    userId: "1",
    companyName: "Google",
    position: "Senior Product Manager",
    status: "interview",
    appliedDate: new Date(Date.now() - 86400000 * 7).toISOString(),
    deadline: new Date(Date.now() + 86400000 * 14).toISOString(),
    nextStep: "Technical interview scheduled for next Tuesday at 2 PM",
    notes: "Applied through referral, spoke with hiring manager"
  },
  {
    Id: 2,
    userId: "1",
    companyName: "Microsoft",
    position: "Data Science Manager",
    status: "screening",
    appliedDate: new Date(Date.now() - 86400000 * 10).toISOString(),
    deadline: new Date(Date.now() + 86400000 * 7).toISOString(),
    nextStep: "Waiting for HR screening call",
    notes: "Strong fit based on job description"
  }
]

let applications = [...mockApplications]

const applicationService = {
  async getAll() {
    await delay(400)
    return [...applications]
  },

  async getById(id) {
    await delay(300)
    const application = applications.find(a => a.Id === parseInt(id))
    if (!application) {
      throw new Error('Application not found')
    }
    return { ...application }
  },

  async getByUserId(userId) {
    await delay(300)
    return applications.filter(a => a.userId === userId)
  },

  async create(applicationData) {
    await delay(500)
    const newApplication = {
      Id: Math.max(...applications.map(a => a.Id), 0) + 1,
      ...applicationData,
      status: "applied",
      appliedDate: new Date().toISOString(),
      nextStep: "Application submitted",
      createdAt: new Date().toISOString()
    }
    applications.push(newApplication)
    return { ...newApplication }
  },

  async update(id, applicationData) {
    await delay(500)
    const index = applications.findIndex(a => a.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Application not found')
    }
    
    applications[index] = { ...applications[index], ...applicationData, updatedAt: new Date().toISOString() }
    return { ...applications[index] }
  },

  async delete(id) {
    await delay(300)
    const index = applications.findIndex(a => a.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Application not found')
    }
    
    applications.splice(index, 1)
    return true
  }
}

export default applicationService