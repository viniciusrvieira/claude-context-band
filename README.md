# claude-context-band

A Claude Code plugin that keeps your context window usage visible above the prompt, so you don't have to run `/context` to check it.

It shows the percentage used, a 10-step progress bar and tokens used/total. The color changes as the window fills: green, yellow from 60%, red from 85%.

<p align="center">
  <img src="assets/states.png" alt="Green, yellow and red states of the context usage band" width="430">
</p>

The numbers refresh when a session starts and at the end of each turn.

## Install

In Claude Code, run:

```
/plugin marketplace add viniciusrvieira/claude-context-band
/plugin install context-band@context-band
```

Pick the user scope to enable it in every session.

## License

MIT. See [LICENSE](LICENSE).

---

© 2026 Vinícius R. Vieira
