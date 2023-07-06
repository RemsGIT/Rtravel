"use client"
// ** MUI Imports
import {styled, useTheme} from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import {SettingsConsumer, SettingsProvider} from "@/context/settingsContext";
import Theme from "@/theme/Theme";
import {AuthProvider} from "@/context/AuthContext";
import ReactHotToast from "@/theme/libs/react-hot-toast";
import {Toaster} from "react-hot-toast";
import {useEffect, useState} from "react";
import LoadingPageSpinner from "@/components/LoadingPageSpinner";
import AuthDetectorMode from "@/app/(auth)/AuthDetectorMode";

// Styled component for Blank Layout component
const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    height: '100vh',

    // For V1 Blank layout pages
    '& .content-center': {
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(5)
    },

    // For V2 Blank layout pages
    '& .content-right': {
        display: 'flex',
        minHeight: '100vh',
        overflowX: 'hidden',
        position: 'relative'
    }
}))

export default function AuthLayout({children}: {children: React.ReactNode}) {
    const theme = useTheme();
    const [isLoading, setisLoading] = useState<Boolean>(true)

    useEffect(() => {
        setisLoading(false)
    }, [])
    
    return (
        <AuthProvider>
            {!isLoading ? (
                <>
                    <AuthDetectorMode />
                    <BlankLayoutWrapper className='layout-wrapper'>
                        <Box className='app-content' sx={{ minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
                            {/* eslint-disable-next-line react/no-children-prop */}
                            {children}
                        </Box>
                    </BlankLayoutWrapper>
                </>
            ) : (
                <LoadingPageSpinner />
            )}
        </AuthProvider>

    )
}