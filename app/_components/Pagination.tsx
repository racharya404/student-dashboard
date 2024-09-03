import React from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTheme } from 'next-themes'

type Props = {
    currentPage: number
    totalPages: number
    paginate: (pageNumber: number) => void
}

const Pagination = ({ currentPage, totalPages, paginate }: Props) => {
    const { theme } = useTheme()
    const pageNumbers = [];

    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        if (currentPage <= 3) {
            pageNumbers.push(1, 2, 3, '...', totalPages);
        } else if (currentPage >= totalPages - 2) {
            pageNumbers.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
        } else {
            pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        }
    }

    return (
        <nav className={`flex justify-center mt-4 overflow-x-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <ul className="flex space-x-2 p-2">
                <li>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`w-10 ${theme === 'dark' ? 'text-white border-gray-600' : 'text-gray-800 border-gray-300'}`}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </li>
                {pageNumbers.map((number, index) => (
                    <li key={index}>
                        {number === '...' ? (
                            <span className={`px-2 w-10 inline-flex justify-center items-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>...</span>
                        ) : (
                            <Button
                                variant={currentPage === number ? "default" : "outline"}
                                size="sm"
                                onClick={() => paginate(number as number)}
                                className={`w-10 ${currentPage === number
                                        ? theme === 'dark'
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-purple-500 text-white'
                                        : theme === 'dark'
                                            ? 'text-white border-gray-600'
                                            : 'text-gray-800 border-gray-300'
                                    }`}
                            >
                                {number}
                            </Button>
                        )}
                    </li>
                ))}
                <li>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`w-10 ${theme === 'dark' ? 'text-white border-gray-600' : 'text-gray-800 border-gray-300'}`}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination