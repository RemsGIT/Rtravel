import {NavGroup, NavLink, NavSectionTitle} from "@/types/LayoutTypes";

const routes: Array<NavGroup | NavLink | NavSectionTitle> = [
    {
        title: 'Accueil',
        path: '/',
        icon: 'mdi:home-outline',
    },
    {
        title: 'Voyages',
        path: '/trips',
        icon: 'mdi:email-outline',
    }
]

export default routes