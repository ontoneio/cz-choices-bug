## Issue Title
[bug] - Breaks as Commitizen plugin and standalone using custom config and config example

- Reported At: https://github.com/leoforfree/cz-customizable/issues
- Bug Repro URL : https://github.com/ontoneio/cz-choices-bug

### Dependency info

- Nodejs: `16.16.0`
- Yarn: `1.22.19`
- commitizen: 4.2.5
- cz-cli: 1.0.0
- cz-customizable: 6.9.1

### Brief

- Expecting this package to provide the ability use provided custom scopes and guided commit formatting settings via configuration file `tools/.cz-config.js` as a `commitizen` plugin.
- When following documentation there is no reference to providing any kind of `choices` parameter
- Tried using `tools/projectScopes.js` to implement custom scopes function for use with other tooling. ex: `commitlint`
- Also tried barebones example config from repo with similar results
- Dynamic and static config test setups in `tools/.cz-config.js` can be found on starting on line `37`.

#### Steps taken

I followed instructions from this config instruction in [Configuration (Shared between options 1,2 and 3)](https://github.com/leoforfree/cz-customizable#configuration-shared-between-options-12-and-3) which results in below output when run from script `prepare-commit` in the `package.json`.

```bash
 *  Executing task: yarn run prepare-commit 

yarn run v1.22.19
$ cz -e
cz-cli@4.2.5, cz-customizable@6.9.1

>>> Using cz-customizable config specified in your package.json:  /home/vscode/projects/opensource/bugs/cz-choices-bug/tools/.cz-config.js
All lines except first will be wrapped after 100 characters.
You must provide a `choices` parameter <----------------------------------- ERROR APPEARS HERE
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

 *  The terminal process "/usr/bin/bash '-c', 'yarn run prepare-commit'" terminated with exit code: 1. 
 *  Terminal will be reused by tasks, press any key to close it.

```

as well as using the instructions from [Option 2 - cz-customizable in standalone mode](https://github.com/leoforfree/cz-customizable#option-2---cz-customizable-in-standalone-mode) which results in below output when run from script `commit` in the `package.json`.

```bash
yarn run v1.22.19
$ ./node_modules/cz-customizable/standalone.js
cz-customizable standalone version
>>> Using cz-customizable config specified in your package.json:  /home/vscode/projects/opensource/bugs/cz-choices-bug/tools/.cz-config.js
All lines except first will be wrapped after 100 characters.
/home/vscode/projects/opensource/bugs/cz-choices-bug/node_modules/inquirer/lib/prompts/base.js:80
    throw new Error('You must provide a `' + name + '` parameter');
          ^

Error: You must provide a `choices` parameter <--- ERROR with reference to `choices` in standalone mode
    at ListPrompt.throwParamError (/home/vscode/projects/opensource/bugs/cz-choices-bug/node_modules/inquirer/lib/prompts/base.js:80:11)
    at new ListPrompt (/home/vscode/projects/opensource/bugs/cz-choices-bug/node_modules/inquirer/lib/prompts/list.js:21:12)
    at PromptUI.fetchAnswer (/home/vscode/projects/opensource/bugs/cz-choices-bug/node_modules/inquirer/lib/ui/prompt.js:103:25)
    at doInnerSub (/home/vscode/projects/opensource/bugs/cz-choices-bug/node_modules/rxjs/dist/cjs/internal/operators/mergeInternals.js:22:31)
    at outerNext (/home/vscode/projects/opensource/bugs/cz-choices-bug/node_modules/rxjs/dist/cjs/internal/operators/mergeInternals.js:17:70)
    at OperatorSubscriber._this._next (/home/vscode/projects/opensource/bugs/cz-choices-bug/node_modules/rxjs/dist/cjs/internal/operators/OperatorSubscriber.js:33:21)
    at OperatorSubscriber.Subscriber.next (/home/vscode/projects/opensource/bugs/cz-choices-bug/node_modules/rxjs/dist/cjs/internal/Subscriber.js:51:18)
    at /home/vscode/projects/opensource/bugs/cz-choices-bug/node_modules/rxjs/dist/cjs/internal/operators/mergeInternals.js:28:28
    at OperatorSubscriber._this._next (/home/vscode/projects/opensource/bugs/cz-choices-bug/node_modules/rxjs/dist/cjs/internal/operators/OperatorSubscriber.js:33:21)
    at OperatorSubscriber.Subscriber.next (/home/vscode/projects/opensource/bugs/cz-choices-bug/node_modules/rxjs/dist/cjs/internal/Subscriber.js:51:18)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

 *  The terminal process "/usr/bin/bash '-c', 'yarn run commit'" terminated with exit code: 1. 
 *  Terminal will be reused by tasks, press any key to close it.

```

### Reproduction

1. Clone repo `git clone https://github.com/ontoneio/cz-choices-bug`
2. Make changes to `index.js` files located in `apps/app1|app2`
3. Run `yarn` both scripts from root level `package.json`
    a. `prepare-commit` assumes `cz-customizable` is a `commitizen` plugin
    b. `commit` assumes `cz-customizable` is a `standalone` plugin
4. Expect to see menu prompt for building commit messages.
5. Errors out in both scripts. Note any references to `choices` parameter in both scripts.


