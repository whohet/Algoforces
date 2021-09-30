import { useContext } from "react";
import { Redirect, Route } from "react-router";
import UserContext from "../context/UserContext";

export default function PrivateRoute(props) {
  const { isAuthenticated } = useContext(UserContext);
  const { component: Component, ...rest } = props;

  if (isAuthenticated) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: `${props.location.pathname}${props.location.search}` },
        }}
      />
    );
  }
}
