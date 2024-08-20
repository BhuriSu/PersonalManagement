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
import { randomCreatedDate, randomTraderName, randomId, randomArrayItem } from '@mui/x-data-grid-generator';
import { PageHeader } from '../../../components/page-header/PageHeader';
import { addConnection, removeConnection, setConnections } from '../../../store/profile/profileSlice';
import { useDispatch } from 'react-redux';

const roles = ['Business Owner', 'Politician', 'High-Ranking Official'];

const randomRole = () => {
  return randomArrayItem(roles);
};

function generateRandomPhoneNumber() {
  const phoneNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
  const formattedPhoneNumber = phoneNumber.toString().replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  return formattedPhoneNumber;
}

function generateRandomEmail() {
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'example.com'];
  const emailProviders = ['john', 'jane', 'emma', 'alex', 'mike', 'sarah'];
  const randomProvider = randomArrayItem(emailProviders);
  const randomDomain = randomArrayItem(domains);
  const randomNumber = Math.floor(Math.random() * 1000);
  const emailAddress = `${randomProvider}${randomNumber}@${randomDomain}`;
  return emailAddress;
}

function generateRandomPlace() {
  const places = [
    'Paris',
    'London',
    'New York',
    'Tokyo',
    'Sydney',
    'Rome',
  ];

  const randomPlace = randomArrayItem(places);
  return randomPlace;
}

export const initialRows: GridRowsProp = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 45,
    date: randomCreatedDate(),
    place: generateRandomPlace(),
    role: randomRole(),
    phone: generateRandomPhoneNumber(),
    email: generateRandomEmail(),
  }
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
  setSearchQuery: (query: string) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel, setSearchQuery } = props;
  const dispatch = useDispatch();
  const handleClick = () => {
    const id = randomId();
    dispatch(addConnection());
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
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [searchQuery, setSearchQuery] = React.useState('');
  const dispatch = useDispatch();

  React.useEffect(() => {
    axios.get('http://localhost:8000/api/profiles/')
      .then(response => setRows(response.data))
      .catch(error => console.log(error));
  }, []);

  React.useEffect(() => {
    dispatch(setConnections(0));
  }, [dispatch]);

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
        await axios.delete(`http://localhost:8000/api/profiles/delete/${id}/`);
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        dispatch(removeConnection()); 
      } catch (error) {
        console.error(error);
      }
    }
    deleteRow(); // Execute the async function
  };

  const handleCancelClick = () => () => {
    const id = randomId();
    setRows((oldRows) => [{ id, name: '', age: '', isNew: true }, ...oldRows]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    try {
      if (newRow.isNew) {
        const response = await axios.post('http://localhost:8000/api/profiles/create/', updatedRow);
        setRows(rows.map((row) => (row.id === newRow.id ? response.data : row)));
      } else {
        await axios.put(`http://localhost:8000/api/profiles/update/${newRow.id}/`, updatedRow);
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
    
    const rowName = row.name ? row.name.toLowerCase() : '';
    const rowAge = row.age ? row.age.toString().toLowerCase() : '';
    const rowRole = row.role ? row.role.toLowerCase() : '';
    const rowPhone = row.phone ? row.phone.toLowerCase() : '';
    
    const rowDate = row.date ? new Date(row.date) : null;
    const day = rowDate ? rowDate.getDate().toString() : '';
    const month = rowDate ? (rowDate.getMonth() + 1).toString() : '';
    const year = rowDate ? rowDate.getFullYear().toString() : '';
    const formattedDate = rowDate ? `${day}/${month}/${year}` : '';
    const formattedDateString = rowDate ? rowDate.toDateString().toLowerCase() : '';
  
    const rowPlace = row.place ? row.place.toLowerCase() : '';
    const rowEmail =  row.email ?  row.email.toLowerCase() : '';
  
    return (
      rowName.includes(lowerSearchQuery) ||
      rowAge.includes(lowerSearchQuery) ||
      rowRole.includes(lowerSearchQuery) ||
      rowPhone.includes(lowerSearchQuery) ||
      formattedDate.includes(lowerSearchQuery) ||
      formattedDateString.includes(lowerSearchQuery) ||
      rowPlace.includes(lowerSearchQuery) ||
      rowEmail.includes(lowerSearchQuery)
    );
  });

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200, editable: true },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 50,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'date',
      headerName: 'Date you met',
      type: 'date',
      width: 100,
      editable: true,
    },
    {
      field: 'place',
      headerName: 'Place',
      width: 120,
      editable: true,
    },
    {
      field: 'role',
      headerName: 'Their career',
      width: 220,
      editable: true,
    },
    {
      field: 'phone',
      headerName: 'Mobile Phone',
      width: 100,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'E-Mail',
      width: 180,
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
              onClick={handleCancelClick()}
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
      <PageHeader title={'Profile List'} breadcrumbs={['Profile', 'List']} />
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
