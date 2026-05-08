import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
    const location = useLocation();

    const pathnames = location.pathname
        .split('/')
        .filter(Boolean);

    return (
        <nav
            aria-label='Breadcrumb'
            className='max-w-7xl mx-auto px-4 py-4'
        >
            <ol className='flex items-center flex-wrap gap-2 text-sm text-gray-600'>
                <li>
                    <Link
                        to='/'
                        className='hover:text-black font-medium'
                    >
                        Home
                    </Link>
                </li>

                {pathnames.map((value, index) => {
                    const to = `/${pathnames
                        .slice(0, index + 1)
                        .join('/')}`;

                    // const isLast = index === pathnames.length - 1;

                    return (
                        <li
                            key={to}
                            className='flex items-center gap-2'
                        >
                            <span>/</span>
                            <Link
                                to={to}
                                className='hover:text-black capitalize'
                            >
                                {value}
                            </Link>

                            {/* {isLast ? (
                                <span className='font-semibold capitalize text-black'>
                                    {value}
                                </span>
                            ) : (
                               
                            )} */}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;