import { Schemas } from '../shared/schemas';
import { z } from 'zod';

export const BASE_URL = 'https://drawflux-api.onrender.com';
export const BASE_URL_DEV = 'http://localhost:7456';

export const BASE_WS_URL = 'wss://drawflux-api.onrender.com';
export const BASE_WS_URL_DEV = 'ws://localhost:7456';

export const IS_PROD = process.env.NODE_ENV === 'production';

export const LOCAL_STORAGE_KEY = 'drawflux';
export const LOCAL_STORAGE_THEME_KEY = 'drawflux-theme';

export const USER = {
  maxNameLength: 10,
};

export const ZOOM_RANGE: [Min: number, Max: number] = [0.1, 10];
export const ZOOM_MULTIPLIER_VALUE = 0.1;
export const ZOOM_WHEEL_STEP = 1.1;
export const DEFAULT_ZOOM_VALUE = 1;

const CanvasSchema = Schemas.Page.shape.page.shape;
const ShapeTools = Schemas.Node.shape.type.options;

export const appState = z.object({
  page: z.object({
    ...CanvasSchema,
    toolType: z.union([...ShapeTools, z.literal('hand'), z.literal('select')]),
    selectedNodeIds: z.record(z.string(), z.boolean()),
    currentNodeStyle: Schemas.Node.shape.style,
  }),
});

export type AppState = z.infer<typeof appState>;
export type ToolType = AppState['page']['toolType'];
