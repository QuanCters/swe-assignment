/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const PrivatePrintingHistoryLazyImport = createFileRoute(
  '/_private/printing-history',
)()
const PrivatePrintPrintLazyImport = createFileRoute('/_private/_print/print')()
const PrivatePrintConfigPageLazyImport = createFileRoute(
  '/_private/_print/config-page',
)()
const PrivatePrintChoosePrinterLazyImport = createFileRoute(
  '/_private/_print/choose-printer',
)()

// Create/Update Routes

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const PrivatePrintingHistoryLazyRoute = PrivatePrintingHistoryLazyImport.update(
  {
    id: '/_private/printing-history',
    path: '/printing-history',
    getParentRoute: () => rootRoute,
  } as any,
).lazy(() =>
  import('./routes/_private/printing-history.lazy').then((d) => d.Route),
)

const PrivatePrintPrintLazyRoute = PrivatePrintPrintLazyImport.update({
  id: '/_private/_print/print',
  path: '/print',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/_private/_print/print.lazy').then((d) => d.Route),
)

const PrivatePrintConfigPageLazyRoute = PrivatePrintConfigPageLazyImport.update(
  {
    id: '/_private/_print/config-page',
    path: '/config-page',
    getParentRoute: () => rootRoute,
  } as any,
).lazy(() =>
  import('./routes/_private/_print/config-page.lazy').then((d) => d.Route),
)

const PrivatePrintChoosePrinterLazyRoute =
  PrivatePrintChoosePrinterLazyImport.update({
    id: '/_private/_print/choose-printer',
    path: '/choose-printer',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./routes/_private/_print/choose-printer.lazy').then((d) => d.Route),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_private/printing-history': {
      id: '/_private/printing-history'
      path: '/printing-history'
      fullPath: '/printing-history'
      preLoaderRoute: typeof PrivatePrintingHistoryLazyImport
      parentRoute: typeof rootRoute
    }
    '/_private/_print/choose-printer': {
      id: '/_private/_print/choose-printer'
      path: '/choose-printer'
      fullPath: '/choose-printer'
      preLoaderRoute: typeof PrivatePrintChoosePrinterLazyImport
      parentRoute: typeof rootRoute
    }
    '/_private/_print/config-page': {
      id: '/_private/_print/config-page'
      path: '/config-page'
      fullPath: '/config-page'
      preLoaderRoute: typeof PrivatePrintConfigPageLazyImport
      parentRoute: typeof rootRoute
    }
    '/_private/_print/print': {
      id: '/_private/_print/print'
      path: '/print'
      fullPath: '/print'
      preLoaderRoute: typeof PrivatePrintPrintLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/login': typeof LoginRoute
  '/printing-history': typeof PrivatePrintingHistoryLazyRoute
  '/choose-printer': typeof PrivatePrintChoosePrinterLazyRoute
  '/config-page': typeof PrivatePrintConfigPageLazyRoute
  '/print': typeof PrivatePrintPrintLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/login': typeof LoginRoute
  '/printing-history': typeof PrivatePrintingHistoryLazyRoute
  '/choose-printer': typeof PrivatePrintChoosePrinterLazyRoute
  '/config-page': typeof PrivatePrintConfigPageLazyRoute
  '/print': typeof PrivatePrintPrintLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/login': typeof LoginRoute
  '/_private/printing-history': typeof PrivatePrintingHistoryLazyRoute
  '/_private/_print/choose-printer': typeof PrivatePrintChoosePrinterLazyRoute
  '/_private/_print/config-page': typeof PrivatePrintConfigPageLazyRoute
  '/_private/_print/print': typeof PrivatePrintPrintLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/login'
    | '/printing-history'
    | '/choose-printer'
    | '/config-page'
    | '/print'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/login'
    | '/printing-history'
    | '/choose-printer'
    | '/config-page'
    | '/print'
  id:
    | '__root__'
    | '/'
    | '/login'
    | '/_private/printing-history'
    | '/_private/_print/choose-printer'
    | '/_private/_print/config-page'
    | '/_private/_print/print'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  LoginRoute: typeof LoginRoute
  PrivatePrintingHistoryLazyRoute: typeof PrivatePrintingHistoryLazyRoute
  PrivatePrintChoosePrinterLazyRoute: typeof PrivatePrintChoosePrinterLazyRoute
  PrivatePrintConfigPageLazyRoute: typeof PrivatePrintConfigPageLazyRoute
  PrivatePrintPrintLazyRoute: typeof PrivatePrintPrintLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  LoginRoute: LoginRoute,
  PrivatePrintingHistoryLazyRoute: PrivatePrintingHistoryLazyRoute,
  PrivatePrintChoosePrinterLazyRoute: PrivatePrintChoosePrinterLazyRoute,
  PrivatePrintConfigPageLazyRoute: PrivatePrintConfigPageLazyRoute,
  PrivatePrintPrintLazyRoute: PrivatePrintPrintLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/login",
        "/_private/printing-history",
        "/_private/_print/choose-printer",
        "/_private/_print/config-page",
        "/_private/_print/print"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_private/printing-history": {
      "filePath": "_private/printing-history.lazy.tsx"
    },
    "/_private/_print/choose-printer": {
      "filePath": "_private/_print/choose-printer.lazy.tsx"
    },
    "/_private/_print/config-page": {
      "filePath": "_private/_print/config-page.lazy.tsx"
    },
    "/_private/_print/print": {
      "filePath": "_private/_print/print.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
