import React from "react";
import { Route, Redirect } from "react-router-dom";

export const Protectedroutes = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem("user") === null) {
            return (
                <Redirect
                    to={{
                    pathname: "/",
                    state: {
                        from: props.location
                    }
                    }}
                />
                );
        } else {
            return <Component {...props} />;
        }
      }}
    />
  );
};
