"use client"

import {styled, useTheme} from "@mui/material/styles";
import {useSettings} from "@/hooks/useSettings";
import {
    Box,
    BoxProps, Button, Checkbox, CircularProgress, Divider,
    FormControl, FormHelperText, IconButton,
    InputAdornment, InputLabel,
    OutlinedInput, TextField,
    Typography,
    TypographyProps,
    useMediaQuery
} from "@mui/material";
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import {useState} from "react";
import Link from "next/link";

// Third parties
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import {useRouter} from "next/navigation";
import themeConfig from "@/theme/ThemeConfig";
import { useForm, Controller } from 'react-hook-form'
import Icon from "@/components/Icon";
import {signIn} from "next-auth/react";
import toast from "react-hot-toast";

// ** Types
interface FormData {
    email: string
    password: string
}

// ** Styled Components
const LoginIllustrationWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    padding: theme.spacing(20),
    paddingRight: '0 !important',
    [theme.breakpoints.down('lg')]: {
        padding: theme.spacing(10)
    }
}))

const LoginIllustration = styled('img')(({ theme }) => ({
    maxWidth: '48rem',
    [theme.breakpoints.down('lg')]: {
        maxWidth: '35rem'
    }
}))

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.up('md')]: {
        maxWidth: 450
    }
}))

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    [theme.breakpoints.down('xl')]: {
        width: '100%'
    },
    [theme.breakpoints.down('md')]: {
        maxWidth: 400
    }
}))

const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
    fontWeight: 600,
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.down('md')]: { mt: theme.spacing(8) }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
    fontSize: '0.875rem',
    textDecoration: 'none',
    color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
    '& .MuiFormControlLabel-label': {
        fontSize: '0.875rem',
        color: theme.palette.text.secondary
    }
}))

const schema = yup.object().shape({
    email: yup.string().email("L'adresse mail n'est pas correct").required("Veuillez saisir votre adresse email"),
    password: yup.string().min(5,"5 caractères minimum").required(),
})

