import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 * 
 * This function combines clsx and tailwind-merge to:
 * 1. Handle conditional class names (via clsx)
 * 2. Intelligently merge Tailwind classes to avoid conflicts (via twMerge)
 * 
 * Example:
 * ```tsx
 * // Conditional classes
 * cn('px-4 py-2', isActive && 'bg-blue-500', 'text-white')
 * 
 * // Merging conflicting classes (last one wins)
 * cn('px-4', 'px-6') // Result: 'px-6'
 * 
 * // Complex conditional logic
 * cn(
 *   'base-class',
 *   { 'active-class': isActive },
 *   disabled ? 'disabled-class' : 'enabled-class'
 * )
 * ```
 * 
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

