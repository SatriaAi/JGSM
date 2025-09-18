
import React from 'react';
import { FilterType } from '../types';
import { DIVISIONS, CATEGORIES, STATUSES } from '../constants';
import { SearchIcon } from './icons/SearchIcon';

interface HeaderProps {
  filters: FilterType;
  onFilterChange: (type: keyof FilterType, value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div className="lg:col-span-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search Document</label>
          <div className="mt-1 relative rounded-md shadow-sm">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="search"
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Name or Number..."
            />
          </div>
        </div>
        <div>
          <label htmlFor="division" className="block text-sm font-medium text-gray-700">Division</label>
          <select
            id="division"
            value={filters.division}
            onChange={(e) => onFilterChange('division', e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="all">All Divisions</option>
            {DIVISIONS.map(div => <option key={div} value={div}>{div}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="all">All Statuses</option>
            {STATUSES.map(stat => <option key={stat} value={stat}>{stat}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Header;
