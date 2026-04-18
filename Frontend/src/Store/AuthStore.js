import {create} from 'zustand'
import axios from 'axios'
export const useAuth=create((set)=>({
     currentUser:null,
     isAuthenticated:false,
     loading:false,
     error:null,
     authLoading: true,
     login:async(userCred)=>{
          const {role ,...userCrdObj}=userCred
          try{
               //set loading
               set({loading:true,error:null});
               //grt api call
               let res=await axios.post("http://localhost:4000/common-api/login",userCrdObj,{withCredentials:true});
               //console.log(res)
               //update state
               set({
                    loading:false,
                    isAuthenticated:true,
                    currentUser:res.data.payload
               });
          }catch(err){
               console.log(err.message);
               set({
                    loading:false,
                    error:err.response?.data?.error || 'Login Failed',
                    isAuthenticated:false,
                    currentUser:null
               });
          }
     },
     logout:async ()=>{
          try{
               //set loading state
               set({loading:true,error:null})
               //make logout api reg
               let res=await axios.get("http://localhost:4000/common-api/logout",{withCredentials:true})
               set({
                    loading:false,
                    isAuthenticated:false,
                    currentUser:null
               });
          }catch(err){
               set({
                    loading:false,
                    error:err.response?.data?.error || 'Logout Failed',
                    isAuthenticated:false,
                    currentUser:null
               })
          }
     },
     // restore login
  checkAuth: async () => {
     try {
          set({ loading: true });
          const res = await axios.get("http://localhost:4000/common-api/check-auth", { withCredentials: true });
          set({
               currentUser: res.data.payload,
               isAuthenticated: true,
               loading: false,
          });
          } catch (err) {
               // If user is not logged in → do nothing
               if (err.response?.status === 401) {
                    set({
                         currentUser: null,
                         isAuthenticated: false,
                         loading: false,
                    });
                    return;
               }
               // other errors
               console.error("Auth check failed:", err);
               set({ loading: false });
          }
     }
}));