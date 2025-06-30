import { delay } from '@/utils/helpers'

// Mock admin credentials
const mockAdminCredentials = [
  {
    Id: 1,
    username: 'admin',
    password: 'admin123',
    email: 'admin@careermatch.com',
    name: 'System Administrator',
    role: 'admin',
    permissions: ['dashboard', 'users', 'analytics', 'settings'],
    lastLogin: null
  },
  {
    Id: 2,
    username: 'superadmin',
    password: 'super123',
    email: 'superadmin@careermatch.com',
    name: 'Super Administrator',
    role: 'superadmin',
    permissions: ['dashboard', 'users', 'analytics', 'settings', 'system'],
    lastLogin: null
  }
]

let currentSession = null

const adminAuthService = {
  async login(username, password) {
    await delay(800)
    
    const admin = mockAdminCredentials.find(
      admin => admin.username === username && admin.password === password
    )
    
    if (!admin) {
      throw new Error('Invalid username or password')
    }
    
    // Update last login
    admin.lastLogin = new Date().toISOString()
    
    // Create session token (in real app, this would be a JWT from server)
    const sessionToken = `admin_token_${admin.Id}_${Date.now()}`
    
    const sessionData = {
      token: sessionToken,
      admin: {
        Id: admin.Id,
        username: admin.username,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        permissions: admin.permissions,
        lastLogin: admin.lastLogin
      },
      loginTime: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString() // 8 hours
    }
    
    // Store session
    currentSession = sessionData
    localStorage.setItem('adminSession', JSON.stringify(sessionData))
    
    return sessionData
  },

  async logout() {
    await delay(200)
    
    currentSession = null
    localStorage.removeItem('adminSession')
    
    return true
  },

  async getCurrentSession() {
    await delay(100)
    
    // Check memory first
    if (currentSession) {
      // Verify not expired
      if (new Date() < new Date(currentSession.expiresAt)) {
        return currentSession
      } else {
        // Session expired
        currentSession = null
        localStorage.removeItem('adminSession')
        return null
      }
    }
    
    // Check localStorage
    const storedSession = localStorage.getItem('adminSession')
    if (storedSession) {
      try {
        const sessionData = JSON.parse(storedSession)
        
        // Verify not expired
        if (new Date() < new Date(sessionData.expiresAt)) {
          currentSession = sessionData
          return sessionData
        } else {
          // Session expired
          localStorage.removeItem('adminSession')
          return null
        }
      } catch (error) {
        // Invalid session data
        localStorage.removeItem('adminSession')
        return null
      }
    }
    
    return null
  },

  async validateSession(token) {
    await delay(200)
    
    const session = await this.getCurrentSession()
    return session && session.token === token
  },

  async refreshSession() {
    await delay(300)
    
    const session = await this.getCurrentSession()
    if (!session) {
      throw new Error('No active session')
    }
    
    // Extend session by 8 hours
    const newExpiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString()
    session.expiresAt = newExpiresAt
    
    // Update storage
    currentSession = session
    localStorage.setItem('adminSession', JSON.stringify(session))
    
    return session
  },

  async changePassword(currentPassword, newPassword) {
    await delay(600)
    
    const session = await this.getCurrentSession()
    if (!session) {
      throw new Error('No active session')
    }
    
    const admin = mockAdminCredentials.find(a => a.Id === session.admin.Id)
    if (!admin || admin.password !== currentPassword) {
      throw new Error('Current password is incorrect')
    }
    
    if (newPassword.length < 6) {
      throw new Error('New password must be at least 6 characters')
    }
    
    // Update password
    admin.password = newPassword
    
    return true
  },

  isAuthenticated() {
    return currentSession !== null
  },

  getAdminInfo() {
    return currentSession ? currentSession.admin : null
  },

  hasPermission(permission) {
    const admin = this.getAdminInfo()
    return admin && admin.permissions.includes(permission)
  }
}

export default adminAuthService