
import React from 'react';
import { ShoppingListItem as ShoppingListItemType } from '../types';
import TrashIcon from './icons/TrashIcon';

interface ShoppingListItemProps {
  item: ShoppingListItemType;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const ShoppingListItem: React.FC<ShoppingListItemProps> = ({ item, onToggle, onDelete }) => {
  return (
    <li className="flex items-center bg-slate-50 dark:bg-slate-700 p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => onToggle(item.id)}
        className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
      />
      <span
        className={`flex-grow mx-4 text-slate-800 dark:text-slate-200 transition-colors ${
          item.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''
        }`}
      >
        {item.name}
      </span>
      <button
        onClick={() => onDelete(item.id)}
        className="p-1 text-slate-400 hover:text-red-500 transition-colors"
        aria-label={`Delete ${item.name}`}
      >
        <TrashIcon />
      </button>
    </li>
  );
};

export default ShoppingListItem;
