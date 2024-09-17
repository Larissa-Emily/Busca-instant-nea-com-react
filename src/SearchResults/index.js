import React from "react";

const SearchResults = ({ data }) => {
  if (!data || !data.length) return;

  const resultList = data.map((item, idx) =>{
    const {rank, nome} = item;
    return(
        <li key={rank}>
            <span>{nome}</span>
        </li>
    )
  })

  return (
    <div className="search-results">
      <ul>{resultList}</ul>
    </div>
  );
};

export default SearchResults;