const LoginPage = () => {
    const [rememberMe, setRememberMe] = useState<boolean>(true)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isSigning, setIsSigning] = useState<boolean>(false)

    // ** Hooks
    const theme = useTheme()
    const { settings } = useSettings()
    const hidden = useMediaQuery(theme.breakpoints.down('md'))

    // ** Vars
    const { skin } = settings

    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {email: '', password: ''},
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

    async function onSubmit (data: FormData) {
        const { email, password } = data

        setIsSigning(true)
        await signIn('credentials', {
            redirect: false,
            email: email,
            password: password,
            remember: rememberMe,
            callbackUrl: '/'
        }).then(response => {
            toast.remove()

            let errorMessage = "Veuillez réessayer plus tard."
            if(response) {
                if(response.ok) {
                    router.push((response.url ?? '/') + '?afterlogin=true')

                    return true
                }
                else {
                    // Only one toast
                    // @ts-ignore
                    errorMessage = response.error
                }
            }

            toast.error(errorMessage, {
                style: {
                    padding: '16px',
                    color: theme.palette.error.main,
                    border: `1px solid ${theme.palette.error.main}`
                },
                iconTheme: {
                    primary: theme.palette.error.main,
                    secondary: theme.palette.primary.contrastText
                }
            })

            setIsSigning(false)
        });
    }

    return (
        <Box className='content-right'>
            {!hidden ? (
                <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
                    <LoginIllustrationWrapper>
                        <LoginIllustration
                            alt='login-illustration'
                            src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
                        />
                    </LoginIllustrationWrapper>
                </Box>
            ) : null}
            <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
                <Box
                    sx={{
                        p: 12,
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'background.paper'
                    }}
                >
                    <BoxWrapper>
                        <Box
                            sx={{
                                top: 30,
                                left: 40,
                                display: 'flex',
                                position: 'absolute',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <svg
                                width={35}
                                height={29}
                                version='1.1'
                                viewBox='0 0 30 23'
                                xmlns='http://www.w3.org/2000/svg'
                                xmlnsXlink='http://www.w3.org/1999/xlink'
                            >
                                <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                                    <g id='Artboard' transform='translate(-95.000000, -51.000000)'>
                                        <g id='logo' transform='translate(95.000000, 50.000000)'>
                                            <path
                                                id='Combined-Shape'
                                                fill={theme.palette.primary.main}
                                                d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
                                            />
                                            <polygon
                                                id='Rectangle'
                                                opacity='0.077704'
                                                fill={theme.palette.common.black}
                                                points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
                                            />
                                            <polygon
                                                id='Rectangle'
                                                opacity='0.077704'
                                                fill={theme.palette.common.black}
                                                points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
                                            />
                                            <polygon
                                                id='Rectangle'
                                                opacity='0.077704'
                                                fill={theme.palette.common.black}
                                                points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
                                                transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
                                            />
                                            <polygon
                                                id='Rectangle'
                                                opacity='0.077704'
                                                fill={theme.palette.common.black}
                                                points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
                                                transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
                                            />
                                            <path
                                                id='Rectangle'
                                                fillOpacity='0.15'
                                                fill={theme.palette.common.white}
                                                d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
                                            />
                                            <path
                                                id='Rectangle'
                                                fillOpacity='0.35'
                                                fill={theme.palette.common.white}
                                                transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
                                                d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
                                            />
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <Typography
                                variant='h6'
                                sx={{
                                    ml: 3,
                                    lineHeight: 1,
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    fontSize: '1.5rem !important'
                                }}
                            >
                                {themeConfig.templateName}
                            </Typography>
                        </Box>
                        <Box sx={{ mb: 6 }}>
                            <TypographyStyled variant='h5'>Bienvenue sur {themeConfig.templateName} 👋</TypographyStyled>
                            <Typography variant='body2'>Connecte toi à ton compte pour organiser tes voyages</Typography>
                        </Box>
                        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='email'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            label='Email'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.email)}
                                            placeholder='admin@materio.com'
                                        />
                                    )}
                                />
                                {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                                    Password
                                </InputLabel>
                                <Controller
                                    name='password'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <OutlinedInput
                                            value={value}
                                            onBlur={onBlur}
                                            label='Password'
                                            onChange={onChange}
                                            id='auth-login-v2-password'
                                            error={Boolean(errors.password)}
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        edge='end'
                                                        onMouseDown={e => e.preventDefault()}
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    )}
                                />
                                {errors.password && (
                                    <FormHelperText sx={{ color: 'error.main' }} id=''>
                                        {errors.password.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <Box
                                sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
                            >
                                <FormControlLabel
                                    label='Se souvenir de moi'
                                    control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
                                />
                                <LinkStyled href='/forgot-password'>Mot de passe oublié?</LinkStyled>
                            </Box>
                            <Button fullWidth size='large' type='submit' variant='contained' disabled={isSigning}
                                    sx={{
                                        mb: 7,
                                        "&.Mui-disabled": {
                                            background: theme.palette.primary.main,
                                            filter: "grayscale(50%)",
                                            color: "#fff"
                                        }
                                    }}
                            >
                                {isSigning
                                    ? (<Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <CircularProgress color={"inherit"} size={25}/>
                                            <Typography variant={"inherit"} sx={{ml: 2}}>Connexion en cours</Typography>
                                        </Box>)
                                    : 'Connexion'
                                }
                            </Button>
                            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <Typography variant='body2' sx={{ mr: 2 }}>
                                    Nouveau sur Rtravel?
                                </Typography>
                                <Typography variant='body2'>
                                    <LinkStyled href='/register'>Créer un compte</LinkStyled>
                                </Typography>
                            </Box>
                            <Divider sx={{ my: theme => `${theme.spacing(5)} !important` }}>ou</Divider>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <IconButton
                                    href='/'
                                    component={Link}
                                    sx={{ color: '#497ce2' }}
                                    onClick={(e: React.MouseEvent<HTMLElement>) => e.preventDefault()}
                                >
                                    <Icon icon='mdi:facebook' />
                                </IconButton>
                                <IconButton
                                    href='/'
                                    component={Link}
                                    sx={{ color: '#1da1f2' }}
                                    onClick={(e: React.MouseEvent<HTMLElement>) => e.preventDefault()}
                                >
                                    <Icon icon='mdi:twitter' />
                                </IconButton>
                                <IconButton
                                    href='/'
                                    component={Link}
                                    onClick={(e: React.MouseEvent<HTMLElement>) => e.preventDefault()}
                                    sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
                                >
                                    <Icon icon='mdi:github' />
                                </IconButton>
                                <IconButton
                                    href='/'
                                    component={Link}
                                    sx={{ color: '#db4437' }}
                                    onClick={(e: React.MouseEvent<HTMLElement>) => e.preventDefault()}
                                >
                                    <Icon icon='mdi:google' />
                                </IconButton>
                            </Box>
                        </form>
                    </BoxWrapper>
                </Box>
            </RightWrapper>
        </Box>
    )
}

export default LoginPage;