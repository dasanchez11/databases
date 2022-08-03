import React from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

const Pagination = ({ page, setPage, pageCount, count, itemsPerPage }) => {

    const next = () => {
        setPage(state => {
            if (state === pageCount) {
                return state
            } else {
                return state + 1
            }
        })
    }

    const previous = () => {
        setPage(state => {
            if (state === 1) {
                return state
            } else {
                return state - 1
            }
        })
    }

    let numbers = Array.from(Array(pageCount + 1).keys()).slice(1)

    return (
        <div className="bg-gray-100 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
                <a
                    href="#prev"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    Previous
                </a>
                <a
                    href="#next"
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{page === 1 ? 1 : itemsPerPage * (page - 1)+1}</span> to <span className="font-medium">{page * itemsPerPage < count ? page * itemsPerPage : count}</span> of{' '}
                        <span className="font-medium">{count}</span> results
                    </p>
                </div>
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button disabled={page === 1} onClick={previous}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <span className="sr-only">Previous</span>
                            <span>
                                <BsChevronLeft />
                            </span>
                        </button>
                        {/* <a
                            href="#"
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <span className="sr-only">Previous</span>
                            <button className="h-5 w-5 hover:cursor-pointer" onClick={previous} disabled={page === 1} >
                                <BsChevronLeft />
                            </button>
                        </a> */}
                        {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                        {numbers.map((number, idx) => {
                            return (
                                <a
                                    key={idx}
                                    href={number}
                                    aria-current="page"
                                    className={`z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === number ? "bg-indigo-50 border-indigo-500 text-indigo-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"}`}
                                    onClick={() => setPage(number)}
                                >
                                    {number}
                                </a>
                            )
                        })}



                        {/* <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                            ...
                        </span> */}


                        <button disabled={page === pageCount} onClick={next}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <span className="sr-only">Next</span>
                            <span>
                                <BsChevronRight />
                            </span>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Pagination