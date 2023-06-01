import {NextRouter} from "next/router";
import {format} from "date-fns";
import {fr} from "date-fns/locale";


export const hexToRGBA = (hexCode: string, opacity: number) => {
    let hex = hexCode.replace('#', '')

    if (hex.length === 3) {
        hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
    }

    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)

    return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

export const handleURLQueries = (router: NextRouter, path: string | undefined): boolean => {
    if (Object.keys(router.query).length && path) {
        const arr = Object.keys(router.query)

        return router.asPath.includes(path) && router.asPath.includes(router.query[arr[0]] as string) && path !== '/'
    }

    return false
}

export const uppercaseFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1); 
}

export const toFrenchDate = (date: Date, dayLetter: boolean = false) => {
    
    const dateFormat = dayLetter ?  'EEEE dd LLLL Y' : 'dd LLLL Y';
    
    return format(new Date(date), dateFormat, {locale: fr})
}  

export const startInString = (value: number) => {
    if(value === 0) return "Aujourd'hui"
    else if(value < 0) return "Passé"
    else return value
}