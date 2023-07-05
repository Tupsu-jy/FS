import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "./contexts/UserContext";
import {
  NotificationContext,
  NotificationProvider,
} from "./contexts/NotificationContext";
import App from "./App";
import "./styles.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <NotificationProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </NotificationProvider>
    </UserProvider>
  </React.StrictMode>
);
