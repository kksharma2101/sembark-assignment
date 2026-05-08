import { useState } from 'react';
import { CategoryProps } from '../types/Product';
import { ChevronDown, Check } from 'lucide-react';

const CategoryFilter = ({ categories, selected, onSelect }: CategoryProps) => {
    const [open, setOpen] = useState(false);
    const allSelected = selected.length === 0;


    const handleAllClick = () => {
        onSelect([]);
        setOpen(false);
    };

    const handleCategoryClick = (category: string) => {
        if (selected.includes(category)) {
            onSelect(selected.filter((c) => c !== category));
        } else {
            onSelect([...selected, category]);
        }
    };

    const triggerLabel = allSelected
        ? 'All Categories'
        : selected.length === 1
            ? selected[0]
            : `${selected.length} Categories`;

    return (
        <div className='relative mb-6'>
            <button
                onClick={() => setOpen((prev) => !prev)}
                className='flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-medium min-w-[160px] justify-between'
            >
                <span>{triggerLabel}</span>

                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <div className='absolute z-10 mt-2 w-56 rounded-lg bg-white border border-gray-200 shadow-lg overflow-hidden'>
                    <button
                        onClick={handleAllClick}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm"
                    >
                        <span
                            className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${allSelected ? 'bg-black border-black' : 'border-gray-300'
                                }`}
                        >
                            {allSelected && (
                                <Check color='white' />
                            )}
                        </span>
                        All Categories
                    </button>

                    <div className='border-t border-gray-100' />

                    {categories.map((category) => {
                        const isSelected = selected.includes(category);
                        return (
                            <button
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm"
                            >
                                <span
                                    className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-black border-black' : 'border-gray-300'
                                        }`}
                                >
                                    {isSelected && (
                                        <Check color='white' />
                                    )}
                                </span>
                                <span className={isSelected ? 'font-medium' : ''}>{category}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default CategoryFilter;