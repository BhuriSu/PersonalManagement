import { useCallback, memo } from 'react';
import useNetworkState from '../../hooks/useNetworkState/useNetworkState';
import { useAppDispatch, useAppSelector, useAppStore } from '../../stores/hooks';
import {
  canvasActions,
  selectConfig,
  selectFutureHistory,
  selectPastHistory,
  selectToolType,
  useSelectNodesById,
} from '../../services/canvas/slice';
import StylePanel from './StylePanel/StylePanel';
import ToolButtons from './ToolButtons/ToolButtons';
import ZoomButtons from './ZoomButtons';
import HistoryButtons from './HistoryButtons';
import DeleteButton from './DeleteButton';
import { DRAWING_CANVAS } from '../../constants/canvas';
import { historyActions } from '../../stores/reducers/history';
import { calculateCenterPoint } from '../../utils/position';
import { calculateStageZoomRelativeToPoint } from '../Canvas/DrawingCanvas/helpers/zoom';
import * as Styled from './Panels.styled';
import { shallowEqual } from '../../utils/object';
import { setCursorByToolType } from '../Canvas/DrawingCanvas/helpers/cursor';
import { findStageByName } from '../../utils/node';
import type { NodeStyle } from '../../shared/types';
import type {
  HistoryControlKey,
  ZoomActionKey,
} from '../../constants/panels';
import type { ToolType } from '../../constants/app';

type Props = {
  selectedNodeIds: string[];
};

const Panels = ({ selectedNodeIds }: Props) => {
  const store = useAppStore();
  const stageConfig = useAppSelector(selectConfig);
  const toolType = useAppSelector(selectToolType);
  const past = useAppSelector(selectPastHistory);
  const future = useAppSelector(selectFutureHistory);

  const selectedNodes = useSelectNodesById(selectedNodeIds);
  const { online } = useNetworkState();

  const dispatch = useAppDispatch();

  const isHandTool = toolType === 'hand';
  const showStylePanel =
    selectedNodeIds.length > 0 && !isHandTool;

  const handleToolSelect = useCallback(
    (type: ToolType) => {
      dispatch(canvasActions.setToolType(type));

      const stage = findStageByName(DRAWING_CANVAS.NAME);
      setCursorByToolType(stage, type);
    },
    [dispatch],
  );

  const handleStyleChange = (style: Partial<NodeStyle>) => {
    const state = store.getState().canvas.present;

    const nodesToUpdate = state.nodes.filter((node) => {
      return node.nodeProps.id in state.selectedNodeIds;
    });

    const updatedNodes = nodesToUpdate.map((node) => {
      return { ...node, style: { ...node.style, ...style } };
    });

    dispatch(canvasActions.updateNodes(updatedNodes));
    dispatch(canvasActions.setCurrentNodeStyle(style));
  };

  const handleZoomChange = useCallback(
    (action: ZoomActionKey) => {
      const stagePosition = stageConfig.position;
      const oldScale = stageConfig.scale;
      const viewportCenter = calculateCenterPoint(
        window.innerWidth,
        window.innerHeight,
      );

      const direction = action === 'reset' ? 0 : action === 'in' ? 1 : -1;

      const updatedStageConfig = calculateStageZoomRelativeToPoint(
        oldScale,
        viewportCenter,
        stagePosition,
        direction,
      );

      dispatch(canvasActions.setStageConfig(updatedStageConfig));
    },
    [stageConfig, dispatch],
  );

  const handleHistoryAction = useCallback(
    (type: HistoryControlKey) => {
      const action = historyActions[type];

      if (action) {
        dispatch(action());
      }
    },
    [dispatch],
  );

  const handleNodesDelete = useCallback(() => {
    dispatch(canvasActions.deleteNodes(selectedNodeIds));
  }, [selectedNodeIds, dispatch]);

  return (
    <Styled.Container>
      <Styled.TopPanels>
        {!isHandTool && (
          <Styled.Panel>
            <HistoryButtons
              disabledUndo={!past.length}
              disabledRedo={!future.length}
              onClick={handleHistoryAction}
            />
            <DeleteButton
              disabled={!selectedNodeIds.length}
              onClick={handleNodesDelete}
            />
          </Styled.Panel>
        )}
        {showStylePanel && (
          <StylePanel
            selectedNodes={selectedNodes}
            onStyleChange={handleStyleChange}
          />
        )}
        <Styled.Panel css={{ marginLeft: 'auto' }}>
          {online}
        </Styled.Panel>
      </Styled.TopPanels>
      <Styled.BottomPanels direction={{ '@initial': 'column', '@xs': 'row' }}>
        <Styled.Panel css={{ '@xs': { marginRight: 'auto' } }}>
          <ZoomButtons
            value={stageConfig.scale}
            onZoomChange={handleZoomChange}
          />
        </Styled.Panel>
        <Styled.Panel css={{ height: '100%' }}>
          <ToolButtons activeTool={toolType} onToolSelect={handleToolSelect} />
        </Styled.Panel>
      </Styled.BottomPanels>
    </Styled.Container>
  );
};

const areEqual = (prevProps: Props, nextProps: Props) => {
  return shallowEqual(prevProps.selectedNodeIds, nextProps.selectedNodeIds);
};

export default memo(Panels, areEqual);
