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
    },
    {
        path: '/acl',
        action: 'read',
        subject: 'acl-page',
        title: 'Access Control',
        icon: 'tabler:shield',
    }
]

export default routes