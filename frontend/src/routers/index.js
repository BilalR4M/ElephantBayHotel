import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "pages/Home";
import Offers from "../pages/Offers";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import CategoryPackages from "../pages/CategoryPackage";
import PackageDetails from "../pages/PackageDetails";
import PackageCategoryDetails from "../pages/PackageCategoryDetails";
import SearchPackage from "../pages/SearchPackage";
import Booking from "../pages/Booking";
import Admin from "../layouts/admin";
import Default from "../views/admin/default";
import UsersDetail from "../pages/AllUser";
import OffersDetail from "../pages/AllPackages";
import SendEmail from "../pages/SendEmail"
import Email from "../views/admin/email/index"
import FeedbackForm from "pages/FeedbackForm";
import Feedback from "../views/admin/feedback/feedbackList"
import Rooms from "pages/Rooms";
import AllRooms from "pages/AllRooms";
import AllUser from "../pages/AllUser";
import AdminPannel from "pages/AdminPannel";
import EditEventForm from "components/EditEventForm";
import AddEvent from "components/AddEvent";
import Eventsmain from "components/Eventsmain";
import AllEvents from "components/AllEvents";
import SearchRoom from "pages/SearchRooms";
import RoomCategoryDetails from "pages/RoomCategoryDetails";
import RoomDetails from "pages/RoomDetails";
import CategoryRoom from "pages/CategoryRoom";
import OffersPdf from "components/pdf/Offers_pdf";
import FeedbackPdf from "components/pdf/feedback_pdf";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "offers",
        element: <Offers />,
      },
      {
        path: "rooms",
        element: <Rooms/>,
        exact: true
      },
      {
        path: "offers-pdf",
        element: <OffersPdf />,
      },
      {
        path: "feedback-pdf",
        element: <FeedbackPdf />,
      },
      {
        path: "package-category/:category",
        element: <CategoryPackages />,
      },
      {
        path: "offers/package-details/:id",
        element: <PackageDetails />,
      },
      {
        path: "package-category/:category/package-category-details/:id",
        element: <PackageCategoryDetails />,
      },
      {
        path: "search",
        element: <SearchPackage />,
      },
      {
        path: "booking/:id",
        element: <Booking />,
      },
      {
        path: "send-email/",
        element: <SendEmail />,
      },
      {
        path: "feedback/",
        element: <FeedbackForm />,
      },
      
      {
        path: "Room-category/:category",
        element:<CategoryRoom/>,
        exact: true 
      },{
        path: "Room-details/:id",
        element:<RoomDetails/>,
        exact: true 
      },{
        path: "/Room-category/:category/Room-category-details/:id",
        element:<RoomCategoryDetails/>,
        exact: true
      },{
        path: "searchRooms",
        element:<SearchRoom/>,
        exact: true
      },
      //events
      {
        path:"/mainevents", 
        element:<Eventsmain />,
        exact: true
      }, 
      {
        path:"/add-event", 
        element:<AddEvent />,
        exact: true
      },
      {
        path:"/edit-event/:id", 
        element:<EditEventForm />,
        exact: true
      },
      {
        path: "admin-panel",
        element:<AdminPannel />,
        children : [
          {
            path : "all-users",
            element: <AllUser/>              
          }, 
          {
            path : "all-Rooms",
            element: <AllRooms/>            
          },
          {
            path:"all-events", 
            element:<AllEvents />,
          },

        ]
      },

      // admin panel
      {
        path: "admin",
        element: <Admin />,
        children: [
          {
            path: "default",
            element: <Default />,
          },
          {
            path: "users-detail",
            element: <UsersDetail />,
          },
          {
            path: "offers-detail",
            element: <OffersDetail />,
          },
          {
            path: "email-marketing",
            element: <Email />,
          },
           {
             path: "all-feedback",
             element: <Feedback />,
           },
        ],
      },

    ],
  },
]);
export default router;
