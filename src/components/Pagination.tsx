import classes from "./Pagination.module.scss";
import { useEffect, useState } from "react";
//Icons
import ArrowRightIcon from "../assets/icons/chevron-right.svg";
import ArrowLeftIcon from "../assets/icons/chevron-left.svg";

interface IPaginationProps {
  totalPages: number[];
  activePage: number;
  changePage: (page: number) => void;
  totalResults: number;
}

interface IDots {
  before: boolean;
  after: boolean;
}

const Pagination = ({
  totalPages,
  activePage,
  changePage,
  totalResults,
}: IPaginationProps) => {
  const [dots, setDots] = useState<IDots>({ before: false, after: false });

  // Set Dots
  useEffect(() => {
    if (activePage > 4) {
      setDots((prevState) => ({ ...prevState, before: true }));
    } else if (activePage <= 4) {
      setDots((prevState) => ({ ...prevState, before: false }));
    } else if (activePage <= totalPages[totalPages.length - 1] - 4) {
      setDots((prevState) => ({ ...prevState, after: true }));
    } else if (activePage > totalPages[totalPages.length - 1] - 4) {
      setDots((prevState) => ({ ...prevState, after: false }));
    }
  }, [activePage, totalPages]);

  return (
    <section className={classes.paginationSection}>
      <div className={classes.pageContainer}>
        <img
          src={ArrowLeftIcon}
          alt="Last"
          className={classes.pageArrow}
          onClick={() => changePage(Math.max(1, activePage - 1))}
        />
        Seite:
        <span
          className={activePage !== 1 ? classes.pageBtn : classes.activePageBtn}
          onClick={() => changePage(1)}
        >
          1
        </span>
        {dots.before && <span className={classes.dots}>...</span>}
        {totalPages
          .slice(1) //Delete fist Page
          .slice(0, -1) //Delete Last Page
          .slice(
            Math.max(0, activePage - 4),
            Math.min(activePage + 1, totalPages.length)
          )
          .map((page) => (
            <span
              key={page}
              onClick={() => changePage(page)}
              className={
                activePage === page ? classes.activePageBtn : classes.pageBtn
              }
            >
              {page}
            </span>
          ))}
        {dots.after && <span className={classes.dots}>...</span>}
        <span
          className={
            activePage !== totalPages.length
              ? classes.pageBtn
              : classes.activePageBtn
          }
          onClick={() => changePage(totalPages.length - 1)}
        >
          {totalPages[totalPages.length - 1]}
        </span>
        <img
          src={ArrowRightIcon}
          alt="Next"
          className={classes.pageArrow}
          onClick={() =>
            changePage(Math.min(activePage + 1, totalPages.length))
          }
        />
      </div>

      <div className={classes.totalResults}>
        Anzahl Ergebnisse: {totalResults}
      </div>
    </section>
  );
};

export default Pagination;
