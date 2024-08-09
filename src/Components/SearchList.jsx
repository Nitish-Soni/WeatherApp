import { fetchWeather } from "../function";
import Spinner from "./Spinner";

export default function SearchList(props) {
  async function displayWeather(cityName) {
    try {
      props.setDataLoading(true);
      props.setSearchString("");
      props.setSearchResult([]);
      const data = await fetchWeather(cityName);
      props.setData(data);
      props.setDataLoading(false);
    } catch (error) {
      console.error("Error displaying weather data:", error);
    }
  }
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          zIndex:"9999"
        }}
      >
        {props.SearchLoading ? (
          <div
            style={{
              height: "10vh",
              width: "70%",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: `${props.mode ? "white" : "black"}`,
            }}
          >
            <Spinner mode={props.mode} />
          </div>
        ) : (
          <div
            style={{
              borderRadius: "10px",
              width: "70%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              backgroundColor: `${props.mode ? "white" : "black"}`,
              padding: "10px",
            }}
          >
            {props.SearchResult.map((item) => {
              return (
                <div
                  key={item.id}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                  }}
                >
                  <button
                    style={{
                      border: "none",
                      display: "flex",
                      justifyContent: "start",
                      textAlign: "start",
                      backgroundColor: "transparent",
                      color: `${props.mode ? "black" : "white"}`,
                      fontSize: "15px",
                      padding: "10px",
                      width: "100%",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      displayWeather(item.name);
                    }}
                  >
                    {item.name}, {item.region}, {item.country}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
