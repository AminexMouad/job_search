import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';

export const queryClient = new QueryClient();

export default function APIProvider({children}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
