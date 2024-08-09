import { useEffect, useState } from "react";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import { fetchWeather } from "./function";
import SearchList from "./Components/SearchList";
import Spinner from "./Components/Spinner";

function App() {
  const [mode, setMode] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [SearchResult, setSearchResult] = useState([]);
  const [SearchLoading, setSearchLoading] = useState(false);
  const [SearchString, setSearchString] = useState("");
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    function getCurrentLocation() {
      return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              resolve({ latitude, longitude });
            },
            (error) => {
              reject(`Error code: ${error.code}, Message: ${error.message}`);
            },
            {
              enableHighAccuracy: true,
            }
          );
        } else {
          reject("Geolocation is not supported by this browser.");
        }
      });
    }
    async function getWeather() {
      try {
        const { latitude, longitude } = await getCurrentLocation();
        const weatherData = await fetchWeather(latitude + "," + longitude);
        setData(weatherData);
        setDataLoading(false);
      } catch (err) {
        setError(err);
      }
    }

    getWeather();
  }, []);

  return (
    <>
      {data.length === 0 ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Spinner />
        </div>
      ) : (
        <div
          style={{
            margin: "0",
            padding: "0",
            width: "100%",
            backgroundColor: `${mode ? "black" : "white"}`,
            color: `${mode ? "white" : "black"}`,
          }}
        >
          <Navbar
            mode={mode}
            setMode={setMode}
            setData={setData}
            setSearchResult={setSearchResult}
            setSearchLoading={setSearchLoading}
            setSearchString={setSearchString}
            SearchString={SearchString}
          />
          {SearchResult.length === 0 ? null : (
            <SearchList
              SearchLoading={SearchLoading}
              SearchResult={SearchResult}
              mode={mode}
              setData={setData}
              setSearchResult={setSearchResult}
              setSearchString={setSearchString}
              setDataLoading={setDataLoading}
            />
          )}
          <Home
            mode={mode}
            data={data}
            dataLoading={dataLoading}
            setSearchResult={setSearchResult}
            setSearchString={setSearchString}
          />
          <Footer mode={mode} />
        </div>
      )}
    </>
  );
}

export default App;
