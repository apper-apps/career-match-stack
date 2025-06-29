import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import RecommendationCard from '@/components/molecules/RecommendationCard'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('match')

  const loadRecommendations = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockRecommendations = [
        {
          Id: 1,
          title: "Senior Product Manager",
          type: "Job Role",
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
          title: "Data Science Manager",
          type: "Job Role",
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
        },
        {
          Id: 3,
          title: "UX Research Lead",
          type: "Job Role",
          company: "Apple",
          location: "Cupertino, CA",
          salary: "$130,000 - $170,000",
          matchScore: 85,
          reasons: [
            "User research methodology expertise",
            "Design thinking approach",
            "Stakeholder management skills",
            "Portfolio demonstrates impact"
          ]
        },
        {
          Id: 4,
          title: "Technology Consulting",
          type: "Career Path",
          company: "Various",
          location: "Multiple",
          salary: "$120,000 - $160,000",
          matchScore: 82,
          reasons: [
            "Problem-solving abilities",
            "Client-facing experience",
            "Technology expertise",
            "Business acumen"
          ]
        },
        {
          Id: 5,
          title: "Startup Founder",
          type: "Career Path",
          company: "Self-employed",
          location: "Remote",
          salary: "Variable",
          matchScore: 78,
          reasons: [
            "Entrepreneurial mindset",
            "Risk tolerance",
            "Innovation focus",
            "Leadership potential"
          ]
        }
      ]
      
      setRecommendations(mockRecommendations)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRecommendations()
  }, [])

  const handleRecommendationClick = (recommendation) => {
    toast.info(`Viewing details for ${recommendation.title}`)
  }

  const filteredRecommendations = recommendations.filter(rec => {
    if (filter === 'all') return true
    return rec.type.toLowerCase().includes(filter.toLowerCase())
  })

  const sortedRecommendations = [...filteredRecommendations].sort((a, b) => {
    if (sortBy === 'match') return b.matchScore - a.matchScore
    if (sortBy === 'salary') return b.salary.localeCompare(a.salary)
    return a.title.localeCompare(b.title)
  })

  if (loading) {
    return <Loading type="card" count={6} />
  }

  if (error) {
    return <Error onRetry={loadRecommendations} />
  }

  if (recommendations.length === 0) {
    return (
      <Empty
        icon="Target"
        title="No recommendations yet"
        message="Complete your self-analysis to get personalized job and career recommendations tailored to your profile."
        actionLabel="Start Self-Analysis"
        onAction={() => window.location.href = '/self-analysis'}
      />
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Recommendations</h1>
          <p className="text-gray-600 mt-2">
            AI-powered job and career recommendations based on your profile
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <Badge variant="success" size="lg">
            {recommendations.length} Matches Found
          </Badge>
          <Button
            variant="primary"
            icon="RefreshCw"
            onClick={loadRecommendations}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'job' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('job')}
          >
            Job Roles
          </Button>
          <Button
            variant={filter === 'career' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('career')}
          >
            Career Paths
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="match">Match Score</option>
            <option value="salary">Salary</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>

      {/* Match Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-accent-100 text-sm">High Matches</p>
              <p className="text-2xl font-bold">
                {sortedRecommendations.filter(r => r.matchScore >= 80).length}
              </p>
            </div>
            <ApperIcon name="TrendingUp" size={24} className="text-accent-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Medium Matches</p>
              <p className="text-2xl font-bold">
                {sortedRecommendations.filter(r => r.matchScore >= 60 && r.matchScore < 80).length}
              </p>
            </div>
            <ApperIcon name="BarChart" size={24} className="text-yellow-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-100 text-sm">Average Match</p>
              <p className="text-2xl font-bold">
                {Math.round(sortedRecommendations.reduce((acc, r) => acc + r.matchScore, 0) / sortedRecommendations.length)}%
              </p>
            </div>
            <ApperIcon name="Target" size={24} className="text-primary-200" />
          </div>
        </div>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedRecommendations.map((recommendation, index) => (
          <motion.div
            key={recommendation.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <RecommendationCard
              title={recommendation.title}
              type={recommendation.type}
              company={recommendation.company}
              location={recommendation.location}
              salary={recommendation.salary}
              matchScore={recommendation.matchScore}
              reasons={recommendation.reasons}
              onClick={() => handleRecommendationClick(recommendation)}
            />
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      {sortedRecommendations.length > 0 && (
        <div className="text-center">
          <Button
            variant="outline"
            icon="Plus"
            onClick={() => toast.info('Loading more recommendations...')}
          >
            Load More Recommendations
          </Button>
        </div>
      )}
    </div>
  )
}

export default Recommendations