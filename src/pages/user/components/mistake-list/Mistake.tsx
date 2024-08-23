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
  GridRowEditStopReasons,
  GridSlots,
} from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';

interface MistakeRow {
  id: number;
  mistake: string;
  cost: string;
  date: Date | string;
  place: string;
  solution: string;
  isNew?: boolean;
}

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
  setSearchQuery: (query: string) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel, setSearchQuery } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [{ id, mistake: '', cost: '', date: '', place: '', solution: '', isNew: true }, ...oldRows]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'mistake' },
    }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <GridToolbarContainer>
      <Button color='primary' startIcon={<AddIcon />} onClick={handleClick}>
        Add Mistake
      </Button>
      <TextField
        variant={'outlined'}
        size={'small'}
        placeholder={'Search...'}
        InputProps={{
          endAdornment: <Search sx={{ color: 'grey.500' }} />,
        }}
        onChange={handleSearchChange}
        sx={{ ml: 'auto' }}
      />
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState<MistakeRow[]>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    axios.get('http://localhost:8000/api/mistakes/')
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
        await axios.delete(`http://localhost:8000/api/mistakes/delete/${id}/`);
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

  const processRowUpdate = async (newRow: MistakeRow) => {
    const updatedRow: MistakeRow = { 
      ...newRow, 
      isNew: false, 
    };
    try {
      if (newRow.isNew) {
        const response = await axios.post('http://localhost:8000/api/mistakes/create/', updatedRow);
        setRows(rows.map((row) => (row.id === newRow.id ? response.data : row)));
      } else {
        await axios.put(`http://localhost:8000/api/mistakes/update/${newRow.id}/`, updatedRow);
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
    
    const rowMistake = row.mistake ? row.mistake.toLowerCase() : '';
    const rowCost = row.cost ? row.cost.toLowerCase() : '';
    
    const rowDate = row.date ? new Date(row.date) : null;
    const day = rowDate ? rowDate.getDate().toString() : '';
    const month = rowDate ? (rowDate.getMonth() + 1).toString() : ''; // Months are 0-based, so add 1
    const year = rowDate ? rowDate.getFullYear().toString() : '';
    const formattedDate = rowDate ? `${day}/${month}/${year}` : '';
    const formattedDateString = rowDate ? rowDate.toDateString().toLowerCase() : '';
  
    const rowPlace = row.place ? row.place.toLowerCase() : '';
    const rowSolution =  row.solution ?  row.solution.toLowerCase() : '';
  
    return (
      rowMistake.includes(lowerSearchQuery) ||
      rowCost.includes(lowerSearchQuery) ||
      formattedDate.includes(lowerSearchQuery) ||
      formattedDateString.includes(lowerSearchQuery) ||
      rowPlace.includes(lowerSearchQuery) ||
      rowSolution.includes(lowerSearchQuery)
    );
  });
  
  
  const columns: GridColDef[] = [
    { field: 'mistake', headerName: 'Mistakes that I made', width: 300, editable: true },
    {
      field: 'cost',
      headerName: 'Cost',
      width: 250,
      editable: true,
    },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
      width: 120,
      editable: true,
      valueFormatter: ({ value }) => new Intl.DateTimeFormat('fr-CA', {
        year: 'numeric', month: '2-digit', day: '2-digit'
    }).format(value)
    },
    {
      field: 'place',
      headerName: 'Place',
      width: 120,
      editable: true,
    },
    {
      field: 'solution',
      headerName: 'Solution',
      width: 200,
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
              onClick={handleSaveClick(id)}
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
