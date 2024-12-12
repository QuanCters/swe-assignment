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
import { Route as PrivateImport } from './routes/_private'
import { Route as PrivateStudentImport } from './routes/_private/_student'
import { Route as PrivateSpsoImport } from './routes/_private/_spso'
import { Route as PrivateSpsoReportImport } from './routes/_private/_spso/report'
import { Route as PrivateSpsoManagePrinterImport } from './routes/_private/_spso/manage/printer'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const PrivatePrintingHistoryLazyImport = createFileRoute(
  '/_private/printing-history',
)()
const PrivateStudentBuyPageLazyImport = createFileRoute(
  '/_private/_student/buy-page',
)()
const PrivateStudentPrintPrintLazyImport = createFileRoute(
  '/_private/_student/_print/print',
)()
const PrivateStudentPrintConfigPageLazyImport = createFileRoute(
  '/_private/_student/_print/config-page',
)()
const PrivateStudentPrintChoosePrinterLazyImport = createFileRoute(
  '/_private/_student/_print/choose-printer',
)()

// Create/Update Routes

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const PrivateRoute = PrivateImport.update({
  id: '/_private',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const PrivatePrintingHistoryLazyRoute = PrivatePrintingHistoryLazyImport.update(
  {
    id: '/printing-history',
    path: '/printing-history',
    getParentRoute: () => PrivateRoute,
  } as any,
).lazy(() =>
  import('./routes/_private/printing-history.lazy').then((d) => d.Route),
)

const PrivateStudentRoute = PrivateStudentImport.update({
  id: '/_student',
  getParentRoute: () => PrivateRoute,
} as any)

const PrivateSpsoRoute = PrivateSpsoImport.update({
  id: '/_spso',
  getParentRoute: () => PrivateRoute,
} as any)

const PrivateStudentBuyPageLazyRoute = PrivateStudentBuyPageLazyImport.update({
  id: '/buy-page',
  path: '/buy-page',
  getParentRoute: () => PrivateStudentRoute,
} as any).lazy(() =>
  import('./routes/_private/_student/buy-page.lazy').then((d) => d.Route),
)

const PrivateSpsoReportRoute = PrivateSpsoReportImport.update({
  id: '/report',
  path: '/report',
  getParentRoute: () => PrivateSpsoRoute,
} as any)

const PrivateStudentPrintPrintLazyRoute =
  PrivateStudentPrintPrintLazyImport.update({
    id: '/_print/print',
    path: '/print',
    getParentRoute: () => PrivateStudentRoute,
  } as any).lazy(() =>
    import('./routes/_private/_student/_print/print.lazy').then((d) => d.Route),
  )

const PrivateStudentPrintConfigPageLazyRoute =
  PrivateStudentPrintConfigPageLazyImport.update({
    id: '/_print/config-page',
    path: '/config-page',
    getParentRoute: () => PrivateStudentRoute,
  } as any).lazy(() =>
    import('./routes/_private/_student/_print/config-page.lazy').then(
      (d) => d.Route,
    ),
  )

const PrivateStudentPrintChoosePrinterLazyRoute =
  PrivateStudentPrintChoosePrinterLazyImport.update({
    id: '/_print/choose-printer',
    path: '/choose-printer',
    getParentRoute: () => PrivateStudentRoute,
  } as any).lazy(() =>
    import('./routes/_private/_student/_print/choose-printer.lazy').then(
      (d) => d.Route,
    ),
  )

const PrivateSpsoManagePrinterRoute = PrivateSpsoManagePrinterImport.update({
  id: '/manage/printer',
  path: '/manage/printer',
  getParentRoute: () => PrivateSpsoRoute,
} as any)

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
    '/_private': {
      id: '/_private'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof PrivateImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_private/_spso': {
      id: '/_private/_spso'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof PrivateSpsoImport
      parentRoute: typeof PrivateImport
    }
    '/_private/_student': {
      id: '/_private/_student'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof PrivateStudentImport
      parentRoute: typeof PrivateImport
    }
    '/_private/printing-history': {
      id: '/_private/printing-history'
      path: '/printing-history'
      fullPath: '/printing-history'
      preLoaderRoute: typeof PrivatePrintingHistoryLazyImport
      parentRoute: typeof PrivateImport
    }
    '/_private/_spso/report': {
      id: '/_private/_spso/report'
      path: '/report'
      fullPath: '/report'
      preLoaderRoute: typeof PrivateSpsoReportImport
      parentRoute: typeof PrivateSpsoImport
    }
    '/_private/_student/buy-page': {
      id: '/_private/_student/buy-page'
      path: '/buy-page'
      fullPath: '/buy-page'
      preLoaderRoute: typeof PrivateStudentBuyPageLazyImport
      parentRoute: typeof PrivateStudentImport
    }
    '/_private/_spso/manage/printer': {
      id: '/_private/_spso/manage/printer'
      path: '/manage/printer'
      fullPath: '/manage/printer'
      preLoaderRoute: typeof PrivateSpsoManagePrinterImport
      parentRoute: typeof PrivateSpsoImport
    }
    '/_private/_student/_print/choose-printer': {
      id: '/_private/_student/_print/choose-printer'
      path: '/choose-printer'
      fullPath: '/choose-printer'
      preLoaderRoute: typeof PrivateStudentPrintChoosePrinterLazyImport
      parentRoute: typeof PrivateStudentImport
    }
    '/_private/_student/_print/config-page': {
      id: '/_private/_student/_print/config-page'
      path: '/config-page'
      fullPath: '/config-page'
      preLoaderRoute: typeof PrivateStudentPrintConfigPageLazyImport
      parentRoute: typeof PrivateStudentImport
    }
    '/_private/_student/_print/print': {
      id: '/_private/_student/_print/print'
      path: '/print'
      fullPath: '/print'
      preLoaderRoute: typeof PrivateStudentPrintPrintLazyImport
      parentRoute: typeof PrivateStudentImport
    }
  }
}

