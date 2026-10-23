# netb-be

## Installation process
- before installation run: ``before:module_alias``. It cleans aliases
- after install/uninstall packages run ``after:module_alias``. It adds aliases.
- In case of first ``npm install`` from scratch - just run ``after:module_alias`` after it.

All these manipulations needed for ensure that the main work folder will not be removed. Starting npm v7 sometimes this issue occurs.
