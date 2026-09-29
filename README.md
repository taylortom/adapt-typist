# adapt-typist

A component that types a list of texts one after another, deleting each before typing the next.

The animation starts once the component is fully in view. After the first pass through the texts the component is complete. Unless it's set to loop, the texts are then shown together as paragraphs. With `prefers-reduced-motion` set, the texts are shown together straight away. Screen readers get the full list of texts rather than the animation.

Supports the authoring tool.

## Settings

The following are set in `components.json`:

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `initialText` | String | `""` | Shown before the animation starts, then typed over |
| `texts` | Array | `[]` | The texts to type, in order |
| `loop` | Boolean | `false` | Keep typing the texts once the last one is reached |
| `fontSize` | String | `"20"` | Size of the typed text in px |

See [example.json](example.json).
