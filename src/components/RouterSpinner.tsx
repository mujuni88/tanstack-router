import React from "react"
import { useRouterState } from "@tanstack/react-router"
import { Spinner } from "./Spinner"

export function RouterSpinner() {
  const isLoading = useRouterState({ select: (s) => s.status === 'pending' })
  return <Spinner show={isLoading} />
}