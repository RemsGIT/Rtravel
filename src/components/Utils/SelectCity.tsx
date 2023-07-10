import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {ChangeEvent, useEffect, useState} from "react";

const SelectCity = ({handleOnChange, resetText, defaultCity = '', isDeleting = false}  : {handleOnChange: (value: string) => void, resetText?: boolean, defaultCity?: string, isDeleting?: boolean}) => {
    const [predictions, setPredictions] = useState<string[]>([]);
    const [value, setValue] = useState<string | null>(defaultCity);
    
    //@ts-ignore
    const service = new google.maps.places.AutocompleteService()

    const searchDestination = (textTyped: string) => {

            if(textTyped.trim().length <= 0) {
                setPredictions([])

                return
            }

            const req = {
                types: ['(cities)'],
                input: textTyped,
                language: 'fr'
            }

            service.getPlacePredictions(req, (resultPredictions: any) => {
                if(resultPredictions !== null) {
                    setPredictions(resultPredictions.map((rp: any) => `${rp.structured_formatting.main_text}, ${rp.structured_formatting.secondary_text}`))
                }
                else {
                    setPredictions([])
                }
            })
}
        
    
    useEffect(() => {
        setValue(defaultCity)
    }, [defaultCity])
    
    useEffect(() => {
        if(resetText && defaultCity === '') {
            setValue("")
        }
    }, [resetText])

    return (
        <Autocomplete
            value={value}
            renderInput={(params) => <TextField {...params} label={"Ville"} />}
            onInput={(event: ChangeEvent<HTMLInputElement>) => searchDestination(event.target.value)}
            onInputChange={(event, newInputValue, reason) => {
                setValue(newInputValue)
            }}
            onChange={(event: any, newValue: string | null) => {
                handleOnChange(newValue ?? '')
            }}
            disablePortal={true}
            options={predictions}
            disabled={isDeleting}
        />
    )
}

export default SelectCity
