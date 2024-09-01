/* eslint-disable react/prop-types */
function Footer(props) {
  return (
    <>
      <footer
        style={{
          width: "100%",
          margin: "0",
          padding: "0",
          backgroundColor: `${props.mode ? "black" : "white"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "960" }}>
          &copy; Nitish Soni. All rights reserved.
        </div>
      </footer>
    </>
  );
}

export default Footer;
