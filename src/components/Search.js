import React from "react";

const Search = ({ search, setInput }) => {
  const changeHandler = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="search">
      <input onChange={changeHandler} type="text" />
      <button onClick={search}>Search</button>
    </div>
  );
};

export default Search;
