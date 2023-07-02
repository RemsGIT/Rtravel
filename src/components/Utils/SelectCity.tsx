import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {ChangeEvent, useEffect, useState} from "react";

const SelectCity = ({handleOnChange, resetText}  : {handleOnChange: (value: string) => void, resetText: boolean}) => {
    const [predictions, setPredictions] = useState<string[]>([]);
    const [value, setValue] = useState<string | null>('');

    const searchDestination = (textTyped: string) => {

        if(textTyped.trim().length <= 0) {
            setPredictions([])

            return
        }

        //@ts-ignore
        const service = new google.maps.places.AutocompleteService()

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
        if(resetText) {
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
            options={predictions}
            disablePortal={true}
        />
    )
}

export default SelectCity
