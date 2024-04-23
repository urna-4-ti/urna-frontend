import { StoreProps } from "@/lib/types/store"
import { userLogin } from "@/lib/types/user"
import { api } from "@/requests/api"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { jwtDecode } from "jwt-decode"


export type jwtType = {
 id:string,
 email:string,
 name:string
}

export const AuthStore = create<StoreProps>()(
  persist(
    (set) => ({
      state: {
        user: {
          email: '',
         name:'',
         id:'',
        },
      },
      actions: {
        login: async (user): Promise<string> => {
          let token = ''
          const userData: userLogin = {
            email: user.email,
            password: user.password,
          }
          const formdata = new FormData()
          formdata.append('email',userData.email)
          formdata.append('password',userData.password)

          const r = await api.post('auth/signIn',formdata,{
            headers:{
              "Content-Type":"multipart/form-data",
            }
          })
          console.log(r.data);

          const {accessToken} = r.data

      
          
          const {email, id, name}:jwtType = jwtDecode(accessToken)

          set({
            state: {
              user: {
                id,
                name,
                email,
              }
            }
          })
          return accessToken
        },
        logout: () => {
          set({
            state: {
              user: {
                email: '',
               id:'',name:''
              },
            },
          })
        },
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
      partialize: ({ state }) => ({ state }),
    },
  ),
)