// components/Breadcrumb.tsx
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <nav className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-400">
            {/* <Link to="/" className="text-slate-950 hover:underline">
                Home
            </Link> */}
            {pathnames.map((value, index) => {
                const pathname = `/${pathnames.slice(0, index + 1).join("/")}`;
                const isLast = index === pathnames.length - 1;

                return isLast ? (
                    <span key={index} className="flex items-center space-x-2">
                        <span>/</span>
                        <span className="capitalize">
                            {value.replace(/-/g, " ")}
                        </span>
                    </span>
                ) : (
                    <span key={index} className="flex items-center space-x-2">
                        {/* <span>/</span> */}
                        <Link
                            to={pathname}
                            className="text-slate-950 dark:text-gray-200 capitalize hover:underline"
                        >
                            {value.replace(/-/g, " ")}
                        </Link>
                    </span>
                );
            })}
        </nav>
    );
};

export default Breadcrumb;
