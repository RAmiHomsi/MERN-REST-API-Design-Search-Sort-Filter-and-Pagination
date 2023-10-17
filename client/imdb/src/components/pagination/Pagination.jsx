import React from "react";
import styles from "./style.module.css";

const Pagination = ({ page, total, limit, setPage }) => {
  const totalPages = Math.ceil(total / limit); // if 30 movies => 30/10=3 pages
  const totalPagesArray = [];

  for (let i = 1; i <= totalPages; i++) {
    totalPagesArray.push(i);
  }
  const onClick = (newPage) => {
    setPage(newPage + 1);
  };
  return (
    <div className={styles.container}>
      {totalPages > 0 &&
        totalPagesArray.map((val, index) => (
          <button
            onClick={() => onClick(index)}
            className={
              page === index + 1
                ? `${styles.page_btn} ${styles.active}`
                : styles.page_btn
            }
            key={index}
          >
            {index + 1}
          </button>
        ))}
    </div>
  );
};

export default Pagination;
