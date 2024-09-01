/* eslint-disable react/prop-types */
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchCityList, fetchWeather } from "../function";

function Navbar(props) {
  async function displayWeather(cityName) {
    try {
      const data = await fetchWeather(cityName);
      props.setData(data);
    } catch (error) {
      console.error("Error displaying weather data:", error);
    }
  }
  async function fetchSearch(CityString) {
    props.setSearchLoading(true);
    try {
      const data = await fetchCityList(CityString);
      props.setSearchResult(data);
      props.setSearchLoading(false);
    } catch (error) {
      console.error("Error displaying weather data:", error);
    }
  }

  return (
    <>
      <nav
        style={{
          width: "100%",
          height: "75px",
          margin: "0",
          padding: "0",
          backgroundColor: `${props.mode ? "black" : "white"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            margin: "0",
            padding: "0",
            paddingLeft: "5px",
            paddingRight: "5px",
          }}
        >
          <h3 style={{ margin: "0", padding: "0", marginLeft: "2%" }}>
            {"</>"}
          </h3>
          <form
            id="SearchForm"
            name="SearchForm"
            onSubmit={(event) => {
              event.preventDefault();
              displayWeather(props.SearchString);
              props.setSearchString("");
            }}
            style={{
              margin: "0",
              padding: "0",
              marginLeft: "10%",
              marginRight: "10%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "1",
            }}
          >
            <input
              id="Input"
              type="text"
              className={`${props.mode ? "dark" : "light"}`}
              style={{
                backgroundColor: "transparent",
                border: `2px solid ${props.mode ? "white" : "black"}`,
                borderRadius: "10px",
                height: "25px",
                width: "100%",
                paddingRight: "5px",
                paddingLeft: "5px",
                color: `${props.mode ? "white" : "black"}`,
                fontSize: "15px",
              }}
              value={props.SearchString}
              placeholder="Search"
              onChange={(event) => {
                props.setSearchString(event.target.value);
              }}
              onKeyUp={() => {
                if (props.SearchString !== "") {
                  fetchSearch(props.SearchString);
                } else {
                  props.setSearchResult([]);
                }
              }}
            />
          </form>
          {props.mode ? (
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                fontSize: "25px",
                margin: "0",
                padding: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "2%",
              }}
              onClick={() => {
                props.setMode(!props.mode);
              }}
            >
              <FontAwesomeIcon icon={faToggleOn} style={{ color: "white" }} />
            </button>
          ) : (
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                fontSize: "25px",
                margin: "0",
                padding: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "2%",
              }}
              onClick={() => {
                props.setMode(!props.mode);
              }}
            >
              <FontAwesomeIcon icon={faToggleOff} style={{ color: "black" }} />
            </button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
