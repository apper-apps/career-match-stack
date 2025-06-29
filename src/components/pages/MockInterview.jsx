import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

const MockInterview = () => {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeSession, setActiveSession] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userResponse, setUserResponse] = useState('')
  const [sessionStarted, setSessionStarted] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const interviewTypes = [
    {
      Id: 1,
      name: "General Interview",
      description: "Common interview questions for any role",
      duration: "30 minutes",
      questions: [
        "Tell me about yourself",
        "Why are you interested in this position?",
        "What are your greatest strengths?",
        "Describe a challenging situation you've overcome",
        "Where do you see yourself in 5 years?"
      ]
    },
    {
      Id: 2,
      name: "Technical Interview",
      description: "Technical questions for software engineering roles",
      duration: "45 minutes",
      questions: [
        "Explain the difference between a stack and a queue",
        "How would you optimize a slow-running query?",
        "Describe your approach to debugging a production issue",
        "What's your experience with cloud platforms?",
        "How do you ensure code quality in your projects?"
      ]
    },
    {
      Id: 3,
      name: "Behavioral Interview",
      description: "Behavioral questions using the STAR method",
      duration: "40 minutes",
      questions: [
        "Tell me about a time you had to work with a difficult team member",
        "Describe a situation where you had to meet a tight deadline",
        "Give an example of when you had to make a difficult decision",
        "Tell me about a time you failed and how you handled it",
        "Describe a time you had to lead a project"
      ]
    }
  ]

  const loadSessions = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockSessions = [
        {
          Id: 1,
          type: "General Interview",
          date: new Date(Date.now() - 86400000).toISOString(),
          score: 85,
          feedback: "Great overall performance with room for improvement in specific examples"
        },
        {
          Id: 2,
          type: "Technical Interview",
          date: new Date(Date.now() - 172800000).toISOString(),
          score: 78,
          feedback: "Strong technical knowledge, work on communication clarity"
        }
      ]
      
      setSessions(mockSessions)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSessions()
  }, [])

  const startSession = (type) => {
    setActiveSession(type)
    setSessionStarted(true)
    setCurrentQuestion(0)
    setUserResponse('')
    setFeedback(null)
  }

  const handleNextQuestion = async () => {
    if (!userResponse.trim()) {
      toast.error('Please provide an answer before proceeding')
      return
    }

    setAnalyzing(true)
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (currentQuestion < activeSession.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setUserResponse('')
      setAnalyzing(false)
    } else {
      // End of interview
      const sessionFeedback = {
        score: Math.floor(Math.random() * 20) + 80, // Random score between 80-100
        strengths: [
          "Clear communication",
          "Good examples provided",
          "Confident delivery"
        ],
        improvements: [
          "More specific details in examples",
          "Better structure in responses",
          "Stronger closing statements"
        ],
        overallFeedback: "Strong performance overall. Continue practicing to improve confidence and delivery."
      }
      
      setFeedback(sessionFeedback)
      setAnalyzing(false)
      
      // Save session
      const newSession = {
        Id: sessions.length + 1,
        type: activeSession.name,
        date: new Date().toISOString(),
        score: sessionFeedback.score,
        feedback: sessionFeedback.overallFeedback
      }
      
      setSessions(prev => [newSession, ...prev])
      toast.success('Interview completed! Check your feedback below.')
    }
  }

  const endSession = () => {
    setActiveSession(null)
    setSessionStarted(false)
    setCurrentQuestion(0)
    setUserResponse('')
    setFeedback(null)
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'accent'
    if (score >= 80) return 'primary'
    if (score >= 70) return 'warning'
    return 'error'
  }

  if (loading) {
    return <Loading type="card" count={3} />
  }

  if (error) {
    return <Error onRetry={loadSessions} />
  }

  // Active Interview Session
  if (sessionStarted) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{activeSession.name}</h1>
            <p className="text-gray-600 mt-2">
              Question {currentQuestion + 1} of {activeSession.questions.length}
            </p>
          </div>
          <Button
            variant="outline"
            icon="X"
            onClick={endSession}
          >
            End Interview
          </Button>
        </div>

        {/* Progress Bar */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-primary-600">
              {Math.round(((currentQuestion + 1) / activeSession.questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / activeSession.questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </Card>

        {feedback ? (
          // Feedback View
          <div className="space-y-6">
            <Card className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="Award" size={40} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Interview Completed!</h2>
              <div className="flex items-center justify-center space-x-2 mb-6">
                <span className="text-lg text-gray-600">Your Score:</span>
                <Badge variant={getScoreColor(feedback.score)} size="lg">
                  {feedback.score}/100
                </Badge>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">{feedback.overallFeedback}</p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ApperIcon name="CheckCircle" size={20} className="text-accent-500 mr-2" />
                  Strengths
                </h3>
                <ul className="space-y-2">
                  {feedback.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <ApperIcon name="Plus" size={16} className="text-accent-500 mr-2 mt-0.5" />
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ApperIcon name="Target" size={20} className="text-primary-500 mr-2" />
                  Areas for Improvement
                </h3>
                <ul className="space-y-2">
                  {feedback.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start">
                      <ApperIcon name="ArrowRight" size={16} className="text-primary-500 mr-2 mt-0.5" />
                      <span className="text-gray-700">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div className="text-center">
              <Button
                variant="primary"
                icon="RotateCcw"
                onClick={endSession}
              >
                Start New Interview
              </Button>
            </div>
          </div>
        ) : (
          // Question View
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <ApperIcon name="MessageSquare" size={24} className="text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">AI Interviewer</h3>
                  <p className="text-sm text-gray-500">Analyzing your response...</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Question:</h4>
                <p className="text-lg text-gray-800">{activeSession.questions[currentQuestion]}</p>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">💡 Tip:</h4>
                <p className="text-sm text-blue-800">
                  Use the STAR method: Situation, Task, Action, Result. Be specific and provide concrete examples.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Response</h3>
              
              <div className="space-y-4">
                <textarea
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {userResponse.length} characters
                  </span>
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setUserResponse('')}
                      disabled={!userResponse.trim()}
                    >
                      Clear
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleNextQuestion}
                      loading={analyzing}
                      disabled={!userResponse.trim()}
                      icon={currentQuestion < activeSession.questions.length - 1 ? "ArrowRight" : "Check"}
                    >
                      {currentQuestion < activeSession.questions.length - 1 ? "Next Question" : "Finish Interview"}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Mock Interview</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Practice your interview skills with AI-powered mock interviews. Get real-time feedback and improve your performance.
        </p>
      </div>

      {/* Interview Types */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Choose Interview Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {interviewTypes.map((type) => (
            <motion.div
              key={type.Id}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full cursor-pointer" onClick={() => startSession(type)}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{type.name}</h3>
                    <Badge variant="primary" size="sm">{type.duration}</Badge>
                  </div>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <ApperIcon name="HelpCircle" size={16} className="mr-1" />
                    {type.questions.length} questions
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Previous Sessions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Previous Sessions</h2>
        
        {sessions.length === 0 ? (
          <Empty
            icon="MessageSquare"
            title="No interview sessions yet"
            message="Start your first mock interview to practice and improve your skills."
            actionLabel="Start Interview"
            onAction={() => startSession(interviewTypes[0])}
          />
        ) : (
          <div className="space-y-4">
            {sessions.map((session, index) => (
              <motion.div
                key={session.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <ApperIcon name="MessageSquare" size={24} className="text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{session.type}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(session.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{session.feedback}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant={getScoreColor(session.score)} size="lg">
                        {session.score}/100
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        icon="Eye"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MockInterview