"use client";
import { MoveLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoBackButtonProps } from '../types/Product';


export default function GoBack({
    href = '/',
    className = '',
    containerClassName = '',
}: GoBackButtonProps) {
    return (
        <div className={`pb-4${containerClassName}`}>
            <Link to={href} className={`inline-flex p-2 md:p-2 border-2 border-gray-700 rounded-full items-center justify-center w-fit h-fit transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 cursor-pointer ${className}`}>
                <MoveLeft size={16} />
            </Link>
        </div>
    );
}