// Create and export the route tree

interface PrivateSpsoRouteChildren {
  PrivateSpsoReportRoute: typeof PrivateSpsoReportRoute
  PrivateSpsoManagePrinterRoute: typeof PrivateSpsoManagePrinterRoute
}

const PrivateSpsoRouteChildren: PrivateSpsoRouteChildren = {
  PrivateSpsoReportRoute: PrivateSpsoReportRoute,
  PrivateSpsoManagePrinterRoute: PrivateSpsoManagePrinterRoute,
}

const PrivateSpsoRouteWithChildren = PrivateSpsoRoute._addFileChildren(
  PrivateSpsoRouteChildren,
)

interface PrivateStudentRouteChildren {
  PrivateStudentBuyPageLazyRoute: typeof PrivateStudentBuyPageLazyRoute
  PrivateStudentPrintChoosePrinterLazyRoute: typeof PrivateStudentPrintChoosePrinterLazyRoute
  PrivateStudentPrintConfigPageLazyRoute: typeof PrivateStudentPrintConfigPageLazyRoute
  PrivateStudentPrintPrintLazyRoute: typeof PrivateStudentPrintPrintLazyRoute
}

const PrivateStudentRouteChildren: PrivateStudentRouteChildren = {
  PrivateStudentBuyPageLazyRoute: PrivateStudentBuyPageLazyRoute,
  PrivateStudentPrintChoosePrinterLazyRoute:
    PrivateStudentPrintChoosePrinterLazyRoute,
  PrivateStudentPrintConfigPageLazyRoute:
    PrivateStudentPrintConfigPageLazyRoute,
  PrivateStudentPrintPrintLazyRoute: PrivateStudentPrintPrintLazyRoute,
}

const PrivateStudentRouteWithChildren = PrivateStudentRoute._addFileChildren(
  PrivateStudentRouteChildren,
)

interface PrivateRouteChildren {
  PrivateSpsoRoute: typeof PrivateSpsoRouteWithChildren
  PrivateStudentRoute: typeof PrivateStudentRouteWithChildren
  PrivatePrintingHistoryLazyRoute: typeof PrivatePrintingHistoryLazyRoute
}

const PrivateRouteChildren: PrivateRouteChildren = {
  PrivateSpsoRoute: PrivateSpsoRouteWithChildren,
  PrivateStudentRoute: PrivateStudentRouteWithChildren,
  PrivatePrintingHistoryLazyRoute: PrivatePrintingHistoryLazyRoute,
}

