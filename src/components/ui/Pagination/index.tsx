// src/components/ui/Pagination.tsx
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const showPages = pages.slice(
        Math.max(0, currentPage - 2),
        Math.min(totalPages, currentPage + 1)
    );

    return (
        <div className="flex items-center justify-between mb-5">
            <div className="text-sm text-gray-700 dark:text-gray-400">
                Page {currentPage} of {totalPages}
            </div>
            <ul className="inline-flex items-center space-x-1 rtl:space-x-reverse">
                {/* Previous Button */}
                <li>
                    <button
                        type="button"
                        className={`flex justify-center font-semibold p-2 rounded-full transition disabled:cursor-not-allowed disabled:opacity-60
                            ${
                                currentPage === 1
                                    ? "bg-gray-300 text-gray-400 dark:bg-[#191e3a]"
                                    : "bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
                            }`}
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        <ChevronDoubleLeftIcon className="w-4 h-4" />
                    </button>
                </li>

                {/* Page Numbers */}
                {showPages.map((page) => (
                    <li key={page}>
                        <button
                            type="button"
                            className={`flex justify-center font-semibold px-3.5 py-2 rounded-full transition 
                                ${
                                    page === currentPage
                                        ? "bg-primary text-white dark:bg-primary dark:text-white-light"
                                        : "bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
                                }`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}

                {/* Next Button */}
                <li>
                    <button
                        type="button"
                        className={`flex justify-center font-semibold p-2 rounded-full transition disabled:cursor-not-allowed disabled:opacity-60
                            ${
                                currentPage === totalPages
                                    ? "bg-gray-300 text-gray-400 dark:bg-[#191e3a]"
                                    : "bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
                            }`}
                        disabled={currentPage === totalPages}
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        <ChevronDoubleRightIcon className="w-4 h-4" />
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;