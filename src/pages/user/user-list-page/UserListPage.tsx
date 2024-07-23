import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
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

const deals = ['Selling Software', 'Buying diamond', 'Buying luxury watches'];

const randomRole = () => {
  return randomArrayItem(deals);
};

function generateRandomTimeDuration() {
  const days = Math.floor(Math.random() * 30) + 1;
  const hours = Math.floor(Math.random() * 24);
  let timeDuration = '';
  if (days > 0) {
    timeDuration += `${days} days `;
  }
  if (hours > 0) {
    timeDuration += `${hours} hours `;
  }
  return timeDuration.trim();
}

function generateRandomMoney() {
  const minAmount = 1000000;
  const maxAmount = 10000000;
  const randomAmount = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount;
  const formattedAmount = randomAmount.toLocaleString();
  return formattedAmount;
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
    joinDate: randomCreatedDate(),
    place: generateRandomPlace(),
    deal: randomRole(),
    time: generateRandomTimeDuration(),
    money: generateRandomMoney(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    joinDate: randomCreatedDate(),
    place: generateRandomPlace(),
    deal: randomRole(),
    time: generateRandomTimeDuration(),
    money: generateRandomMoney(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    joinDate: randomCreatedDate(),
    place: generateRandomPlace(),
    deal: randomRole(),
    time: generateRandomTimeDuration(),
    money: generateRandomMoney(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    joinDate: randomCreatedDate(),
    place: generateRandomPlace(),
    deal: randomRole(),
    time: generateRandomTimeDuration(),
    money: generateRandomMoney(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    joinDate: randomCreatedDate(),
    place: generateRandomPlace(),
    deal: randomRole(),
    time: generateRandomTimeDuration(),
    money: generateRandomMoney(),
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
    <GridToolbarContainer>
      <Button color='primary' startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
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
      field: 'deal',
      headerName: 'What kind of deal',
      width: 220,
      editable: true,
    },
    {
      field: 'time',
      headerName: 'How long to close the deal',
      width: 180,
      editable: true,
    },
    {
      field: 'money',
      headerName: 'Money',
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
