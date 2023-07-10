import {
    Button,
    Card,
    CardContent,
    FormControl, FormHelperText,
    Grid,
    InputLabel,
    Select,
    TextField,
    useMediaQuery
} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import {forwardRef, useState} from "react";
import {format} from "date-fns";
import {fr} from "date-fns/locale";
import DatePickerWrapper from "@/theme/libs/react-datepicker";
import {Theme} from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import SelectCity from "@/components/Utils/SelectCity";

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from "react-hot-toast";
import axios from "axios";

interface PickerProps {
    label: string,
    start: Date
    end: Date
}

const ValidationSchema = yup.object().shape({
    name: yup.string().required("Veuillez saisir un nom"),
    city: yup.string().required("Veuillez saisir une ville"),
    vehicle: yup.string()
        .oneOf(["car", "bus", "train", "plane"], "Veuillez choisir un moyen de transport valide")
        .required("Veuillez choisir un véhicule")
})

const GeneralForm = ({data, isDeleting, handleUpdate}: { data: any, isDeleting: boolean, handleUpdate: (data: any) => void}) => {

    const {register, handleSubmit, getValues, setValue, control, formState: {errors}} = useForm({
        defaultValues: {
            id: data.id,
            name: data.name,
            city: data.city,
            vehicle: data.vehicle,
            start: new Date(data.start),
            end: new Date(data.end),
        },
        mode: 'onBlur',
        resolver: yupResolver(ValidationSchema)
    })
    
    const [startDate, setStartDate] = useState<Date>(new Date(data.start))
    const [endDate, setEndDate] = useState<Date>(new Date(data.end))
    const mobileMode = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))


    // eslint-disable-next-line react/display-name
    const CustomInput = forwardRef((props: PickerProps, ref) => {
        const startDate = props.start !== null ? format(props.start, 'EEEE dd LLLL Y', {locale: fr}) : null
        const endDate = props.end !== null ? ` - ${format(props.end, 'EEEE dd LLLL Y', {locale: fr})}` : null

        let value = `${startDate !== null ? startDate : ''}${endDate !== null ? endDate : ''}`

        value = value.length === 0 ? 'Choisir une date' : value;
        return <TextField inputRef={ref} {...props} value={value} sx={{width: '100%'}} InputProps={{readOnly: true}}/>
    })

    const handleOnChangeDatePicker = (dates: any) => {
        const [start, end] = dates

        setStartDate(start)
        setEndDate(end)

        setValue("start", start)
        setValue("end", end)

    }
    const handleOnChangeCity = (city: string) => {
        if(!isDeleting) {
            setValue("city", city)
        }
    }
    
    const onSubmitForm = (data: any) => {
        handleUpdate(data)
    }

    return (
        <DatePickerWrapper>
            <Card sx={{width: '100%'}}>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <Grid container spacing={2}>
                            <Grid container item xs={6} direction="column">
                                <FormControl sx={{mb: 6}}>
                                    <TextField label={"Nom"} placeholder={"Nom du voyage"} {...register("name")} error={Boolean(errors.name)} disabled={isDeleting}/>
                                    {/*@ts-ignore*/}
                                    {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
                                </FormControl>

                                <FormControl sx={{mb: 6}}>
                                    <SelectCity handleOnChange={handleOnChangeCity} defaultCity={data.city} isDeleting={isDeleting}/>
                                    {/*@ts-ignore*/}
                                    {errors.city && <FormHelperText sx={{ color: 'error.main' }}>{errors.city.message}</FormHelperText>}
                                </FormControl>
                                
                            </Grid>
                            <Grid container item xs={6} direction="column">
                                <FormControl sx={{mb: 6}}>
                                    <DatePicker
                                        selectsRange
                                        endDate={endDate}
                                        selected={startDate}
                                        startDate={startDate}
                                        onChange={handleOnChangeDatePicker}
                                        shouldCloseOnSelect={false}
                                        withPortal={mobileMode}
                                        disabled={isDeleting}
                                        customInput={
                                            <CustomInput label='Dates' start={startDate as Date} end={endDate as Date}/>
                                        }
                                        popperProps={{ strategy: 'fixed' }}
                                    />
                                </FormControl>

                                <FormControl fullWidth={true} sx={{mb: 6}}>
                                    <InputLabel>Véhicule</InputLabel>
                                    {/*@ts-ignore*/}
                                    <Controller
                                        name={"vehicle"}
                                        control={control}
                                        defaultValue={data.vehicle ?? ''}
                                        render={({field}) => (
                                            <Select
                                                label={"Véhicule"}
                                                error={Boolean(errors.vehicle)}
                                                disabled={isDeleting}
                                                {...field}
                                            >
                                                <MenuItem value={'car'}>Voiture</MenuItem>
                                                <MenuItem value={'bus'}>Bus</MenuItem>
                                                <MenuItem value={'train'}>Train</MenuItem>
                                                <MenuItem value={'plane'}>Avion</MenuItem>
                                            </Select>
                                        )}
                                    />
                                    {/*@ts-ignore*/}
                                    {errors.vehicle && <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle.message}</FormHelperText>}
                                </FormControl>
                            </Grid>
                        </Grid>
                        
                        <Button type={"submit"} variant={"contained"} color={"success"} disabled={isDeleting}>Enregistrer</Button>
                    </form>
                </CardContent>
            </Card>
        </DatePickerWrapper>
    )
}

export default GeneralForm;