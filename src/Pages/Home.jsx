/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import Spinner from "../Components/Spinner";
import Sunrise from "../assets/sunrise.png";
import Sunset from "../assets/sunset.png";

function Home(props) {
  let HourForecastData = [];
  let currentTimewithSeconda = Date.now();
  const millisInAnHour = 3600 * 1000;
  let currentTime =
    Math.floor(currentTimewithSeconda / millisInAnHour) * millisInAnHour;
  let firstForecast = props.data.forecast.forecastday[0].hour;
  let secondForecast = props.data.forecast.forecastday[1].hour;
  for (let i = 0; i < firstForecast.length; i++) {
    let foreCastTime = firstForecast[i].time;
    let ISOTime = foreCastTime.replace(" ", "T");
    let date = new Date(ISOTime);
    let timeMillisecond = date.getTime();
    if (currentTime <= timeMillisecond) {
      HourForecastData.push(firstForecast[i]);
      let time = Number(
        firstForecast[i].time[11] +
          firstForecast[i].time[12] +
          "." +
          firstForecast[i].time[14] +
          firstForecast[i].time[15]
      );
      let sunset =
        parseFloat(
          props.data.forecast.forecastday[0].astro.sunset[0] +
            props.data.forecast.forecastday[0].astro.sunset[1] +
            "." +
            props.data.forecast.forecastday[0].astro.sunset[3] +
            props.data.forecast.forecastday[0].astro.sunset[4]
        ) + 12;
      let sunrise = parseFloat(
        props.data.forecast.forecastday[0].astro.sunrise[0] +
          props.data.forecast.forecastday[0].astro.sunrise[1] +
          "." +
          props.data.forecast.forecastday[0].astro.sunrise[3] +
          props.data.forecast.forecastday[0].astro.sunrise[4]
      );
      if (time <= sunrise && sunrise < time + 1) {
        HourForecastData.push({
          time: sunrise,
          temp_c: "Sunrise",
        });
      }
      if (time <= sunset && sunset < time + 1) {
        HourForecastData.push({
          time: sunset,
          temp_c: "Sunset",
        });
      }
    }
  }
  let duplicate = [...HourForecastData];
  for (let i = 0; i < 25 - duplicate.length; i++) {
    let time = Number(
      firstForecast[i].time[11] +
        firstForecast[i].time[12] +
        "." +
        firstForecast[i].time[14] +
        firstForecast[i].time[15]
    );
    let sunset =
      parseFloat(
        props.data.forecast.forecastday[1].astro.sunset[0] +
          props.data.forecast.forecastday[1].astro.sunset[1] +
          "." +
          props.data.forecast.forecastday[1].astro.sunset[3] +
          props.data.forecast.forecastday[1].astro.sunset[4]
      ) + 12;
    let sunrise = parseFloat(
      props.data.forecast.forecastday[1].astro.sunrise[0] +
        props.data.forecast.forecastday[1].astro.sunrise[1] +
        "." +
        props.data.forecast.forecastday[1].astro.sunrise[3] +
        props.data.forecast.forecastday[1].astro.sunrise[4]
    );
    HourForecastData.push(secondForecast[i]);

    if (time <= sunrise && sunrise < time + 1) {
      HourForecastData.push({
        time: sunrise,
        temp_c: "Sunrise",
      });
    }
    if (time <= sunset && sunset < time + 1) {
      HourForecastData.push({
        time: sunset,
        temp_c: "Sunset",
        condition: { icon: { Sunset } },
      });
    }
  }

  return (
    <>
      {props.dataLoading ? (
        <div
          style={{
            width: "100%",
            margin: "0",
            padding: "0",
            minHeight: "95vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Spinner />
        </div>
      ) : (
        <div
          onClick={() => {
            props.setSearchResult([]);
          }}
          style={{
            width: "100%",
            margin: "25px 0 0 0",
            padding: "0",
            minHeight: "95vh",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "300px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "0",
              padding: "10px",
              backgroundColor: `${
                props.mode ? "rgba(255, 255, 255, 0.10)" : "rgba(0, 0, 0, 0.10)"
              }`,
              borderRadius: "10px",
              transformStyle: "preserve-3d",
              transform: "translateZ(0)",
              transition: "transform 0.5s ease",
              boxShadow: `0 20px 40px ${
                props.mode ? "rgba(255, 255, 255, 0.10)" : "rgba(0, 0, 0, 0.10)"
              }`,
            }}
          >
            <h3
              style={{
                margin: "0",
                padding: "0",
                width: "100%",
                textAlign: "center",
              }}
            >
              {props.data.location.name}
            </h3>
            <h1
              style={{
                margin: "0",
                padding: "0",
                width: "100%",
                textAlign: "center",
              }}
            >
              {Math.floor(props.data.current.temp_c)} &deg;C
            </h1>
            <img
              src={props.data.current.condition.icon}
              alt="..."
              style={{ marginTop: "5px", marginBottom: "5px" }}
            />
            <h4
              style={{
                margin: "0",
                padding: "0",
                width: "100%",
                textAlign: "center",
              }}
            >
              {props.data.current.condition.text}
            </h4>
            <div
              style={{
                display: "flex",
                margin: "5px 0 0 0",
                padding: "0",
                justifyContent: "center",
                alignItems: "center",
                width: "200px",
              }}
            >
              <h5
                style={{
                  margin: "0",
                  padding: "0",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                H: {props.data.forecast.forecastday[0].day.maxtemp_c} &deg;C
              </h5>
              <h5
                style={{
                  margin: "0",
                  padding: "0",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                L: {props.data.forecast.forecastday[0].day.mintemp_c} &deg;C
              </h5>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "90%",
              padding: "10px",
              margin: "40px 0 0 0",
              backgroundColor: `${
                props.mode ? "rgba(255, 255, 255, 0.10)" : "rgba(0, 0, 0, 0.10)"
              }`,
              borderRadius: "10px",
              transformStyle: "preserve-3d",
              transform: "translateZ(0)",
              transition: "transform 0.5s ease",
              boxShadow: `0 20px 40px ${
                props.mode ? "rgba(255, 255, 255, 0.10)" : "rgba(0, 0, 0, 0.10)"
              }`,
            }}
          >
            <div style={{ width: "90%", textAlign: "center" }}>
              --Today's Weather Overview--
              <div
                style={{
                  width: "100%",
                  margin: "0",
                  padding: "0",
                  borderTop: `1px solid ${props.mode ? "white" : "black"}`,
                }}
              ></div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                overflow: "scroll",
                margin: "20px 0 0 0",
                alignItems: "center",
                justifyContent: "start",
                paddingBottom: "10px",
              }}
            >
              {HourForecastData.map((item) => {
                return (
                  <div
                    key={item.time}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0",
                      marginRight: "10px",
                      padding: "10px",
                    }}
                  >
                    {item.temp_c === "Sunrise" ? (
                      <div style={{ width: "100%", textAlign: "center" }}>
                        0{item.time.toFixed(2)}
                      </div>
                    ) : item.temp_c === "Sunset" ? (
                      <div style={{ width: "100%", textAlign: "center" }}>
                        {item.time.toFixed(2)}
                      </div>
                    ) : (
                      <div style={{ width: "100%", textAlign: "center" }}>
                        {item.time[11] + item.time[12]}
                      </div>
                    )}
                    {item.temp_c === "Sunrise" ? (
                      <img
                        src={Sunrise}
                        alt="Sunrise Icon"
                        style={{
                          width: "80px",
                          height: "80px",
                          margin: "5px 0 0 0",
                          marginBottom: "5px",
                        }}
                      />
                    ) : item.temp_c === "Sunset" ? (
                      <img
                        src={Sunset}
                        alt="Sunset Icon"
                        style={{
                          width: "80px",
                          height: "80px",
                          margin: "5px 0 5px 0",
                        }}
                      />
                    ) : (
                      <img
                        src={item.condition.icon}
                        alt="Default Icon"
                        style={{
                          width: "80px",
                          height: "80px",
                          mmargin: "5px 0 5px 0",
                        }}
                      />
                    )}
                    <div style={{ width: "50px", textAlign: "center" }}>
                      {typeof item.temp_c === "number"
                        ? `${Math.floor(item.temp_c)} °C`
                        : `${item.temp_c}`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>Hello</div>
        </div>
      )}
    </>
  );
}

export default Home;
