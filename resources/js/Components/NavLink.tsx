import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'text-sm font-bold flex items-center p-2 rounded-md  hover:bg-white/10' +
                (active
                    ? ' bg-red-500 hover:bg-red-600 text-white'
                    : 'text-gray-300 hover:bg-white/10') +
                className
            }
        >
            {children}
        </Link >
    );
}
