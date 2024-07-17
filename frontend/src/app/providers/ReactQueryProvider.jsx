"use client";

import {QueryClientProvider, QueryClient, useQueryClient} from "@tanstack/react-query";
import React, { useState } from "react";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
const ReactQueryProvider = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default ReactQueryProvider;