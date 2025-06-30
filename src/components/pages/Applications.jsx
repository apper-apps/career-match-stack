import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApplicationCard from "@/components/molecules/ApplicationCard";
import FormField from "@/components/molecules/FormField";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
const Applications = () => {
  const { t } = useTranslation();
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({})
  const [filter, setFilter] = useState('all')
const statusColumns = [
    { id: 'applied', title: t('applied'), color: 'bg-blue-100 text-blue-800' },
    { id: 'screening', title: t('screening'), color: 'bg-yellow-100 text-yellow-800' },
    { id: 'interview', title: t('interview'), color: 'bg-purple-100 text-purple-800' },
    { id: 'final', title: t('finalRound'), color: 'bg-indigo-100 text-indigo-800' },
    { id: 'offer', title: t('offer'), color: 'bg-green-100 text-green-800' },
    { id: 'rejected', title: t('rejected'), color: 'bg-red-100 text-red-800' }
  ]

  const loadApplications = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockApplications = [
        {
          Id: 1,
          companyName: "Google",
          position: "Senior Product Manager",
          status: "interview",
          appliedDate: new Date(Date.now() - 86400000 * 7).toISOString(),
          deadline: new Date(Date.now() + 86400000 * 14).toISOString(),
          nextStep: "Technical interview scheduled for next Tuesday at 2 PM"
        },
        {
          Id: 2,
          companyName: "Microsoft",
          position: "Data Science Manager",
          status: "screening",
          appliedDate: new Date(Date.now() - 86400000 * 10).toISOString(),
          deadline: new Date(Date.now() + 86400000 * 7).toISOString(),
          nextStep: "Waiting for HR screening call"
        },
        {
          Id: 3,
          companyName: "Apple",
          position: "UX Research Lead",
          status: "applied",
          appliedDate: new Date(Date.now() - 86400000 * 3).toISOString(),
          deadline: new Date(Date.now() + 86400000 * 21).toISOString(),
          nextStep: "Application under review"
        },
        {
          Id: 4,
          companyName: "Meta",
          position: "Product Designer",
          status: "final",
          appliedDate: new Date(Date.now() - 86400000 * 21).toISOString(),
          deadline: new Date(Date.now() + 86400000 * 3).toISOString(),
          nextStep: "Final round interview with VP of Design"
        },
        {
          Id: 5,
          companyName: "Netflix",
          position: "Content Strategy Manager",
          status: "offer",
          appliedDate: new Date(Date.now() - 86400000 * 28).toISOString(),
          deadline: new Date(Date.now() + 86400000 * 7).toISOString(),
          nextStep: "Reviewing offer package"
        }
      ]
      
      setApplications(mockApplications)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadApplications()
  }, [])

  const handleInputChange = (value, name) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

const handleAddApplication = async () => {
    try {
      if (!formData.companyName || !formData.position) {
        toast.error(t('fillRequired'));
        return;
      }

      const newApplication = {
        Id: applications.length + 1,
        companyName: formData.companyName,
        position: formData.position,
        status: 'applied',
        appliedDate: new Date().toISOString(),
        deadline: formData.deadline ? new Date(formData.deadline).toISOString() : null,
        nextStep: t('applicationSubmitted')
      };

      setApplications(prev => [newApplication, ...prev]);
      setFormData({});
      setIsAdding(false);
      toast.success(t('addApplicationSuccess'));
      
    } catch (err) {
      toast.error(t('addApplicationFailed'));
    }
  };

  const handleStatusChange = (applicationId, newStatus) => {
    setApplications(prev =>
      prev.map(app =>
        app.Id === applicationId
          ? { ...app, status: newStatus }
          : app
      )
)
    toast.success(t('statusUpdated'))
  }

const handleEdit = (applicationId) => {
    toast.info(t('editFunctionality'))
  }

  const getApplicationsByStatus = (status) => {
    return applications.filter(app => app.status === status)
  }

  const filteredApplications = filter === 'all' 
    ? applications 
    : applications.filter(app => app.status === filter)

  if (loading) {
    return <Loading type="card" count={6} />
  }

  if (error) {
    return <Error onRetry={loadApplications} />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('applications')}</h1>
          <p className="text-gray-600 mt-2">
            {t('applicationsDesc')}
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button
            variant="primary"
            icon="Plus"
onClick={() => setIsAdding(true)}
          >
            {t('addApplication')}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {statusColumns.map((status) => {
          const count = getApplicationsByStatus(status.id).length
          return (
            <Card key={status.id} className="p-4 text-center">
              <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${status.color} mb-2`}>
                {status.title}
              </div>
              <p className="text-2xl font-bold text-gray-900">{count}</p>
            </Card>
          )
        })}
      </div>

      {/* Add Application Modal */}
      {isAdding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-md w-full p-6"
>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('addNewApplication')}</h3>
            
            <div className="space-y-4">
<FormField
                label={t('companyName')}
                name="companyName"
                value={formData.companyName || ''}
                onChange={handleInputChange}
                required
                icon="Building"
              />
              
<FormField
                label={t('position')}
                name="position"
                value={formData.position || ''}
                onChange={handleInputChange}
                required
                icon="Target"
              />
              
<FormField
                label={t('applicationDeadline')}
                name="deadline"
                type="date"
                value={formData.deadline || ''}
                onChange={handleInputChange}
                icon="Calendar"
              />
            </div>

            <div className="flex justify-end space-x-3 mt-6">
<Button
                onClick={() => setIsAdding(false)}
              >
                {t('cancel')}
              </Button>
              <Button
                variant="primary"
                onClick={handleAddApplication}
icon="Plus"
              >
                {t('addApplication')}
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === 'all' ? 'primary' : 'outline'}
          size="sm"
onClick={() => setFilter('all')}
        >
          {t('all')} ({applications.length})
        </Button>
        {statusColumns.map((status) => (
          <Button
            key={status.id}
            variant={filter === status.id ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter(status.id)}
          >
            {status.title} ({getApplicationsByStatus(status.id).length})
          </Button>
        ))}
      </div>

      {/* Applications Grid */}
{filteredApplications.length === 0 ? (
        <Empty
          icon="Briefcase"
          title={t('noApplications')}
          message={t('noApplicationsDesc')}
          actionLabel={t('addApplication')}
          onAction={() => setIsAdding(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApplications.map((application, index) => (
            <motion.div
              key={application.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ApplicationCard
                companyName={application.companyName}
                position={application.position}
                status={application.status}
                appliedDate={application.appliedDate}
                deadline={application.deadline}
                nextStep={application.nextStep}
                onStatusChange={(newStatus) => handleStatusChange(application.Id, newStatus)}
                onEdit={() => handleEdit(application.Id)}
              />
            </motion.div>
          ))}
        </div>
      )}

{/* Kanban Board View Toggle */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          icon="Layout"
          onClick={() => toast.info(t('kanbanSoon'))}
        >
          {t('switchKanban')}
        </Button>
      </div>
    </div>
  )
}

export default Applications