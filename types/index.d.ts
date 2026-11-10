export type Ctx = { tokens?: number; window: number; percent?: number }

declare module 'claude-code' {
  interface PluginState {
    'context-band': { ctx: Ctx | null }
  }
}
