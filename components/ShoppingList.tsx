
import React from 'react';
import { ShoppingListItem as ShoppingListItemType } from '../types';
import ShoppingListItem from './ShoppingListItem';

interface ShoppingListProps {
  items: ShoppingListItemType[];
  totalItems: number;
  onToggleItem: (id: number) => void;
  onDeleteItem: (id: number) => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ items, totalItems, onToggleItem, onDeleteItem }) => {
  if (items.length === 0) {
    if (totalItems > 0) {
      return (
        <div className="text-center py-10">
          <p className="text-slate-500 dark:text-slate-400">All items are completed!</p>
          <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">Untoggle "Show remaining" to see your full list.</p>
        </div>
      );
    }
    return (
      <div className="text-center py-10">
        <p className="text-slate-500 dark:text-slate-400">Your shopping list is empty.</p>
        <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">Add an item below or get AI suggestions!</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map(item => (
        <ShoppingListItem
          key={item.id}
          item={item}
          onToggle={onToggleItem}
          onDelete={onDeleteItem}
        />
      ))}
    </ul>
  );
};

export default ShoppingList;
