```bash
import asyncComponent from 'react-async-component';
export const routes = [
  {
    path: '/toLogin',
    component: asyncComponent(() => import(/* webpackChunkName: "status" */ '@/views/status/toLogin'))
  },
  {
    path: '/404',
    component: asyncComponent(() => import(/* webpackChunkName: "status" */ '@/views/status/404'))
  },
  {
    path: '/403',
    component: asyncComponent(() => import(/* webpackChunkName: "status" */ '@/views/status/403'))
  },
]
```