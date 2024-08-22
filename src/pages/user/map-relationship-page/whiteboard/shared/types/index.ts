import type { z } from 'zod';
import { Node } from '../schemas/node';
import type {
  GetPageResponse,
  StageConfig,
  UpdatePageBody,
  UpdatePageResponse,
} from '../schemas/page';
import type { defaultTheme, darkTheme } from '../design/theme';

const { nodeProps, style, type } = Node.shape;

export interface NodeObject<T extends NodeType = NodeType>
  extends z.infer<typeof Node> {
  type: T;
}
export type NodeProps = z.infer<typeof nodeProps>;
export type NodeStyle = z.infer<typeof style>;
export type NodeType = z.infer<typeof type>;

export type DrawableNodeType = Exclude<NodeType, 'text'>;

export type NodeLine = NodeStyle['line'];
export type NodeSize = NodeStyle['size'];
export type NodeColor = NodeStyle['color'];
export type NodeFill = NodeStyle['fill'];
export type ArrowStartHead = NodeStyle['arrowStartHead'];
export type ArrowEndHead = NodeStyle['arrowEndHead'];

export type ArrowHead = ArrowEndHead | ArrowStartHead;
export type ArrowHeadDirection = 'start' | 'end';

export type Point = z.infer<(typeof nodeProps)['shape']['point']>;

export type StageConfig = z.infer<typeof StageConfig>;

export type ThemeColors = typeof defaultTheme['colors'] | typeof darkTheme['colors'];
export type ThemeColorValue = ThemeColors[keyof ThemeColors]['value'];
export type ThemeColorKey = keyof ThemeColors;

export type GetPageResponse = z.infer<typeof GetPageResponse>;

export type UpdatePageRequestBody = z.infer<typeof UpdatePageBody>;
export type UpdatePageResponse = z.infer<typeof UpdatePageResponse>;

