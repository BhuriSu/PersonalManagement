import * as React from 'react';
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
    'Moscow',
    'Dubai',
    'Bangkok',
    'Cape Town',
    'Bali',
    'Barcelona',
    'Los Angeles',
    'Berlin',
    'Toronto',
  ];

  const randomPlace = randomArrayItem(places);
  return randomPlace;
}

const initialRows: GridRowsProp = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 45,
    joinDate: randomCreatedDate(),
    place: generateRandomPlace(),
    role: randomRole(),
    phone: generateRandomPhoneNumber(),
    mail: generateRandomEmail(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    place: generateRandomPlace(),
    role: randomRole(),
    phone: generateRandomPhoneNumber(),
    mail: generateRandomEmail(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 49,
    joinDate: randomCreatedDate(),
    place: generateRandomPlace(),
    role: randomRole(),
    phone: generateRandomPhoneNumber(),
    mail: generateRandomEmail(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 38,
    joinDate: randomCreatedDate(),
    place: generateRandomPlace(),
    role: randomRole(),
    phone: generateRandomPhoneNumber(),
    mail: generateRandomEmail(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 30,
    joinDate: randomCreatedDate(),
    place: generateRandomPlace(),
    role: randomRole(),
    phone: generateRandomPhoneNumber(),
    mail: generateRandomEmail(),
  },
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Button color='primary' startIcon={<AddIcon />} onClick={handleClick}>
      Add record
    </Button>
    <TextField
      variant={'outlined'}
      size={'small'}
      placeholder={'Search...'}
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
    setRows(rows.filter((row) => row.id !== id));
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

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

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
      field: 'joinDate',
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
      field: 'mail',
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
      <PageHeader title={'Profile List'} breadcrumbs={['Profile', 'List']} />
      <DataGrid
        rows={rows}
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
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
