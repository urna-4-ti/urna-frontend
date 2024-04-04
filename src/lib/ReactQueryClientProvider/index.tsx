'use client'
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../queryClient";
import { Children, ReactNode } from "react";


export default function ReactQueryClientProvider({children} : {children:ReactNode}) {
  return(
    <QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
  )
}