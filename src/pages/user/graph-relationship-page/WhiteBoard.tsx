import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import Panels from './components/Panels/Panels';
import Loader from './components/Elements/Loader/Loader';
import ContextMenu from './components/ContextMenu/ContextMenu';
import type { ContextMenuType } from './components/ContextMenu/ContextMenu';
import { setCursorByToolType } from './components/Canvas/DrawingCanvas/helpers/cursor';

import { useAppDispatch, useAppStore } from '@/stores/hooks';
import { historyActions } from './stores/reducers/history';
import type { HistoryActionKey } from './stores/reducers/history';

import { canvasActions } from '@/services/canvas/slice';
import { libraryActions } from '@/services/library/slice';

import { storage } from '@/utils/storage';

import { useWebSocket } from './contexts/websocket';

import useParam from './hooks/useParam/useParam';
import useWindowSize from './hooks/useWindowSize/useWindowSize';
import useFontFaceObserver from './hooks/useFontFaceObserver';
import useAutoFocus from './hooks/useAutoFocus/useAutoFocus';

import {
  LOCAL_STORAGE_KEY,
  LOCAL_STORAGE_LIBRARY_KEY,
  LOADING_TEXT,
} from '@/constants/app';
import { TOOLS } from './constants/panels';
import { KEYS } from './constants/keys';
import { TEXT } from './constants/shape';
import type { Library, AppState } from '@/constants/app';

import { CONSTANTS } from 'shared';

import * as Styled from './App.styled';

import type Konva from 'konva';

const DrawingCanvas = lazy(
  () => import('@/components/Canvas/DrawingCanvas/DrawingCanvas'),
);

const App = () => {
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);
  const [menuType, setMenuType] = useState<ContextMenuType>('canvas-menu');

  const store = useAppStore();
  const roomId = useParam(CONSTANTS.COLLAB_ROOM_URL_PARAM);
  const windowSize = useWindowSize();
  const ws = useWebSocket();
  /*
   * Triggers re-render when font is loaded
   * to make sure font is loaded before rendering nodes
   */
  const { loading } = useFontFaceObserver(TEXT.FONT_FAMILY);
  const appWrapperRef = useAutoFocus<HTMLDivElement>();
  const stageRef = useRef<Konva.Stage>(null);
  const dispatch = useAppDispatch();

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const state = store.getState().canvas.present;

      const { key, shiftKey, ctrlKey } = event;
      const lowerCaseKey = key.toLowerCase();

      const onCtrlKey = (key: string) => {
        switch (key) {
          case KEYS.A: {
            event.preventDefault();
            dispatch(canvasActions.selectAllNodes());
            break;
          }
          case KEYS.Z: {
            if (ws.isConnected) {
              return;
            }
            const actionKey: HistoryActionKey = shiftKey ? 'redo' : 'undo';
            const action = historyActions[actionKey];

            dispatch(action());
            break;
          }
          case KEYS.D: {
            event.preventDefault();

            const selectedNodes = state.nodes.filter(
              (node) => node.nodeProps.id in state.selectedNodeIds,
            );

            dispatch(
              canvasActions.addNodes(selectedNodes, {
                duplicate: true,
                selectNodes: true,
              }),
            );
            break;
          }
          case KEYS.C: {
            dispatch(canvasActions.copyNodes());
            break;
          }
          case KEYS.V: {
            dispatch(
              canvasActions.addNodes(state.copiedNodes, {
                duplicate: true,
                selectNodes: true,
              }),
            );
            break;
          }
        }
      };

      if (ctrlKey) {
        return onCtrlKey(lowerCaseKey);
      }

      if (key === KEYS.DELETE) {
        dispatch(canvasActions.deleteNodes(Object.keys(state.selectedNodeIds)));
        return;
      }

      const toolByKey = TOOLS.find((tool) => tool.key === lowerCaseKey);

      if (toolByKey) {
        dispatch(canvasActions.setToolType(toolByKey.value));
        setCursorByToolType(stageRef.current, toolByKey.value);
      }
    },
    [ws, store, dispatch],
  );

  const handleContextMenuOpen = useCallback(
    (open: boolean) => {
      if (!open) {
        return;
      }

      setMenuType(selectedNodeIds.length ? 'node-menu' : 'canvas-menu');
    },
    [selectedNodeIds.length],
  );

  useEffect(() => {
    if (ws.isConnected || ws.isConnecting || roomId) {
      return;
    }

    const storedCanvasState = storage.get<AppState>(LOCAL_STORAGE_KEY);

    if (storedCanvasState) {
      dispatch(canvasActions.set(storedCanvasState.page));
    }
  }, [ws, roomId, dispatch]);

  useEffect(() => {
    const storedLibrary = storage.get<Library>(LOCAL_STORAGE_LIBRARY_KEY);

    if (storedLibrary) {
      dispatch(libraryActions.set(storedLibrary));
    }
  }, [dispatch]);

  return (
    <Styled.AppWrapper
      ref={appWrapperRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <Panels selectedNodeIds={selectedNodeIds} />
      {loading && <Loader fullScreen>{LOADING_TEXT}</Loader>}
      {!loading && (
        <Suspense fallback={<Loader fullScreen>{LOADING_TEXT}</Loader>}>
          <ContextMenu
            menuType={menuType}
            onContextMenuOpen={handleContextMenuOpen}
          >
            <ContextMenu.Trigger>
              <DrawingCanvas
                ref={stageRef}
                width={windowSize.width}
                height={windowSize.height}
                onNodesSelect={setSelectedNodeIds}
              />
            </ContextMenu.Trigger>
          </ContextMenu>
        </Suspense>
      )}
    </Styled.AppWrapper>
  );
};

export default App;