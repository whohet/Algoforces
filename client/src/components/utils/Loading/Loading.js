import React from "react";
import Spinner from "../../../assets/spinner.svg";

function Loading() {
  return (
    <div style={{ width: "100%", height: "100%", lineHeight: "100vh", textAlign: "center" }}>
      <img src={Spinner} alt="Loading..." width="80px" style={{ verticalAlign: "middle" }} />
    </div>
  );
}

export default Loading;
