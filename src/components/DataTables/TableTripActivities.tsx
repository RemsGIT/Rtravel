import {DataGrid, frFR, GridColDef, GridRenderCellParams, GridToolbarFilterButton} from '@mui/x-data-grid'
import {Box, Card, IconButton, TextField, Typography, useMediaQuery} from "@mui/material";
import {ChangeEvent, useEffect, useState} from "react";
import Icon from "@/components/Icon";
import {toFrenchDate} from "@/app/utils";
import {format} from "date-fns";
import DialogConfirmation from "@/components/Dialogs/DialogConfirmation";
import {useTheme} from "@mui/material/styles";

interface ToolbarProps {
    value: string
    clearSearch: () => void
    onChange: (e: ChangeEvent) => void
}

export type DataGridRowType = {
    id: string
    name: string
    city: string
    description: string | null
    start: Date
    type: string
    tripId: string

    createdAt: Date

}

const escapeRegExp = (value: string) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const Toolbar = (props: ToolbarProps) => {
    return (
        <Box
            sx={{
                gap: 2,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: theme => theme.spacing(2, 5, 4, 5)
            }}
        >
            <GridToolbarFilterButton/>
            <TextField
                size='small'
                value={props.value}
                onChange={props.onChange}
                placeholder='Search…'
                InputProps={{
                    startAdornment: (
                        <Box sx={{mr: 2, display: 'flex'}}>
                            <Icon icon='mdi:magnify' fontSize={20}/>
                        </Box>
                    ),
                    endAdornment: (
                        <IconButton size='small' title='Clear' aria-label='Clear' onClick={props.clearSearch}>
                            <Icon icon='mdi:close' fontSize={20}/>
                        </IconButton>
                    )
                }}
                sx={{
                    width: {
                        xs: 1,
                        sm: 'auto'
                    },
                    '& .MuiInputBase-root > svg': {
                        mr: 2
                    }
                }}
            />
        </Box>
    )
}

const TableTripActivities = ({activities, onClickUpdateActivity, onClickDeleteActivity}: { activities: Array<any>,onClickUpdateActivity: (id: string) => void, onClickDeleteActivity: (id: string) => void}) => {
    const theme = useTheme();
    const [data, setData] = useState<DataGridRowType[]>(activities)
    const [searchText, setSearchText] = useState<string>('')
    const [filteredData, setFilteredData] = useState<DataGridRowType[]>([])
    const [paginationModel, setPaginationModel] = useState({page: 0, pageSize: 7})
    const [openModalConfirmation, setOpenModalConfirmation] = useState<boolean>(false);

    const [IDdeleteActivity, setIDdeleteActivity] = useState<string>("none")

    const hideColumnsForMobile = useMediaQuery(theme.breakpoints.down('sm'))


    useEffect(() => {
        setData(activities)
    }, [activities])

    const handleSearch = (searchValue: string) => {
        setSearchText(searchValue)
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
        const filteredRows = data.filter(row => {
            return Object.keys(row).some(field => {
                // @ts-ignore
                if (!!row[field]) {
                    // @ts-ignore
                    return searchRegex.test(row[field].toString())

                }
            })
        })
        if (searchValue.length) {
            setFilteredData(filteredRows)
        } else {
            setFilteredData([])
        }
    }

    // table header
    const columns: GridColDef[] = [
        {
            flex: 0.275,
            field: 'name',
            maxWidth: 300,
            headerName: 'Nom',
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <Typography variant='body2' sx={{color: 'text.primary'}}>
                        {params.row.name}
                    </Typography>
                )
            }
        },
        {
            flex: 0.2,
            type: 'date',
            minWidth: 120,
            headerName: 'Date',
            field: 'start',
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => {
                const date = new Date(params.row.start)
                return (
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                            <Typography noWrap variant='body2' sx={{color: 'text.primary', fontWeight: 600}}>
                                {toFrenchDate(date)}
                            </Typography>
                            <Typography noWrap variant='caption'>
                                {format(date, "HH:mm")}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 110,
            field: 'type',
            headerName: 'Type',
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{color: 'text.primary'}}>
                    {params.row.type}
                </Typography>
            )
        },
        {
            flex: 0.125,
            field: 'city',
            minWidth: 80,
            headerName: 'Ville',
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{color: 'text.primary'}}>
                    {params.row.city}
                </Typography>
            )
        },
        {
            flex: 0.125,
            field: 'action',
            minWidth: 80,
            sortable: false,
            filterable: false,
            headerName: 'Action',
            renderCell: (params: GridRenderCellParams) => (
                <>
                    <IconButton
                        color={"primary"}
                        onClick={() => {
                            onClickUpdateActivity(params.row.id)
                        }}
                    >
                        <Icon icon='mdi:edit'/>
                    </IconButton>
                    <IconButton
                        color={"error"}
                        onClick={() => {
                            setOpenModalConfirmation(true)
                            setIDdeleteActivity(params.row.id)
                        }}
                    >
                        <Icon icon='mdi:delete'/>
                    </IconButton>
                </>
            )
        }
    ]
    
    // columns visibility
    const columnsVisibilityModel = {
        type: !hideColumnsForMobile,
        city: !hideColumnsForMobile
    }

    // delete
    const clickDeleteActivity = () => {
        onClickDeleteActivity(IDdeleteActivity)
        setOpenModalConfirmation(false)
        setIDdeleteActivity("none")
    }


    return (
        <>
            <DataGrid
                autoHeight
                columns={columns}
                pageSizeOptions={[7, 10, 25, 50]}
                paginationModel={paginationModel}
                slots={{toolbar: Toolbar}}
                onPaginationModelChange={setPaginationModel}
                rows={filteredData.length ? filteredData : data}
                initialState={{
                    columns: {
                        columnVisibilityModel: columnsVisibilityModel
                    },
                }}
                slotProps={{
                    baseButton: {
                        variant: 'outlined'
                    },
                    toolbar: {
                        value: searchText,
                        clearSearch: () => handleSearch(''),
                        onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
                    }
                }}
                localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
            />
            {/*@ts-ignore*/}
            <DialogConfirmation
                open={openModalConfirmation}
                handleNo={() => setOpenModalConfirmation(false)}
                handleYes={clickDeleteActivity}
                title={"Supprimer une activité"}
                message={"Voulez-vous vraiment supprimer cette activité ? Cette action est irréversible"}
            >
            </DialogConfirmation>
        </>
    )
}

export default TableTripActivities