import {
    Button,
    DialogActions,
    DialogContent,
    Box, Drawer,
    FormControl,
    InputLabel,
    Select,
    TextField, Typography, IconButton
} from "@mui/material";
import {useForm} from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import DatePickerWrapper from "@/theme/libs/react-datepicker";
import DatePicker from 'react-datepicker'
import {forwardRef, Fragment, useEffect, useState} from "react";
import {addDays, format} from "date-fns";
import Icon from "@/components/Icon";
import {fr} from "date-fns/locale";



interface PickerProps {
    label: string,
    start: Date
    end: Date
}

const CreateTripSidebar = ({open, handleClose}: { open: boolean, handleClose: () => void }) => {
    const DEFAULT_START = new Date();
    const DEFAULT_END = addDays(new Date(), 3)

    // * HOOKS
    const [startDate, setStartDate] = useState<Date>(DEFAULT_START)
    const [endDate, setEndDate] = useState<Date>(DEFAULT_END)
    
    const [vehicle, setVehicle] = useState<string|String>("");
    
    const {register, handleSubmit, reset, setValue, getValues} = useForm({
        defaultValues: {
            name: "",
            start: DEFAULT_START,
            end: DEFAULT_END,
            vehicle: "",
        }
    });
    
    
    // Reset date picker when reoping the sidebar
    useEffect(() => {
        if(open) {
            setValue("start", DEFAULT_START)
            setValue("end", DEFAULT_END)
            handleOnChangeDatePicker([DEFAULT_START, DEFAULT_END])
        }
        else {
            handleChangeVehicleSelect("")
        }
    }, [open])

    const handleOnChangeDatePicker = (dates: any) => {
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
        
        setValue("start", startDate)
        setValue("end", endDate)
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

    const onSubmit = (data: any) => {
        console.log(data)

        reset()
        handleClose()
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
                    Ajout voyage
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
                            <TextField label={"Nom"}  {...register("name")}/>
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

export default CreateTripSidebar