import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface NavLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    activeClassName?: string;
}

const NavLink = ({ href, children, className = '', activeClassName = '' }: NavLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href || pathname.startsWith(`${href}/`);

    return (
        <Link
            href={href}
            className={`${className} ${isActive ? activeClassName : ''}`}
        >
            {children}
        </Link>
    );
};

export default NavLink;