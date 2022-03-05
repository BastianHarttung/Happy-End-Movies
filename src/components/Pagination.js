import classes from "./Pagination.module.scss";
import {ReactComponent as ArrowLeftIcon} from "../assets/icons/chevron-left.svg";
import {ReactComponent as ArrowRightIcon} from "../assets/icons/chevron-right.svg";
import {useState} from "react";

const Pagination = ({
                        totalPages,
                        activePage,
                        changePage,
                        totalResults,
                    }) => {

    const [dots, setDots] = useState({before: true, after: true})

    return (
        <section className={classes.paginationSection}>
            <div className={classes.pageContainer}>
                <ArrowLeftIcon className={classes.pageArrow}
                               onClick={() => changePage(Math.max(1, activePage - 1))}/>

                Seite:
                {dots.before && <span className={classes.dots}>...</span>}
                {totalPages.slice(Math.max(0, activePage - 4), Math.min(activePage + 3, totalPages.length))
                    .map(page =>
                        <span key={page}
                              onClick={(page) => changePage(page)}
                              className={activePage === page ? classes.activePageBtn : classes.pageBtn}>
                                {page}
                            </span>
                    )}
                {dots.after && <span className={classes.dots}>...</span>}
                {totalPages[totalPages.length - 1]}
                <ArrowRightIcon className={classes.pageArrow}
                                onClick={() => changePage(Math.min(activePage + 1, totalPages.length))}/>
            </div>

            <div className={classes.totalResults}>Anzahl Ergebnisse: {totalResults}</div>
        </section>
    )
}

export default Pagination