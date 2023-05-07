import { AppDispatch } from '@/redux/configStore';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup, User } from "firebase/auth"
import router from "next/router"
import authentication from "../firebase"

export const loginSocial = (

    provider: FacebookAuthProvider | GoogleAuthProvider) => {

    signInWithPopup(authentication, provider)
        .then((result) => {
            const data = result.user
            if (data) {
                const user = {
                    email: data.email,
                    name: data.displayName
                }
                localStorage.setItem('userSocial', JSON.stringify(user))

                router.push('login')
            }
        })
        .catch((error) => {
            console.log(error)
        })
}