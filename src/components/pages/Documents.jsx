import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
const Documents = () => {
  const { t } = useTranslation();
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({})
  const [generating, setGenerating] = useState(false)
const templates = [
    {
      Id: 1,
      name: t('professionalResume'),
      type: "resume",
      description: t('professionalResumeDesc'),
      preview: "/api/placeholder/300/400"
    },
    {
      Id: 2,
      name: t('creativeResume'),
      type: "resume",
      description: t('creativeResumeDesc'),
      preview: "/api/placeholder/300/400"
    },
    {
      Id: 3,
      name: t('technicalResume'),
      type: "resume",
      description: t('technicalResumeDesc'),
      preview: "/api/placeholder/300/400"
    },
    {
      Id: 4,
      name: t('standardCoverLetter'),
      type: "cover-letter",
      description: t('standardCoverLetterDesc'),
      preview: "/api/placeholder/300/400"
    }
  ]

  const loadDocuments = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockDocuments = [
        {
          Id: 1,
          name: "Software Engineer Resume",
          type: "resume",
          templateId: 3,
          createdAt: new Date().toISOString(),
          status: "completed",
          downloadUrl: "#"
        },
        {
          Id: 2,
          name: "Google Cover Letter",
          type: "cover-letter",
          templateId: 4,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          status: "completed",
          downloadUrl: "#"
        }
      ]
      
      setDocuments(mockDocuments)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDocuments()
  }, [])

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template)
    setIsCreating(true)
    setFormData({
      templateId: template.Id,
      type: template.type,
      name: `My ${template.name}`
    })
  }

  const handleInputChange = (value, name) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleGenerate = async () => {
    try {
      setGenerating(true)
      
      // Simulate document generation via webhook
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const newDocument = {
        Id: documents.length + 1,
        name: formData.name,
        type: formData.type,
        templateId: formData.templateId,
        createdAt: new Date().toISOString(),
        status: "completed",
        downloadUrl: "#"
      }
      
      setDocuments(prev => [newDocument, ...prev])
      setIsCreating(false)
      setSelectedTemplate(null)
      setFormData({})
      
toast.success(t('documentGenerated'))
      
    } catch (err) {
      toast.error(t('documentGenerationFailed'))
    } finally {
      setGenerating(false)
    }
  }

const handleDownload = (document) => {
    toast.success(t('downloading', { name: document.name }))
  }

  const handleDelete = (documentId) => {
    setDocuments(prev => prev.filter(doc => doc.Id !== documentId))
    toast.success(t('documentDeleted'))
  }

  if (loading) {
    return <Loading type="card" count={6} />
  }

  if (error) {
    return <Error onRetry={loadDocuments} />
  }

if (isCreating) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
<div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('createDocument')}</h1>
            <p className="text-gray-600 mt-2">
              {t('chooseTemplate')}: {selectedTemplate.name}
            </p>
          </div>
          <Button
            variant="outline"
            icon="X"
            onClick={() => setIsCreating(false)}
          >
            {t('cancel')}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
<Card className="p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('documentDetails')}</h3>
            <div className="space-y-6">
              <FormField
                label={t('documentName')}
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                required
              />

              {selectedTemplate.type === 'cover-letter' && (
<>
                  <FormField
                    label={t('companyName')}
                    name="company"
                    value={formData.company || ''}
                    onChange={handleInputChange}
                    required
                  />
<div>
                    <label className="form-label">{t('whyInterested')}</label>
                    <textarea
                      value={formData.motivation || ''}
                      onChange={(e) => handleInputChange(e.target.value, 'motivation')}
                      className="form-input h-32 resize-none"
                      placeholder={t('explainInterest')}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="mt-8 flex justify-end space-x-4">
<Button
                variant="outline"
                onClick={() => setIsCreating(false)}
              >
                {t('cancel')}
              </Button>
              <Button
                variant="primary"
                onClick={handleGenerate}
                loading={generating}
                icon="Sparkles"
              >
                {t('generateWithAI')}
              </Button>
            </div>
          </Card>

          {/* Preview */}
<Card className="p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('templatePreview')}</h3>
            <div className="bg-gray-100 rounded-lg p-4 h-96 flex items-center justify-center">
              <div className="text-center">
                <ApperIcon name="FileText" size={48} className="text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">{t('templatePreviewDesc')}</p>
                <p className="text-sm text-gray-500 mt-2">{selectedTemplate.description}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('documents')}</h1>
          <p className="text-gray-600 mt-2">
            {t('documentsDesc')}
          </p>
        </div>
      </div>

      {/* Templates Section */}
<div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('chooseTemplate')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template) => (
            <motion.div
              key={template.Id}
              whileHover={{ y: -5 }}
              className="cursor-pointer"
              onClick={() => handleTemplateSelect(template)}
            >
              <Card className="h-full">
                <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <ApperIcon name="FileText" size={48} className="text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                <Badge variant="primary" size="sm">
                  {template.type}
                </Badge>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

{/* My Documents Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('myDocuments')}</h2>
        
        {documents.length === 0 ? (
          <Empty
            icon="FileText"
            title={t('noDocuments')}
            message={t('noDocumentsDesc')}
            actionLabel={t('createDocument')}
            onAction={() => setIsCreating(true)}
          />
        ) : (
          <div className="grid gap-6">
            {documents.map((document) => (
              <motion.div
                key={document.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {document.name}
                      </h3>
<div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" size="sm">
                          {document.type}
                        </Badge>
                        <Badge 
                          variant={document.status === 'completed' ? 'success' : 'warning'}
                          size="sm"
                        >
                          {t(document.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        Created {new Date(document.createdAt).toLocaleDateString()}
                      </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleDownload(document)}
>
                      {t('download')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(document.Id)}
                    >
                      {t('delete')}
                    </Button>
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

export default Documents