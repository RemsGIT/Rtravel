import {
    Button,
    Box, Drawer,
    FormControl,
    InputLabel,
    Select,
    TextField, Typography, IconButton, useMediaQuery
} from "@mui/material";
import {useForm} from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import DatePickerWrapper from "@/theme/libs/react-datepicker";
import DatePicker from 'react-datepicker'
import {forwardRef, Fragment, useEffect, useState} from "react";
import {addDays, format} from "date-fns";
import Icon from "@/components/Icon";
import {fr} from "date-fns/locale";
import axios from "axios";
import toast from "react-hot-toast";
import SelectCity from "@/components/Utils/SelectCity";
import {Theme} from "@mui/material/styles";


interface PickerProps {
    label: string,
    start: Date
    end: Date
}

const TripSidebar = ({open, handleClose}: { open: boolean, handleClose: () => void }) => {
    const DEFAULT_START = new Date();
    const DEFAULT_END = addDays(new Date(), 3)

    // * HOOKS
    const [startDate, setStartDate] = useState<Date>(DEFAULT_START)
    const [endDate, setEndDate] = useState<Date>(DEFAULT_END)
    
    const [resetCity, setResetCity] = useState<boolean>(false);
    const [vehicle, setVehicle] = useState<string|String>("");

    const mobileMode = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))


    const {register, handleSubmit, reset, setValue} = useForm({
        defaultValues: {
            name: "",
            city: "",
            start: DEFAULT_START,
            end: DEFAULT_END,
            vehicle: "",
        }
    });
    
    
    // Reset date picker when reoping the sidebar
    useEffect(() => {
        if(open) {
            setResetCity(false)

            setValue("start", DEFAULT_START)
            setValue("end", DEFAULT_END)
            handleOnChangeDatePicker([DEFAULT_START, DEFAULT_END])
            reset()
        }
        else {
            setResetCity(true)
            handleChangeVehicleSelect("")
        }
    }, [open])

    const handleOnChangeCity = (city: string) => {
        setValue("city", city)
    }
    
    const handleOnChangeDatePicker = (dates: any) => {
        const [start, end] = dates

        setStartDate(start)
        setEndDate(end)

        setValue("start", start)
        setValue("end", end)

    }
    
    const handleChangeVehicleSelect = (vehicle: string | String) => {
        setVehicle(vehicle);
        setValue("vehicle", vehicle as string)
    }

    const onClose = () => {
        // Reset the form before closing modal
        reset()
        handleClose()
    }

    const onSubmit = async (data: any) => {
        axios
            .post('/api/trip', {data})
            .then(response => {
                if(response.data.status === "success") {
                    toast.success(`Voyage ${response.data.trip.name} créé !`)
                }

                reset()
                handleClose()
            })
    }

    const RenderSidebarFooter = () => {
        return (
            <Fragment>
                <Button size='large' type='submit' variant='contained' sx={{mr: 4}}>
                    Créer
                </Button>
                <Button size='large' variant='outlined' color='secondary' onClick={onClose}>
                    Annuler
                </Button>
            </Fragment>
        )
    }

    // eslint-disable-next-line react/display-name
    const CustomInput = forwardRef((props: PickerProps, ref) => {
        const startDate = props.start !== null ? format(props.start, 'EEEE dd LLLL Y', {locale: fr}) : null
        const endDate = props.end !== null ? ` - ${format(props.end, 'EEEE dd LLLL Y', {locale: fr})}` : null

        let value = `${startDate !== null ? startDate : ''}${endDate !== null ? endDate : ''}`
        
        value = value.length === 0 ? 'Choisir une date' : value;
        return <TextField inputRef={ref} {...props} value={value} sx={{width: '100%'}}/>

    })

    return (
        <Drawer
            anchor={'right'}
            open={open}
            onClose={handleClose}
            ModalProps={{keepMounted: true}}
            sx={{'& .MuiDrawer-paper': {width: ['100%', 400]}}}
        >
            <Box
                className='sidebar-header'
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundColor: 'background.default',
                    p: theme => theme.spacing(3, 3.255, 3, 5.255)
                }}
            >
                <Typography variant='h6'>
                    Nouveau voyage
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton size='small' onClick={onClose} sx={{ color: 'text.primary' }}>
                        <Icon icon='mdi:close' fontSize={20} />
                    </IconButton>
                </Box>
            </Box>
            <Box className='sidebar-body' sx={{p: theme => theme.spacing(5, 6)}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DatePickerWrapper>
                        <FormControl fullWidth={true} sx={{ mb: 6 }}>
                            <TextField label={"Nom"}  {...register("name")} placeholder={"Nom du voyage"}/>
                        </FormControl>
                        <FormControl fullWidth={true} sx={{mb: 6}}>
                            <SelectCity {...register("city")} handleOnChange={handleOnChangeCity} resetText={resetCity}/>
                        </FormControl>
                        <Box sx={{ mb: 6 }}>
                            <DatePicker
                                selectsRange
                                endDate={endDate}
                                selected={startDate}
                                startDate={startDate}
                                id='date-range-picker'
                                onChange={handleOnChangeDatePicker}
                                shouldCloseOnSelect={false}
                                withPortal={mobileMode}
                                customInput={
                                    <CustomInput label='Dates' start={startDate as Date} end={endDate as Date} />
                                }
                            />
                        </Box>
                        <FormControl fullWidth={true} sx={{ mb: 6 }}>
                            <InputLabel>Véhicule</InputLabel>
                            <Select label={"Véhicule"} value={vehicle} onChange={(e) => handleChangeVehicleSelect(e.target.value)}>
                                <MenuItem value={'car'}>Voiture</MenuItem>
                                <MenuItem value={'bus'}>Bus</MenuItem>
                                <MenuItem value={'train'}>Train</MenuItem>
                                <MenuItem value={'plane'}>Avion</MenuItem>
                            </Select>
                        </FormControl>
                    </DatePickerWrapper>
                    <Box sx={{ position: 'absolute', bottom: 20, display: 'flex', alignItems: 'center', paddingLeft: '2px' }}>
                        <RenderSidebarFooter/>
                    </Box>
                </form>
            </Box>
        </Drawer>
    )
}

export default TripSidebar