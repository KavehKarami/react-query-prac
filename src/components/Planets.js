import React, { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async (page) => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);

  const { data, status, isPreviousData } = useQuery(
    ["planets", page],
    () => fetchPlanets(page),
    { keepPreviousData: true }
  );

  return (
    <div>
      <h2>Planets</h2>

      {status === "error" && <div>Error Fetching Data</div>}
      {status === "loading" && <div>Loading Fetching Data</div>}
      {status === "success" && (
        <React.Fragment>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            Prev Page
          </button>
          <span>{page}</span>
          <button
            onClick={() =>
              setPage((old) => (!isPreviousData && data.next ? old + 1 : old))
            }
            disabled={!isPreviousData && data.next ? false : true}
          >
            Next Page
          </button>
          <div>
            {data.results.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Planets;
