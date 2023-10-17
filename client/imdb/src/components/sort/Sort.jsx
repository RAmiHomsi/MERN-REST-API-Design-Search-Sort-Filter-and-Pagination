import styles from "./style.module.css";

const Sort = ({ sort, setSort }) => {
  const onSelectChange = (e) => {
    setSort({ sort: e.target.value, order: sort.order });
  };

  const onArrowChange = () => {
    if (sort.order === "asc") {
      setSort({ sort: sort.sort, order: "desc" });
    } else {
      setSort({ sort: sort.sort, order: "asc" });
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.sort_by}>Sort By :</p>
      <select
        onChange={onSelectChange}
        className={styles.select}
        value={sort.sort}
      >
        <option value="year">Year</option>
        <option value="rating">Rating</option>
      </select>
      <button className={styles.arrow_btn} onClick={onArrowChange}>
        <p className={styles.up_arrow}>&uarr;</p>
        <p className={styles.down_arrow}>&darr;</p>
      </button>
    </div>
  );
};

export default Sort;
