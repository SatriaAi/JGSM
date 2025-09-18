import React, { useState, useMemo, useEffect } from 'react';
import { Document, FilterType, Status } from '../types';
import { MOCK_DOCUMENTS } from '../constants';
import Header from './Header';
import DocumentList from './DocumentList';
import Modal from './Modal';
import DocumentForm from './DocumentForm';
import { PlusIcon } from './icons/PlusIcon';
import Banner from './Banner';

interface DashboardPageProps {
  onLogout: () => void;
}

type ModalState = {
  isOpen: boolean;
  type: 'add' | 'edit' | 'delete' | null;
  data: Document | null;
};

const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filters, setFilters] = useState<FilterType>({
    division: 'all',
    category: 'all',
    status: 'all',
    search: '',
  });
  const [modal, setModal] = useState<ModalState>({ isOpen: false, type: null, data: null });

  useEffect(() => {
    // Simulate fetching data
    setDocuments(MOCK_DOCUMENTS);
  }, []);

  const handleFilterChange = (type: keyof FilterType, value: string) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const searchLower = filters.search.toLowerCase();
      return (
        (filters.division === 'all' || doc.division === filters.division) &&
        (filters.category === 'all' || doc.category === filters.category) &&
        (filters.status === 'all' || doc.status === filters.status) &&
        (doc.name.toLowerCase().includes(searchLower) || doc.number.toLowerCase().includes(searchLower))
      );
    });
  }, [documents, filters]);

  const documentStats = useMemo(() => {
    return {
      total: documents.length,
      inReview: documents.filter(d => d.status === Status.IN_REVIEW).length,
      approved: documents.filter(d => d.status === Status.APPROVED).length,
      draft: documents.filter(d => d.status === Status.DRAFT).length
    };
  }, [documents]);

  const openModal = (type: 'add' | 'edit' | 'delete', data: Document | null = null) => {
    setModal({ isOpen: true, type, data });
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: null, data: null });
  };

  const handleFormSubmit = (doc: Document) => {
    if (modal.type === 'add') {
      setDocuments(prev => [...prev, { ...doc, id: `doc-${Date.now()}` }]);
    } else if (modal.type === 'edit' && modal.data) {
      setDocuments(prev => prev.map(d => d.id === modal.data!.id ? doc : d));
    }
    closeModal();
  };

  const handleDelete = () => {
    if (modal.data) {
      setDocuments(prev => prev.filter(d => d.id !== modal.data!.id));
    }
    closeModal();
  };

  const getModalContent = () => {
    switch (modal.type) {
      case 'add':
        return <DocumentForm onSubmit={handleFormSubmit} onCancel={closeModal} />;
      case 'edit':
        return <DocumentForm document={modal.data} onSubmit={handleFormSubmit} onCancel={closeModal} />;
      case 'delete':
        return (
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-900">Confirm Deletion</h3>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete the document "<strong>{modal.data?.name}</strong>"? This action cannot be undone. Please double-check before proceeding.
            </p>
            <div className="mt-6 flex justify-end space-x-3">
              <button onClick={closeModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cancel
              </button>
              <button onClick={handleDelete} className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Delete Document
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar can be added here if needed */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-white border-b">
            <h1 className="text-2xl font-bold text-gray-900">Document Dashboard</h1>
            <button onClick={onLogout} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Logout</button>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Banner title="Demonstration Mode">
            <p>This dashboard is fully functional with mock data. To enable live Google Drive integration for fetching, uploading, and managing files, a secure backend service is necessary to handle authentication and API requests safely.</p>
          </Banner>
        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-5 rounded-lg shadow"><h3 className="text-sm font-medium text-gray-500">Total Documents</h3><p className="mt-1 text-3xl font-semibold text-gray-900">{documentStats.total}</p></div>
            <div className="bg-white p-5 rounded-lg shadow"><h3 className="text-sm font-medium text-gray-500">In Review</h3><p className="mt-1 text-3xl font-semibold text-yellow-500">{documentStats.inReview}</p></div>
            <div className="bg-white p-5 rounded-lg shadow"><h3 className="text-sm font-medium text-gray-500">Approved</h3><p className="mt-1 text-3xl font-semibold text-green-500">{documentStats.approved}</p></div>
            <div className="bg-white p-5 rounded-lg shadow"><h3 className="text-sm font-medium text-gray-500">Drafts</h3><p className="mt-1 text-3xl font-semibold text-blue-500">{documentStats.draft}</p></div>
          </div>
        
          <div className="bg-white p-4 rounded-lg shadow">
            <Header filters={filters} onFilterChange={handleFilterChange} />
            <div className="flex justify-end mb-4">
              <button onClick={() => openModal('add')} className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <PlusIcon className="w-5 h-5 mr-2" />
                Upload Document
              </button>
            </div>
            <DocumentList documents={filteredDocuments} onEdit={(doc) => openModal('edit', doc)} onDelete={(doc) => openModal('delete', doc)} />
          </div>
        </main>
      </div>
      <Modal isOpen={modal.isOpen} onClose={closeModal}>
        {getModalContent()}
      </Modal>
    </div>
  );
};

export default DashboardPage;