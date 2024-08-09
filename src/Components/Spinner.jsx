function Spinner(props) {
  return (
    <>
      <style>
        {`.spinner {
            border: 5px solid ${props.mode ? "white" : "black"};
            border-top: 5px solid ${props.mode ? "black" : "white"};
            border-radius: 50%;
            width: 25px;
            height: 25px;
            animation: spin 1s linear infinite;
            backgroundColor: ${props.mode ? "white" : "black"}
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
            }`}
      </style>
      <div className="spinner"></div>
    </>
  );
}

export default Spinner;