const PrivateRouteWithChildren =
  PrivateRoute._addFileChildren(PrivateRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '': typeof PrivateStudentRouteWithChildren
  '/login': typeof LoginRoute
  '/printing-history': typeof PrivatePrintingHistoryLazyRoute
  '/report': typeof PrivateSpsoReportRoute
  '/buy-page': typeof PrivateStudentBuyPageLazyRoute
  '/manage/printer': typeof PrivateSpsoManagePrinterRoute
  '/choose-printer': typeof PrivateStudentPrintChoosePrinterLazyRoute
  '/config-page': typeof PrivateStudentPrintConfigPageLazyRoute
  '/print': typeof PrivateStudentPrintPrintLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '': typeof PrivateStudentRouteWithChildren
  '/login': typeof LoginRoute
  '/printing-history': typeof PrivatePrintingHistoryLazyRoute
  '/report': typeof PrivateSpsoReportRoute
  '/buy-page': typeof PrivateStudentBuyPageLazyRoute
  '/manage/printer': typeof PrivateSpsoManagePrinterRoute
  '/choose-printer': typeof PrivateStudentPrintChoosePrinterLazyRoute
  '/config-page': typeof PrivateStudentPrintConfigPageLazyRoute
  '/print': typeof PrivateStudentPrintPrintLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/_private': typeof PrivateRouteWithChildren
  '/login': typeof LoginRoute
  '/_private/_spso': typeof PrivateSpsoRouteWithChildren
  '/_private/_student': typeof PrivateStudentRouteWithChildren
  '/_private/printing-history': typeof PrivatePrintingHistoryLazyRoute
  '/_private/_spso/report': typeof PrivateSpsoReportRoute
  '/_private/_student/buy-page': typeof PrivateStudentBuyPageLazyRoute
  '/_private/_spso/manage/printer': typeof PrivateSpsoManagePrinterRoute
  '/_private/_student/_print/choose-printer': typeof PrivateStudentPrintChoosePrinterLazyRoute
  '/_private/_student/_print/config-page': typeof PrivateStudentPrintConfigPageLazyRoute
  '/_private/_student/_print/print': typeof PrivateStudentPrintPrintLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/login'
    | '/printing-history'
    | '/report'
    | '/buy-page'
    | '/manage/printer'
    | '/choose-printer'
    | '/config-page'
    | '/print'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/login'
    | '/printing-history'
    | '/report'
    | '/buy-page'
    | '/manage/printer'
    | '/choose-printer'
    | '/config-page'
    | '/print'
  id:
    | '__root__'
    | '/'
    | '/_private'
    | '/login'
    | '/_private/_spso'
    | '/_private/_student'
    | '/_private/printing-history'
    | '/_private/_spso/report'
    | '/_private/_student/buy-page'
    | '/_private/_spso/manage/printer'
    | '/_private/_student/_print/choose-printer'
    | '/_private/_student/_print/config-page'
    | '/_private/_student/_print/print'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  PrivateRoute: typeof PrivateRouteWithChildren
  LoginRoute: typeof LoginRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  PrivateRoute: PrivateRouteWithChildren,
  LoginRoute: LoginRoute,
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
        "/_private",
        "/login"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/_private": {
      "filePath": "_private.tsx",
      "children": [
        "/_private/_spso",
        "/_private/_student",
        "/_private/printing-history"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_private/_spso": {
      "filePath": "_private/_spso.tsx",
      "parent": "/_private",
      "children": [
        "/_private/_spso/report",
        "/_private/_spso/manage/printer"
      ]
    },
    "/_private/_student": {
      "filePath": "_private/_student.tsx",
      "parent": "/_private",
      "children": [
        "/_private/_student/buy-page",
        "/_private/_student/_print/choose-printer",
        "/_private/_student/_print/config-page",
        "/_private/_student/_print/print"
      ]
    },
    "/_private/printing-history": {
      "filePath": "_private/printing-history.lazy.tsx",
      "parent": "/_private"
    },
    "/_private/_spso/report": {
      "filePath": "_private/_spso/report.tsx",
      "parent": "/_private/_spso"
    },
    "/_private/_student/buy-page": {
      "filePath": "_private/_student/buy-page.lazy.tsx",
      "parent": "/_private/_student"
    },
    "/_private/_spso/manage/printer": {
      "filePath": "_private/_spso/manage/printer.tsx",
      "parent": "/_private/_spso"
    },
    "/_private/_student/_print/choose-printer": {
      "filePath": "_private/_student/_print/choose-printer.lazy.tsx",
      "parent": "/_private/_student"
    },
    "/_private/_student/_print/config-page": {
      "filePath": "_private/_student/_print/config-page.lazy.tsx",
      "parent": "/_private/_student"
    },
    "/_private/_student/_print/print": {
      "filePath": "_private/_student/_print/print.lazy.tsx",
      "parent": "/_private/_student"
    }
  }
}
ROUTE_MANIFEST_END */
