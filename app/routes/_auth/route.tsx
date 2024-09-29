import { LoaderFunctionArgs } from '@remix-run/node'
import { isRouteErrorResponse, Outlet, redirect, useRouteError } from '@remix-run/react'

export default function route() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <Outlet />
    </div>
  )
}
export function ErrorBoundary({}) {
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    return(
        <div>Route Error Response: {JSON.stringify(error.status)}</div>
    )
  }
  return(
    <div>Not a route error response</div>
  )
}
