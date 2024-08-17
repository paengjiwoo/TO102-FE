import { FC } from "react";
import { useRouterState, type NotFoundRouteProps } from "@tanstack/react-router";

const Error: FC<NotFoundRouteProps> = (_props) => {
  const state = useRouterState();

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f8d7da",
        color: "#721c24",
        borderRadius: "5px",
        border: "1px solid #f5c6cb",
        margin: "20px 0",
      }}
    >
        <div>
            <i>Warning:</i> Simulated route not found for path <code>{state.location.href}</code>
        </div>
    </div>
  );
};

export default Error;
