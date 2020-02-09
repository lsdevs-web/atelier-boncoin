import React from 'react';

const Pagination = ({currentPage, itemsPerPage, Length, onPageChanged}) => {

    const pageCount = Math.ceil(Length / itemsPerPage);
    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    return (
        <>
            <div className="row">
                <div className="col d-flex justify-content-center align-items-center my-3">
                    <div>
                        <ul className="pagination pagination-lg">
                            <li className={"page-item " + (currentPage === 1 && "disabled")}>
                                <button className="page-link"
                                        onClick={() => onPageChanged(currentPage - 1)}>&laquo;</button>
                            </li>
                            {pages.map(page =>
                                <li key={page} className={"page-item " + (currentPage === page && "active")}>
                                    <button className="page-link" onClick={() => onPageChanged(page)}>{page}</button>
                                </li>
                            )}
                            <li className={"page-item " + (currentPage === pageCount && "disabled")}>
                                <button className="page-link" onClick={() => {
                                    onPageChanged(currentPage + 1);
                                    window.scrollTo(0, 0);
                                }}>&raquo;</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    );
};

Pagination.getData = (items, currentPage, itemsPerPage) => {
    const start = (currentPage * itemsPerPage) - itemsPerPage;
    return items.slice(start, start + itemsPerPage);
};

export default Pagination;