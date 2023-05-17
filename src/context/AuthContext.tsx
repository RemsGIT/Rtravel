import {createContext, ReactNode} from 'react'

// ** Axios
import axios from 'axios'

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

/** Types **/
type Props = {
    children: ReactNode
}
type RegisterParams = {
    email: string
    username: string
    password: string
    terms: boolean
}
type AuthValuesType = {
    logout: () => void
    register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
}
type ErrCallbackType = (err: { [key: string]: string }) => void

// ** Defaults
const defaultProvider: AuthValuesType = {
    logout: () => Promise.resolve(),
    register: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }: Props) => {
    const router = useRouter();

    const handleLogout = () => {
        console.log('deconnexion')
    }

    const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
        axios
            .post('/api/auth/register', params)
            .then(res => {
                if (res.data.error) {
                    if (errorCallback) errorCallback(res.data.error)
                } else {
                    // Send verify email to user

                    // Redirect user to connexion
                    router.push('/auth/login');

                    // Toast
                    toast.success("Inscription validée, un mail de vérification t'a été envoyé.", {
                        duration: 5000
                    })
                    // handleLogin({ email: params.email, password: params.password })
                    // Génération d'un numéro unique à faire valider par email et redirection vers cette page
                }
            })
            .catch((err: { [key: string]: string }) => (errorCallback ? errorCallback(err) : null))
    }

    const values = {
        logout: handleLogout,
        register: handleRegister
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>

}

export { AuthContext, AuthProvider }