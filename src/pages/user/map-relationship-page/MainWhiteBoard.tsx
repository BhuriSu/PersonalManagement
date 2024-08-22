import { globalStyle } from './global-style';
import WhiteBoardService from './whiteboard/WhiteBoardService';
import { AppProvider } from './whiteboard/providers/app';
globalStyle();
const MainWhiteBoard = () => {
  return (
    <div>
         <AppProvider>
         <WhiteBoardService />
         </AppProvider>
    </div>
  );
};

export default MainWhiteBoard;