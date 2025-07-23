import { Route, Routes } from 'react-router';
import type { RouteType } from './routes.tsx';

type Props = {
  routes: RouteType[];
};

export function RouterConfiguration(props: Props) {
  const renderRoute = (routes: RouteType[]) =>
    routes.map((route) => (
      <Route element={route.element()} path={route.path} key={route.path}>
        {route.children && renderRoute(route.children)}
      </Route>
    ));

  return <Routes>{renderRoute(props.routes)}</Routes>;
}
