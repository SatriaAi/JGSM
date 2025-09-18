import React, { useState } from 'react';
import { Document, Division, Category, Status } from '../types';
import { DIVISIONS, CATEGORIES, STATUSES } from '../constants';

interface DocumentFormProps {
  document?: Document | null;
  onSubmit: (doc: Document) => void;
  onCancel: () => void;
}

const DocumentForm: React.FC<DocumentFormProps> = ({ document, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Document, 'id' | 'createdAt'>>({
    name: document?.name || '',
    number: document?.number || '',
    division: document?.division || Division.HR,
    category: document?.category || Category.POLICY,
    status: document?.status || Status.DRAFT,
    link: document?.link || '',
  });
  
  const [showWarning, setShowWarning] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!showWarning) {
        setShowWarning(true);
        return;
    }
    onSubmit({
      ...formData,
      id: document?.id || '',
      createdAt: document?.createdAt || new Date().toISOString().split('T')[0],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h3 className="text-lg font-bold text-gray-900">{document ? 'Edit Document' : 'Upload New Document'}</h3>
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Document Name</label>
        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <div>
        <label htmlFor="number" className="block text-sm font-medium text-gray-700">Document Number</label>
        <input type="text" name="number" id="number" value={formData.number} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="division" className="block text-sm font-medium text-gray-700">Division</label>
          <select name="division" id="division" value={formData.division} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            {DIVISIONS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select name="category" id="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
        <select name="status" id="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="link" className="block text-sm font-medium text-gray-700">Document Link (Google Drive)</label>
        <input type="url" name="link" id="link" value={formData.link} onChange={handleChange} required placeholder="https://docs.google.com/document/d/..." className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      {showWarning && (
        <div className="p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
            <p className="font-bold">Please Review Your Changes</p>
            <p>Double-check all fields before submitting. This action will update the document record.</p>
        </div>
      )}

      <div className="pt-4 flex justify-end space-x-3">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          {showWarning ? 'Confirm & Save' : 'Save Document'}
        </button>
      </div>
    </form>
  );
};

export default DocumentForm;