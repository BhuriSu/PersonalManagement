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
import { PageHeader } from '../../components/page-header/PageHeader';

interface UrgencyRow {
  id: number;
  urgency: string;
  information: string;
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
    setRows((oldRows) => [{ id, name: '', age: '', isNew: true }, ...oldRows]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Button color='primary' startIcon={<AddIcon />} onClick={handleClick}>
      Add Urgency
    </Button>
    <TextField
      variant={'outlined'}
      size={'small'}
      placeholder={'Search...'}
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
  const [rows, setRows] = React.useState<UrgencyRow[]>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    axios.get('http://localhost:8000/api/urgencies/')
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
        await axios.delete(`http://localhost:8000/api/urgencies/delete/${id}/`);
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

  const processRowUpdate = async (newRow: UrgencyRow) => {
    const updatedRow: UrgencyRow = { ...newRow, isNew: false };
    try {
      if (newRow.isNew) {
        const response = await axios.post('http://localhost:8000/api/urgencies/create/', updatedRow);
        setRows(rows.map((row) => (row.id === newRow.id ? response.data : row)));
      } else {
        await axios.put(`http://localhost:8000/api/urgencies/update/${newRow.id}/`, updatedRow);
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
    
    const rowUrgency = row.urgency ? row.urgency.toLowerCase() : '';
    const rowInformation = row.information ? row.information.toLowerCase() : '';
  
    return (
      rowUrgency.includes(lowerSearchQuery) ||
      rowInformation.includes(lowerSearchQuery) 
    );
  });

  const columns: GridColDef[] = [
    { field: 'urgency', headerName: 'Urgency', width: 400, editable: true },
    {
      field: 'information',
      headerName: 'Information',
      width: 400,
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
      <PageHeader title={'Urgency List'} breadcrumbs={['Urgency', 'List']} />
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
