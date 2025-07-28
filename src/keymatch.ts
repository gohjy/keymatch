/**
 * Parses an Electron-style match string into its components
 */
function parseMatchString(matchString: string) {
  if (!matchString?.trim()) {
    return { ctrl: false, alt: false, shift: false, meta: false, key: '' };
  }

  const parts = matchString.split('+');
  const key = parts[parts.length - 1]?.toLowerCase();
  if (!key) {
    throw new Error(`Invalid accelerator: ${matchString}`);
  }

  const modifierParts = parts.slice(0, -1).map(part => part.toLowerCase());
  let ctrl = false, alt = false, shift = false, meta = false;

  for (const modifier of modifierParts) {
    switch (modifier) {
      case 'cmd':
      case 'command':
        meta = true;
        break;
      case 'ctrl':
      case 'control':
        ctrl = true;
        break;
      case 'cmdorctrl':
      case 'commandorcontrol':
        if (isMac()) {
          meta = true;
        } else {
          ctrl = true;
        }
        break;
      case 'alt':
        alt = true;
        break;
      case 'option':
        if (isMac()) {
          alt = true;
        }
        break;
      case 'shift':
        shift = true;
        break;
      case 'meta':
      case 'super':
        meta = true;
        break;
    }
  }

  return { ctrl, alt, shift, meta, key };
}

/**
 * Normalizes a key from a KeyboardEvent to match Electron's key naming
 */
function normalizeKey(key: string): string {
  const keyMap: Record<string, string> = {
    ' ': 'space',
    'arrowup': 'up',
    'arrowdown': 'down',
    'arrowleft': 'left',
    'arrowright': 'right',

  };

  const normalized = key.toLowerCase();
  return keyMap[normalized] || normalized;
}

/**
 * Checks if a KeyboardEvent matches an Electron accelerator string
 * 
 * @example
 * ```typescript
 * if (matchesShortcut(event, 'CmdOrCtrl+N')) {
 *   event.preventDefault();
 *   createNewFile();
 * }
 * ```
 */
export function keymatch(event: KeyboardEvent, matchString: string): boolean {
  const { ctrl, alt, shift, meta, key } = parseMatchString(matchString);

  return normalizeKey(event.key) === key &&
    event.ctrlKey === ctrl &&
    event.altKey === alt &&
    event.shiftKey === shift &&
    event.metaKey === meta;
}

/**
 * Checks if the current platform is macOS using `navigator.platform`.
 */
export function isMac() {
  return navigator.platform.toLowerCase().includes('mac');
}