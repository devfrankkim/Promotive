import ReactDOM from "react-dom/client";

import App from "./App";

import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <BrowserRouter>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  </BrowserRouter>
);
