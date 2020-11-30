const { notEmpty } = require('../utils.js')

module.exports = {
  description: 'generate a router',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'view name please',
    validate: notEmpty('name')
  },
  ],
  actions: data => {
    const name = '{{name}}'
    const actions = [{
      type: 'add',
      path: `src/router/modules/${name}.js`,
      templateFile: 'plop-templates/router/index.hbs',
      data: {
        name: name,
      }
    }]

    return actions
  }
}
