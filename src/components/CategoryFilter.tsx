import { useRef, useState, useEffect } from 'react';
import { CategoryProps } from '../types/Product';

const CategoryFilter = ({ categories, selected, onSelect }: CategoryProps) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const allSelected = selected.length === 0;

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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

    // Label shown on the trigger button
    const triggerLabel = allSelected
        ? 'All Categories'
        : selected.length === 1
            ? selected[0]
            : `${selected.length} Categories`;

    return (
        <div className='relative mb-6' ref={dropdownRef}>
            {/* Trigger button */}
            <button
                onClick={() => setOpen((prev) => !prev)}
                className='flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-medium min-w-[160px] justify-between'
            >
                <span>{triggerLabel}</span>
                {/* Chevron icon */}
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                </svg>
            </button>

            {/* Dropdown panel */}
            {open && (
                <div className='absolute z-10 mt-2 w-56 rounded-lg bg-white border border-gray-200 shadow-lg overflow-hidden'>
                    {/* All option */}
                    <button
                        onClick={handleAllClick}
                        className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${allSelected ? 'font-semibold' : ''
                            }`}
                    >
                        <span
                            className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${allSelected ? 'bg-black border-black' : 'border-gray-300'
                                }`}
                        >
                            {allSelected && (
                                <svg className='w-3 h-3 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
                                </svg>
                            )}
                        </span>
                        All Categories
                    </button>

                    <div className='border-t border-gray-100' />

                    {/* Category options */}
                    {categories.map((category) => {
                        const isSelected = selected.includes(category);
                        return (
                            <button
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                                className='w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 transition-colors'
                            >
                                <span
                                    className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-black border-black' : 'border-gray-300'
                                        }`}
                                >
                                    {isSelected && (
                                        <svg className='w-3 h-3 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
                                        </svg>
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