# keymatch

A utility for matching keyboard event.

## Installation

```plain
import { keymatch } from "https://cdn.jsdelivr.net/gh/gohjy/keymatch/keymatch.js";
```

## Usage

### Adapting to Platform-Specific Modifiers

Use "CmdOrCtrl" to adapt your modifier key to "Command" (MacOS) or "Ctrl" depending on the platform. This can be combined with other modifiers like "Alt" or "Shift" using `+`: 

```typescript
import { keymatch } from 'keymatch';

document.addEventListener('keydown', (event) => {
  if (keymatch(event, 'CmdOrCtrl+Shift+N')) {
    event.preventDefault();
    createNewFile();
  }
});
```

### Handling Single Letter Matches

You can also handle single-letter matches that explicitly *don't* have modifiers. For example, this matches when "A" is pressed, but not when "Cmd+A" is pressed:

```typescript
document.addEventListener('keydown', (event) => {
  if (keymatch(event, 'A')) {
    event.preventDefault();
    selectAll();
  }
});
```

### Using Platform-Specific matches

You can also create platform-specific matches by combining with the isMac() utility. This example uses `Cmd` for a MacOS shortcut, and `Ctrl+Shift` for other platforms:

```typescript
import { keymatch, isMac } from 'keymatch';

document.addEventListener('keydown', (event) => {
  if (keymatch(event, isMac() ? 'Cmd+K' : 'Ctrl+Shift+K')) {
    event.preventDefault();
    openCommandPalette();
  }
});
```

### Handling Arrow Keys

keymatch also supports Electron accelerator shorthands, like "Up" to represent "ArrowUp":

```typescript
document.addEventListener('keydown', (event) => {
  if (keymatch(event, 'CmdOrCtrl+Up')) {
    event.preventDefault();
    moveSelectionToTop();
  }
});
```

## Supported Accelerator Formats

The library supports [Electron-style accelerator strings](https://www.electronjs.org/docs/latest/api/accelerator):

### Modifiers
- `Cmd` or `Command` - Maps to metaKey (⌘ on Mac)
- `Ctrl` or `Control` - Maps to ctrlKey 
- `CmdOrCtrl` or `CommandOrControl` - Uses Cmd on MacOS, Ctrl on other platforms
- `Alt` - Uses Option on MacOS, Alt on other platforms
- `Shift` - Maps to shiftKey
- `Meta` or `Super` - Maps to metaKey
- `Option` - Maps to Option on MacOS. Note this modifier will only match on MacOS! Use `Alt` for a platform-agnostic match.

### Keys
Any key that can be captured by a KeyboardEvent, including:
- Letter keys: `A`, `B`, `C`, etc.
- Number keys: `1`, `2`, `3`, etc.
- Function keys: `F1`, `F2`, `F3`, etc.
- Special keys: `Space`, `Enter`, `Escape`, `Tab`, `Delete`, etc.
- Arrow keys: `Up`, `Down`, `Left`, `Right` (also accepts `ArrowUp`, `ArrowDown`, etc.)

## API

### `keymatch(event: KeyboardEvent, accelerator: string): boolean`

Checks if a KeyboardEvent matches the given accelerator string.

**Parameters:**
- `event` - The web-standard KeyboardEvent to test
- `accelerator` - The Electron-style accelerator string

**Returns:**
- `boolean` - True if the event matches the accelerator

### `isMac(): boolean`

Utility function to detect if the current platform is MacOS.

**Returns:**
- `boolean` - True if running on MacOS, false otherwise

## License

MIT
