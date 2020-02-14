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
                        <ul className="pagination pagination">
                            <li className={"page-item " + (currentPage === 1 && "disabled")}>
                                <button className="page-link"
                                        onClick={() => {
                                            window.scrollTo(0, 0);
                                            const timeoutID = setTimeout(() => {
                                                onPageChanged(currentPage - 1);
                                                clearTimeout(timeoutID);
                                            }, 600);
                                        }}>&laquo;</button>
                            </li>
                            {pages.map(page =>
                                <li key={page} className={"page-item " + (currentPage === page && "active")}>
                                    <button className="page-link" onClick={() => {
                                        window.scrollTo(0, 0);
                                        const timeoutID = setTimeout(() => {
                                            onPageChanged(page);
                                            clearTimeout(timeoutID);
                                        }, 600);
                                    }}>{page}</button>
                                </li>
                            )}
                            <li className={"page-item " + (currentPage === pageCount && "disabled")}>
                                <button className="page-link" onClick={() => {
                                    window.scrollTo(0, 0);
                                    const timeoutID = setTimeout(() => {
                                        onPageChanged(currentPage + 1);
                                        clearTimeout(timeoutID);
                                    }, 600);
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