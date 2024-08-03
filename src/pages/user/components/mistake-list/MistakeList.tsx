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
const mistakes = [
  'broke the deal',
  'forgot to close refrigerator',
  'broke the things that is not belong to mine',
  'underperformed',
  'no discipline',
  'broke the law',
];
const cost = [
  'lose opportunity',
  'almost get throwing in jail',
  'got terminated',
  'waste too much electricity cost',
  'waste too much time',
  'got charges a lot',
];
const solutions = [
  'dealing more professional',
  'follow the rules strictly',
  'upskills',
  'check 2 times',
  'practice discipline',
  'beware when traveling',
];

const initialRows: GridRowsProp = [
  {
    id: randomId(),
    mistake: randomArrayItem(mistakes),
    cost: randomArrayItem(cost),
    date: randomCreatedDate(),
    place: randomArrayItem(places),
    solution: randomArrayItem(solutions),
  },
  {
    id: randomId(),
    mistake: randomArrayItem(mistakes),
    cost: randomArrayItem(cost),
    date: randomCreatedDate(),
    place: randomArrayItem(places),
    solution: randomArrayItem(solutions),
  },
  {
    id: randomId(),
    mistake: randomArrayItem(mistakes),
    cost: randomArrayItem(cost),
    date: randomCreatedDate(),
    place: randomArrayItem(places),
    solution: randomArrayItem(solutions),
  },
  {
    id: randomId(),
    mistake: randomArrayItem(mistakes),
    cost: randomArrayItem(cost),
    date: randomCreatedDate(),
    place: randomArrayItem(places),
    solution: randomArrayItem(solutions),
  },
  {
    id: randomId(),
    mistake: randomArrayItem(mistakes),
    cost: randomArrayItem(cost),
    date: randomCreatedDate(),
    place: randomArrayItem(places),
    solution: randomArrayItem(solutions),
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
    setRows((oldRows) => [...oldRows, { id, mistake: '', cost: '', date: '', place: '', solution: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'mistake' },
    }));
  };

  return (
    <GridToolbarContainer>
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
    { field: 'mistake', headerName: 'Mistakes that I made', width: 280, editable: true },
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
