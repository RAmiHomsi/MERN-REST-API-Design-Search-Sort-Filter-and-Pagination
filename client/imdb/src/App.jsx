import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Table from "./components/table/Table";
import Pagination from "./components/pagination/Pagination";
import Sort from "./components/sort/Sort";
import Genre from "./components/genre/Genre";

function App() {
  const [movies, setMovies] = useState({});
  const [sort, setSort] = useState({ sort: "rating", order: "desc" });
  const [filterGenre, setFilterGenre] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/movies?page=${page}&sort=${sort.sort},${
            sort.order
          }&genre=${filterGenre.toString()}&search=${search}`
        );
        setMovies(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllMovies();
  }, [sort, filterGenre, page, search]);

  return (
    <div className="wrapper ">
      <div className="container ">
        <div className="head">
          <img src="../images/logo.png" alt="logo" className="logo" />
          <input
            type="search"
            className="search"
            placeholder="Enter a movie"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="body">
          <div className="table_container">
            <Table movies={movies.movies ? movies.movies : []} />
            <Pagination
              page={page}
              limit={movies.limit ? movies.limit : 0}
              total={movies.totalMoviesByGenre ? movies.totalMoviesByGenre : 0}
              setPage={(page) => setPage(page)}
            />
          </div>
          <div className="filter_container">
            <Sort sort={sort} setSort={(sort) => setSort(sort)} />
            <Genre
              filterGenre={filterGenre}
              genres={movies.genres ? movies.genres : []}
              setFilterGenre={(genre) => setFilterGenre(genre)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
