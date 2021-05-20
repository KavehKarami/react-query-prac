import React from "react";

const People = ({ person }) => {
  return (
    <div className="card">
      <h3>{person.name}</h3>
      <p>Gender - {person.gender}</p>
      <p>Birth Year - {person.birth__year}</p>
    </div>
  );
};

export default People;
