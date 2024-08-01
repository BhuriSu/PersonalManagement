import type { NodeObject, NodeType } from '../../../shared/src/types';
import ArrowDrawable from '../../Canvas/Shapes/ArrowDrawable/ArrowDrawable';
import EllipseDrawable from '../../Canvas/Shapes/EllipseDrawable/EllipseDrawable';
import FreePathDrawable from '../../Canvas/Shapes/FreePathDrawable/FreePathDrawable';
import RectDrawable from '../../Canvas/Shapes/RectDrawable/RectDrawable';
import EditableText from '../Shapes/EditableText/EditableText';
import { memo } from 'react';

export type NodeComponentProps<Type extends NodeType = NodeType> = {
  node: NodeObject<Type>;
  selected: boolean;
  editing?: boolean;
  stageScale: number;
  onNodeChange: (node: NodeObject<Type>) => void;
  onNodeDelete?: (node: NodeObject<Type>) => void;
  onTextChange?: (node: NodeObject<Type>) => void;
};

const elements = {
  arrow: ArrowDrawable,
  rectangle: RectDrawable,
  ellipse: EllipseDrawable,
  draw: FreePathDrawable,
  text: EditableText,
};

const Node = <T extends NodeType>({
  node,
  ...restProps
}: NodeComponentProps<T>) => {
  const Element: React.ElementType = elements[node.type as keyof typeof elements];

  return <Element node={node} {...restProps} />;
};

export default memo(Node);
