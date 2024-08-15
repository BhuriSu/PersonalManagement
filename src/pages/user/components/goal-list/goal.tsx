import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Search } from '@mui/icons-material';
import { TextField } from '@mui/material';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlots,
} from '@mui/x-data-grid';
import { randomCreatedDate, randomId, randomArrayItem } from '@mui/x-data-grid-generator';

const places = [
  'University',
  'Home',
  'Condo',
  'Hospital',
  'Office',
  'Airplane',
  'Foreign Country',
  'Museum',
  'Shopping Mall',
  'Public Transit',
];
const goal = [
  'Meet New friend',
  'Practice new skill',
  'Make money 100k usd per month',
  'Become millionaire',
  'Become Billionaire',
  'Disrupt the whole world',
];
const how = [
  'go to new place and start conversation',
  'take course online',
  'negotiate and make a deal',
  'start business and exit',
  'gain knowledge and set vision to execute',
  'make client happy',
];

const initialRows: GridRowsProp = [
  {
    id: randomId(),
    goal: randomArrayItem(goal),
    how: randomArrayItem(how),
    date: randomCreatedDate(),
    place: randomArrayItem(places),
  },
  {
    id: randomId(),
    goal: randomArrayItem(goal),
    how: randomArrayItem(how),
    date: randomCreatedDate(),
    place: randomArrayItem(places),
  },
  {
    id: randomId(),
    goal: randomArrayItem(goal),
    how: randomArrayItem(how),
    date: randomCreatedDate(),
    place: randomArrayItem(places),
  },
  {
    id: randomId(),
    goal: randomArrayItem(goal),
    how: randomArrayItem(how),
    date: randomCreatedDate(),
    place: randomArrayItem(places),
  },
  {
    id: randomId(),
    goal: randomArrayItem(goal),
    how: randomArrayItem(how),
    date: randomCreatedDate(),
    place: randomArrayItem(places),
  },
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
  setSearchQuery: (query: string) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel, setSearchQuery } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [{ id, goal: '', how: '', date: '', place: '', isNew: true }, ...oldRows]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'goal' },
    }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <GridToolbarContainer>
      <Button color='primary' startIcon={<AddIcon />} onClick={handleClick}>
        Add Goal
      </Button>
      <TextField
        variant='outlined'
        size='small'
        placeholder='Search...'
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: <Search sx={{ color: 'grey.500' }} />,
        }}
        sx={{ ml: 'auto' }}
      />
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    axios.get('http://localhost:8000/api/goals/')
      .then(response => setRows(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    // Call the async function within the synchronous wrapper
    async function deleteRow() {
      try {
        await axios.delete(`http://localhost:8000/api/goals/delete/${id}/`);
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
    deleteRow(); // Execute the async function
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    try {
      if (newRow.isNew) {
        const response = await axios.post('http://localhost:8000/api/goals/create/', updatedRow);
        setRows(rows.map((row) => (row.id === newRow.id ? response.data : row)));
      } else {
        await axios.put(`http://localhost:8000/api/goals/update/${newRow.id}/`, updatedRow);
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      }
    } catch (error) {
      console.log(error);
    }
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const filteredRows = rows.filter((row) => {
    const lowerSearchQuery = searchQuery.toLowerCase();
    
    const rowGoal = row.goal ? row.goal.toLowerCase() : '';
    const rowHow = row.how ? row.how.toLowerCase() : '';
    
    const rowDate = row.date ? new Date(row.date) : null;
    const day = rowDate ? rowDate.getDate().toString() : '';
    const month = rowDate ? (rowDate.getMonth() + 1).toString() : ''; // Months are 0-based, so add 1
    const year = rowDate ? rowDate.getFullYear().toString() : '';
    const formattedDate = rowDate ? `${day}/${month}/${year}` : '';
    const formattedDateString = rowDate ? rowDate.toDateString().toLowerCase() : '';
  
    const rowPlace = row.place ? row.place.toLowerCase() : '';
  
    return (
      rowGoal.includes(lowerSearchQuery) ||
      rowHow.includes(lowerSearchQuery) ||
      formattedDate.includes(lowerSearchQuery) ||
      formattedDateString.includes(lowerSearchQuery) ||
      rowPlace.includes(lowerSearchQuery)
    );
  });

  const columns: GridColDef[] = [
    { field: 'goal', headerName: 'Goal', width: 300, editable: true },
    {
      field: 'how',
      headerName: 'How',
      width: 300,
      editable: true,
    },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
      width: 120,
      editable: true,
    },
    {
      field: 'place',
      headerName: 'Place',
      width: 120,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label='Save'
              sx={{
                color: 'primary.main',
              }}
              onClick={() => handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label='Cancel'
              className='textPrimary'
              onClick={handleCancelClick(id)}
              color='inherit'
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Edit'
            className='textPrimary'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem icon={<DeleteIcon />} label='Delete' onClick={handleDeleteClick(id)} color='inherit' />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 700,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        autoHeight
        rows={filteredRows}
        columns={columns}
        editMode='row'
        rowModesModel={rowModesModel}
        checkboxSelection
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar as GridSlots['toolbar'],
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, setSearchQuery },
        }}
      />
    </Box>
  );
}
