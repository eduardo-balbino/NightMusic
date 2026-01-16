import { usePathname } from 'next/navigation';
import Link from 'next/link';
import PropTypes from 'prop-types';

export { NavLink };

type NavLinkProps = {
    href: string,
    children: React.ReactNode
};

function NavLink({ href, children }: NavLinkProps) {

    const pathname = usePathname();
    const isActive = pathname === href

    return (
        <Link href={href} className={isActive ? 'navlink active' : 'navLink'}>
                {children}
        </Link>
    );
}