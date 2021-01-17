//  var url = 'http://localhost:5000'
var url = ''
export const Link = {
  baseUrl: {
    LogInUrl: url + "/login",
    RegisterUrl:url+ "/signup",
   
    MyPostsUrl:url+"/blogs/me",
    AllPostsUrl:url+"/blogs",
           
    MyProfileUrl: url+"/users/profile",
    UpdateProfileUrl: url +"/users",
    UploadPostUrl: url+"/blogs",
    UploadLikeUrl: url+"/blogs/",
    
  },
};
