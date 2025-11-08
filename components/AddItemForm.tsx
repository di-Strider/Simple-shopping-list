
import React, { useState } from 'react';
import PlusIcon from './icons/PlusIcon';
import SparklesIcon from './icons/SparklesIcon';

interface AddItemFormProps {
  onAddItem: (name: string) => void;
  onGetSuggestions: (prompt: string) => void;
  isLoading: boolean;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem, onGetSuggestions, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddItem(inputValue);
      setInputValue('');
    }
  };
  
  const handleSuggest = () => {
    if (inputValue.trim()) {
      onGetSuggestions(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add an item or ask for ideas..."
        className="flex-grow w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
        disabled={isLoading}
      />
      <button
        type="button"
        onClick={handleSuggest}
        disabled={isLoading || !inputValue.trim()}
        className="flex-shrink-0 p-2 bg-amber-400 text-white rounded-lg hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 dark:focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        aria-label="Get AI Suggestions"
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <SparklesIcon />
        )}
      </button>
      <button
        type="submit"
        disabled={isLoading || !inputValue.trim()}
        className="flex-shrink-0 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 dark:focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        aria-label="Add Item"
      >
        <PlusIcon />
      </button>
    </form>
  );
};

export default AddItemForm;
