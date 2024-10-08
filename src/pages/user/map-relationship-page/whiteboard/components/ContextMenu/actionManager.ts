
import { useAppDispatch, useAppStore } from '../../stores/hooks';
import { canvasActions } from '../../services/canvas/slice';
import type { ContextMenuAction } from './ContextMenu';

function useActionManager() {
  const store = useAppStore();

  const dispatch = useAppDispatch();

  const dispatchAction = (action: ContextMenuAction) => {
    const state = store.getState().canvas.present;

    switch (action) {
      case 'select-all': {
        return dispatch(canvasActions.selectAllNodes());
      }
      case 'paste-nodes': {
        return dispatch(
          canvasActions.addNodes(state.copiedNodes, {
            duplicate: true,
            selectNodes: true,
          }),
        );
      }
      case 'delete-nodes': {
        const nodesIds = Object.keys(state.selectedNodeIds);
        return dispatch(canvasActions.deleteNodes(nodesIds));
      }
      case 'move-nodes-to-start':
        return dispatch(
          canvasActions.moveNodesToStart(Object.keys(state.selectedNodeIds)),
        );
      case 'move-nodes-to-end':
        return dispatch(
          canvasActions.moveNodesToEnd(Object.keys(state.selectedNodeIds)),
        );
      case 'move-nodes-forward':
        return dispatch(
          canvasActions.moveNodesForward(Object.keys(state.selectedNodeIds)),
        );
      case 'move-nodes-backward': {
        return dispatch(
          canvasActions.moveNodesBackward(Object.keys(state.selectedNodeIds)),
        );
      }
      case 'duplicate-nodes': {
        const nodesToDuplicate = state.nodes.filter(
          ({ nodeProps }) => nodeProps.id in state.selectedNodeIds,
        );

        return dispatch(
          canvasActions.addNodes(nodesToDuplicate, {
            duplicate: true,
            selectNodes: true,
          }),
        );
      }
      case 'select-none': {
        return dispatch(canvasActions.unselectAllNodes());
      }
      case 'copy-nodes': {
        return dispatch(canvasActions.copyNodes());
      }
    }
  };

  return dispatchAction;
}

export default useActionManager;
