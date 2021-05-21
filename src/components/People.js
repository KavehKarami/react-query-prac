import React, { useState } from "react";
import { useQuery } from "react-query";
import Person from "./Person";

const fetchPeople = async (page) => {
  const res = await fetch(`http://swapi.dev/api/people/?page=${page}`);
  return res.json();
};

const People = () => {
  const [page, setPage] = useState(1);
  const { data, status, isPreviousData } = useQuery(
    ["people", page],
    () => fetchPeople(page),
    { keepPreviousData: true }
  );

  return (
    <div>
      <h2>People</h2>
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
            {data.results.map((person) => (
              <Person key={person.name} person={person} />
            ))}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default People;
