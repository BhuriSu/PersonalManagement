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
import { useDispatch } from 'react-redux';
import { addTransaction } from '../../../store/transaction/transactionSlice';
import { addProfit } from '../../../store/profit/profitSlice';
import { setHighestProfit } from '../../../store/highest-profit/highestProfitSlice';

const deals = ['Selling Software', 'Buying Hotel Company', 'Selling Rare Material'];

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

function generateRandomMoney(): number {
  const minAmount = 1000000;
  const maxAmount = 10000000;
  const randomAmount = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount;
  return randomAmount;
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
    date: randomCreatedDate(),
    place: generateRandomPlace(),
    deal: randomRole(),
    time: generateRandomTimeDuration(),
    money: generateRandomMoney(),
    profit: generateRandomMoney(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    date: randomCreatedDate(),
    place: generateRandomPlace(),
    deal: randomRole(),
    time: generateRandomTimeDuration(),
    money: generateRandomMoney(),
    profit: generateRandomMoney(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    date: randomCreatedDate(),
    place: generateRandomPlace(),
    deal: randomRole(),
    time: generateRandomTimeDuration(),
    money: generateRandomMoney(),
    profit: generateRandomMoney(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    date: randomCreatedDate(),
    place: generateRandomPlace(),
    deal: randomRole(),
    time: generateRandomTimeDuration(),
    money: generateRandomMoney(),
    profit: generateRandomMoney(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    date: randomCreatedDate(),
    place: generateRandomPlace(),
    deal: randomRole(),
    time: generateRandomTimeDuration(),
    money: generateRandomMoney(),
    profit: generateRandomMoney(),
  },
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
  const newMoney = generateRandomMoney(); // Ensure this is a number
  const newProfit = generateRandomMoney();
  dispatch(addTransaction(newMoney)); // Pass number to the action
  dispatch(addProfit(newProfit));
  setRows((oldRows) => [
    { id, name: '', date: '', place: '', deal: '', time: '', money: newMoney, profit: newProfit, isNew: true },
    ...oldRows,
  ]);
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
      Add record
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
    axios.get('http://localhost:8000/deals/')
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
        await axios.delete(`http://localhost:8000/deals/${id}`);
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
  const previousRow = rows.find((row) => row.id === newRow.id);
  const updatedRow = {
    ...newRow,
    isNew: false,
    money: parseFloat(newRow.money as unknown as string) || 0,
    profit: parseFloat(newRow.profit as unknown as string) || 0,
  };

  // Update total money and profit in Redux
  if (previousRow) {
    const newProfitValue = updatedRow.profit;
    dispatch(addTransaction(updatedRow.money - (parseFloat(previousRow.money as unknown as string) || 0)));
    dispatch(addProfit(updatedRow.profit - (parseFloat(previousRow.profit as unknown as string) || 0)));
    dispatch(setHighestProfit(newProfitValue)); 
  }

  try {
    if (newRow.isNew) {
      const response = await axios.post('http://localhost:8000/profiles/', updatedRow);
      setRows(rows.map((row) => (row.id === newRow.id ? response.data : row)));
    } else {
      await axios.put(`http://localhost:8000//profiles/${newRow.id}`, updatedRow);
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
    const rowDeal = row.deal ? row.deal.toLowerCase() : '';
    const rowTime = row.time ? row.time.toLowerCase() : '';
    const rowMoney = row.money ? row.money : '';
    const rowProfit = row.profit ? row.profit: '';
    
    const rowDate = row.date ? new Date(row.date) : null;
    const day = rowDate ? rowDate.getDate().toString() : '';
    const month = rowDate ? (rowDate.getMonth() + 1).toString() : ''; // Months are 0-based, so add 1
    const year = rowDate ? rowDate.getFullYear().toString() : '';
    const formattedDate = rowDate ? `${day}/${month}/${year}` : '';
    const formattedDateString = rowDate ? rowDate.toDateString().toLowerCase() : '';
  
    const rowPlace = row.place ? row.place.toLowerCase() : '';
    const rowSolution =  row.solution ?  row.solution.toLowerCase() : '';
  
    return (
      rowName.includes(lowerSearchQuery) ||
      rowDeal.includes(lowerSearchQuery) ||
      rowTime.includes(lowerSearchQuery) ||
      rowMoney.includes(lowerSearchQuery) ||
      rowProfit.includes(lowerSearchQuery) ||
      formattedDate.includes(lowerSearchQuery) ||
      formattedDateString.includes(lowerSearchQuery) ||
      rowPlace.includes(lowerSearchQuery) ||
      rowSolution.includes(lowerSearchQuery)
    );
  });

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    {
      field: 'date',
      headerName: 'Date you met',
      type: 'date',
      width: 80,
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
      width: 200,
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
      width: 120,
      editable: true,
      renderCell: (params) => params.value.toLocaleString(),
    },
    {
      field: 'profit',
      headerName: 'Profit',
      width: 120,
      editable: true,
      renderCell: (params) => params.value.toLocaleString(),
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
      <PageHeader title={'Deal List'} breadcrumbs={['Deal', 'List']} />
      <DataGrid
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
