import { lazy, useEffect } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import HomeView from 'views/dashboard/HomeView';

// dashboard routing
//const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const ProjectsOverview = Loadable(lazy(() => import('views/dashboard/ProjectsOverview')));
const ProjectDetailedView = Loadable(lazy(() => import('views/dashboard/ProjectDetailedView')));
const CustomerView = Loadable(lazy(() => import('views/dashboard/CustomerView')));

const AdminView = Loadable(lazy(() => import('views/dashboard/AdminView')));
const ManageAccounts = Loadable(lazy(() => import('views/dashboard/AdminView/ManageAccounts')));
const ViewAccounts = Loadable(lazy(() => import('views/dashboard/AdminView/ManageAccounts/ViewAccounts')));
const AddAccount = Loadable(lazy(() => import('views/dashboard/AdminView/ManageAccounts/AddAccount')));
const EditAccount = Loadable(lazy(() => import('views/dashboard/AdminView/ManageAccounts/EditAccount')));


//const ManageProjects = Loadable(lazy(() => import('views/dashboard/AdminView/ManageProjects')));
const AddProject = Loadable(lazy(() => import('views/dashboard/AdminView/ManageProjects/AddProject')));
const EditProject = Loadable(lazy(() => import('views/dashboard/AdminView/ManageProjects/EditProject')));

const ManageContent = Loadable(lazy(() => import('views/dashboard/AdminView/ManageContent')));
const Academy = Loadable(lazy(() => import('views/dashboard/AdminView/ManageContent/Academy')));
const Appreciations = Loadable(lazy(() => import('views/dashboard/AdminView/ManageContent/Appreciations')));
const BlueboltIdeas = Loadable(lazy(() => import('views/dashboard/AdminView/ManageContent/BlueboltIdeas')));
const IndustryNews = Loadable(lazy(() => import('views/dashboard/AdminView/ManageContent/IndustryNews')));
const Operations = Loadable(lazy(() => import('views/dashboard/AdminView/ManageContent/Operations')));
const Releases = Loadable(lazy(() => import('views/dashboard/AdminView/ManageContent/Releases')));
const Wins = Loadable(lazy(() => import('views/dashboard/AdminView/ManageContent/Wins')));
const WorkAnniversaries = Loadable(lazy(() => import('views/dashboard/AdminView/ManageContent/WorkAnniversaries')));


// ==============================|| MAIN ROUTING ||============================== //

export default function Router() {
  useEffect(() => {
    console.log('loaded ROUTE');
  }, []);
  const routes = useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <HomeView />
        },
        {
          path: 'dashboard',
          children: [
            { element: <Navigate to="/dashboard/home" />, index: true },
            {
              path: 'home',
              element: <HomeView />
            },
            {
              path: 'projects',
              element: <ProjectsOverview />
            },
            {
              path: 'projectview/:id',
              element: <ProjectDetailedView />
            },
            {
              path: 'customers/:id',
              element: <ProjectDetailedView />
            },
            {
              path: 'customers',
              element: <CustomerView />
            },
          ]
        },
        {
          path: 'admin',
          element: <AdminView />,
          children: [
            { element: <Navigate to="/admin/manageAccounts" />, index: true },
            {
              path: 'manageAccounts',
              element: <ManageAccounts />,
              children: [
                { element: <Navigate to="/admin/manageAccounts/viewAccount" />, index: true },
                {
                  path: 'viewAccount',
                  element: <ViewAccounts />
                },
                {
                  path: 'addAccount',
                  element: <AddAccount />
                },
                {
                  path: 'editAccount/:id',
                  element: <EditAccount />
                },
              ]
            },
          /*   {
              path: 'manageProjects',
              element: <ManageProjects />
            }, */
            {
              path: 'addProject',
              element: <AddProject />
            },
            {
              path: 'editProject/:id',
              element: <EditProject />
            },
            {
              path: 'manageContent',
              element: <ManageContent />,
              children: [
                { element: <Navigate to="manageContent/manageIndustryNews" />, index: true },

                {
                  path: 'manageAcademy',
                  element: <Academy />
                },
                {
                  path: 'manageAppreciations',
                  element: <Appreciations />
                },
                {
                  path: 'manageBlueboltIdeas',
                  element: <BlueboltIdeas />
                },
                {
                  path: 'manageIndustryNews',
                  element: <IndustryNews />
                },
                {
                  path: 'manageOperations',
                  element: <Operations />
                },
                {
                  path: 'manageReleases',
                  element: <Releases />
                },
                {
                  path: 'manageWins',
                  element: <Wins />
                },
                {
                  path: 'manageWorkAnniversaries',
                  element: <WorkAnniversaries />
                },

              ]
            }
          ]
        },
      ]
    },

  ]);

  return routes;
}

/* export default MainRoutes;
 */
