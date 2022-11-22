# Svelte Icon Init

## How to install

1. Create the `~/bin` directory if it doesn't exist
2. Clone this repository to `~/bin/svelte-icon-init`
3. Run these commands in in `~/bin/svelte-icon-init`

```bash
nvm install
npm install
```

4. Add this function in `~/.zshrc`

```bash
svelte () {
  if (($#  == 0))
  then
    echo "Usage: svelte <project-name>"
    return 1
  fi
  echo "Initializing new svelte project with tailwind and icons in $1"
  cd $(node ~/bin/svelte-icon-init/index.mjs $1 | tail -1)
  code .
  npm run dev -- --open
}
```

5. Open a new terminal and run `svelte <project-name>` to initialize a new project
