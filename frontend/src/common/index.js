const backendDomin = "http://localhost:8080";

const summaryApi = {
  signUp: {
    url: `${backendDomin}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomin}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomin}/api/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendDomin}/api/userLogout`,
    method: "get",
  },
  alluser: {
    url: `${backendDomin}/api/all-users`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomin}/api/update-user`,
    method: "post",
  },
  uploadPackage: {
    url: `${backendDomin}/api/upload-package`,
    method: "post",
  },
  allPackage: {
    url: `${backendDomin}/api/get-package`,
    method: "get",
  },
  update_package: {
    url: `${backendDomin}/api/update-package`,
    method: "post",
  },
  category_package: {
    url: `${backendDomin}/api/get-category`,
    method: "get",
  },
  category_wise_package: {
    url: `${backendDomin}/api/category-wise-package`,
    method: "post",
  },
  package_details: {
    url: `${backendDomin}/api/package-details`,
    method: "post",
  },
  search_package: {
    url: `${backendDomin}/api/search`,
    method: "get",
  },
  delete_package: {
    url: `${backendDomin}/api/delete-package`,
    method: "post",
  },
  send_email: {
    url: `${backendDomin}/api/send-email`,
    method: "post",
  },
  get_emails: {
    url: `${backendDomin}/api/get-emails`,
    method: "get",
  },
  send_email_message: {
    url: `${backendDomin}/api/send-message`,
    method: "post",
  },
  store_email: {
    url: `${backendDomin}/api/store-message`,
    method: "post",
  },
  get_send_message: {
    url: `${backendDomin}/api/get-send-message`,
    method: "post",
  },
  send_feedback: {
    url: `${backendDomin}/api/add-feedback`,
    method: "post",
  },
  get_feedback: {
    url: `${backendDomin}/api/get-feedback`,
    method: "get",
  },
   delete_feedback: {
     url: `${backendDomin}/api/delete-feedback`,
     method: "post",
   },
   //room api
  uploadRoom: {
    url: `${backendDomin}/api/upload-room`,
    method: "post",
  },
  allRoom: {
    url: `${backendDomin}/api/get-room`,
    method: "get",
  },
  update_Room: {
    url: `${backendDomin}/api/update-room`,
    method: "post",
  },
  category_Room: {
    url: `${backendDomin}/api/get-category-room`,
    method: "get",
  },
  category_wise_Room: {
    url: `${backendDomin}/api/category-wise-room`,
    method: "post",
  },
  Room_details: {
    url: `${backendDomin}/api/room-details`,
    method: "post",
  },
  search_Room: {
    url: `${backendDomin}/api/search`,
    method: "get",
  },
  delete_Room: {
    url: `${backendDomin}/api/delete-room`,
    method: "post",
  },

};

export default summaryApi;
