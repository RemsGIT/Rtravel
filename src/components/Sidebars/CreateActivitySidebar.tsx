import {useForm} from "react-hook-form";
import {forwardRef, Fragment, useEffect, useState} from "react";
import {Box, Button, Drawer, FormControl, IconButton, InputLabel, Select, TextField, Typography} from "@mui/material";
import Icon from "@/components/Icon";
import SelectCity from "@/components/Utils/SelectCity";
import MenuItem from "@mui/material/MenuItem";
import DatePicker from "react-datepicker";
import DatePickerWrapper from "@/theme/libs/react-datepicker";
import {de} from "date-fns/locale";

interface PickerProps {
    label?: string
    readOnly?: boolean
}

// eslint-disable-next-line react/display-name
const CustomInput = forwardRef(({ ...props }: PickerProps, ref) => {
    // ** Props
    const { label, readOnly } = props

    return (
        <TextField inputRef={ref} {...props} label={label || ''} {...(readOnly && { inputProps: { readOnly: true } })}  sx={{width: '100%'}}/>
    )
})

const CreateActivitySidebar = ({
                                   open,
                                   handleClose,
                                   handleSubmitForm,
                                   defaultDate = null,
                                   start = null,
                                   end = null,
                               }: { open: boolean, handleClose: () => void, handleSubmitForm: (data: any) => void, defaultDate: Date | null, start: Date | null, end: Date | null }) => {

    const [resetCity, setResetCity] = useState<boolean>(false);
    const [dateTime, setDateTime] = useState<Date>(new Date())
    
    const {register, handleSubmit, reset, setValue, getValues} = useForm({
        defaultValues: {
            name: "",
            type: "",
            city: "",
            start: new Date()
        }
    })

    const handleOnChangeCity = (city: string) => {
        setValue("city", city)
    }
    const onClose = () => {
        reset();
        handleClose();
    }

    const onSubmit = () => {
        // Set date
        setValue("start", dateTime)
        
        handleSubmitForm(getValues());
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

    useEffect(() => {
        if(open) {
            setResetCity(false)
            reset()

            setValue("start", defaultDate ?? new Date())
            setDateTime(defaultDate ?? new Date())
        }
        else {
            setResetCity(true)
        }
    }, [open])


    return (
        <Drawer
            anchor={'right'}
            open={open}
            onClose={handleClose}
            ModalProps={{keepMounted: true}}
            sx={{'& .MuiDrawer-paper': {width: ['100%', 450]}, zIndex: 2000}}
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
                    Nouvelle activité
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
                        <FormControl fullWidth={true} sx={{mb: 6}}>
                            <InputLabel>Type</InputLabel>
                            <Select
                                label={"Type"}
                                {...register("type")}
                                MenuProps={{
                                    sx: {zIndex: 2100}
                                }}
                            >
                                <MenuItem value={"visit"}>Visite</MenuItem>
                                <MenuItem value={"activity"}>Activité</MenuItem>
                                <MenuItem value={"restaurant"}>Restaurant</MenuItem>
                                <MenuItem value={"sport"}>Sport</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth={true} sx={{mb: 6}}>
                            <DatePicker
                                showTimeSelect
                                timeFormat='HH:mm'
                                timeIntervals={15}
                                selected={dateTime}
                                minDate={start != null ? new Date(start) : new Date()}
                                maxDate={end != null ? new Date(end) : new Date()}
                                dateFormat='MM/dd/yyyy h:mm aa'
                                onChange={(date: Date) => setDateTime(date)}
                                customInput={<CustomInput label='Date & heure' />}
                            />
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

export default CreateActivitySidebar;