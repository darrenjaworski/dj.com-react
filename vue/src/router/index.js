import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Journalism from '@/components/Journalism';
import Projects from '@/components/Projects';
// import Fiction from '@/components/Fiction';
// import FictionSingle from '@/components/FictionSingle';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/journalism',
      name: 'Journalism',
      component: Journalism,
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects,
    },
    // {
    //   path: '/fiction',
    //   name: 'Fiction',
    //   component: Fiction,
    // },
    // {
    //   path: '/fiction/:id',
    //   name: 'Fiction',
    //   component: FictionSingle,
    // },
  ],
});
