import { atom, read, update } from 'claude-code';
import type { EngineInterface, Register } from 'claude-code';

import type { Ctx } from '../types';

const bar = (pct: number) => {
  const filled = Math.min(10, Math.max(0, Math.round(pct / 10)));
  return '▰'.repeat(filled) + '▱'.repeat(10 - filled);
};

const ctx = atom({ plugin: 'context-band', key: 'ctx' } as const, null);

async function refresh($: EngineInterface) {
  const { context } = await $.session.usage();
  const next: Ctx = {
    tokens: context.tokens,
    window: context.window,
    percent: context.percent,
  };
  await update($, ctx, () => next);
}

export const register: Register = (on) => {
  on('session.start', async ($, e, next) => {
    const r = await next(e);
    await refresh($);
    return r;
  });

  on('turn.complete', async ($, e, next) => {
    const r = await next(e);
    await refresh($);
    return r;
  });

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const below = await next(e);
    const c = await read($, ctx);
    if (e.props.hasSurvey || c === null || c.percent === undefined) {
      return below;
    }

    const { Box, Text } = $.ui.resolve(e);
    const pct = Math.round(c.percent);
    const color = pct >= 85 ? 'red' : pct >= 60 ? 'yellow' : 'green';
    const k = (n?: number) =>
      n === undefined ? '?' : `${Math.round(n / 1000)}k`;

    return (
      <Box flexDirection="column">
        {below}
        <Text>
          <Text dimColor>Context usage: </Text>
          <Text color={color}>
            {pct}% {bar(pct)}
          </Text>
          <Text dimColor>
            {' '}
            ({k(c.tokens)}/{k(c.window)})
          </Text>
        </Text>
      </Box>
    );
  });
};
