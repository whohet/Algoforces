import { useState, useEffect } from "react";
import { isLoggedInAPI } from "../../api/userAuth";

function Home() {
  const [status, setStatus] = useState(false);

  const checkLoginStatus = async () => {
    try {
      const res = await isLoggedInAPI();
      if (res) {
        setStatus(res.success);
      }
    } catch (err) {}
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);
  return <div>Is Logged In: {status ? "True" : "False"}</div>;
}

export default Home;
