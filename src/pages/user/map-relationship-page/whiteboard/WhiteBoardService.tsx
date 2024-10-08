import {
  lazy,
  useCallback,
  useRef,
  useState,
} from 'react';
import Panels from './components/Panels/Panels';
import ContextMenu from './components/ContextMenu/ContextMenu';
import { setCursorByToolType } from './components/Canvas/DrawingCanvas/helpers/cursor';
import type { ContextMenuType } from './components/ContextMenu/ContextMenu';

import { useAppDispatch, useAppStore } from './stores/hooks';
import type { HistoryActionKey } from './stores/reducers/history';
import { historyActions } from './stores/reducers/history';

import { canvasActions } from './services/canvas/slice';

import useWindowSize from './hooks/useWindowSize/useWindowSize';
import useAutoFocus from './hooks/useAutoFocus/useAutoFocus';
import { TOOLS } from './constants/panels';
import { KEYS } from './constants/keys';

import * as Styled from './App.styled';
import type Konva from 'konva';

const DrawingCanvas = lazy(
  () => import('./components/Canvas/DrawingCanvas/DrawingCanvas'),
);

const WhiteBoardService = () => {
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);
  const [menuType, setMenuType] = useState<ContextMenuType>('canvas-menu');

  const store = useAppStore();
  const windowSize = useWindowSize();

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
    [store, dispatch],
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

  return (
    <Styled.AppWrapper
      ref={appWrapperRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <Panels selectedNodeIds={selectedNodeIds} />
      {(
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
      )}
    </Styled.AppWrapper>
  );
};

export default WhiteBoardService;
