# Rust slides

A [Slidev](https://sli.dev/) presentation.

## Development

```bash
pnpm install
pnpm dev
```

Then open <http://localhost:3030> and edit [`slides.md`](./slides.md).

## Build and export

```bash
pnpm build
pnpm export
```

The export script dismisses the Rust Playground multiple-file announcement in
the export browser. Slidev export options can still be passed through, for example:

```bash
pnpm export --range 1-5
```

