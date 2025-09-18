
import React from 'react';
import { Document, Status } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';
import { EditIcon } from './icons/EditIcon';
import { DeleteIcon } from './icons/DeleteIcon';

interface DocumentItemProps {
  document: Document;
  onEdit: (doc: Document) => void;
  onDelete: (doc: Document) => void;
}

const statusColorMap: Record<Status, string> = {
  [Status.APPROVED]: 'bg-green-100 text-green-800',
  [Status.IN_REVIEW]: 'bg-yellow-100 text-yellow-800',
  [Status.DRAFT]: 'bg-blue-100 text-blue-800',
  [Status.ARCHIVED]: 'bg-gray-100 text-gray-800',
};

const DocumentItem: React.FC<DocumentItemProps> = ({ document, onEdit, onDelete }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{document.name}</div>
        <div className="text-xs text-gray-500">Created: {document.createdAt}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.number}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.division}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.category}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColorMap[document.status]}`}>
          {document.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center space-x-3">
          <a href={document.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900" title="Download/View">
            <DownloadIcon className="w-5 h-5" />
          </a>
          <button onClick={() => onEdit(document)} className="text-yellow-600 hover:text-yellow-900" title="Edit">
            <EditIcon className="w-5 h-5" />
          </button>
          <button onClick={() => onDelete(document)} className="text-red-600 hover:text-red-900" title="Delete">
            <DeleteIcon className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default DocumentItem;
