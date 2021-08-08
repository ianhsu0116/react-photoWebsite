import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Picture from "../components/Picture";

const Homepage = () => {
  let [input, setInput] = useState("");
  let [data, setData] = useState(null);
  let [page, setPage] = useState(1);
  let [currentSearch, setCurrentSearch] = useState("");
  const auth = "563492ad6f91700001000001662e0a63651844569065cc5dee6fc6e4";
  const initialURL = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const searchURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=1`;

  // fetch data from pexels API
  const search = async (url) => {
    setPage(2);
    const fetchData = await fetch(url, {
      mathod: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    const parsedData = await fetchData.json();
    setData(parsedData.photos);
  };

  // fetch for more pictures
  const morePicture = async () => {
    let newURL;
    if (currentSearch === "") {
      newURL = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
    }
    setPage(page + 1);
    const fetchData = await fetch(newURL, {
      mathod: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    const parsedData = await fetchData.json();
    if (data) {
      setData(data.concat(parsedData.photos));
    } else {
      setData(parsedData.photos);
    }
  };

  // fetch data when the page loads up
  useEffect(() => {
    search(initialURL);
  }, []);

  // fetch data when click the loadMore btn
  useEffect(() => {
    if (currentSearch === "") {
      search(initialURL);
    } else {
      search(searchURL);
    }
  }, [currentSearch]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          setCurrentSearch(input);
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {data &&
          data.map((d) => {
            return <Picture data={d} />;
          })}
      </div>
      <div className="morePicture">
        <button onClick={morePicture}>Load More</button>
      </div>
    </div>
  );
};

export default Homepage;
