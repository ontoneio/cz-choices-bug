const { readdirSync } = require("fs");

function getAllScopes() {
    let results = []
    const insertScopes = [
        '.devcontainer',
        '.github',
        '.husky',
        '.vscode',
        'nx',
        'yarn',
        'global',
        'test',
        'custom'
    ]
    const scopeTransformer = (scope = 'global') => (prefix) => `${scope}/${prefix}`
      const appScopes = readdirSync('./apps').map(scopeTransformer('apps'))
      results = [...appScopes, ...insertScopes]
      const filtered = results.filter(filterScopes)
      return filtered
}

function filterScopes(scope){
  const scopeEnd = scope.split('/')[1]
  switch (scopeEnd) {
    case '.gitkeep':
      return false
    case 'tsconfig.tools.json':
      return false

    default:
      return true
  }
}

module.exports = getAllScopes() //?