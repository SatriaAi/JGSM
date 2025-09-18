
import React from 'react';
import { Document } from '../types';
import DocumentItem from './DocumentItem';

interface DocumentListProps {
  documents: Document[];
  onEdit: (doc: Document) => void;
  onDelete: (doc: Document) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({ documents, onEdit, onDelete }) => {
  if (documents.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No documents found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full align-middle">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Division</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.map((doc) => (
              <DocumentItem key={doc.id} document={doc} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentList;
