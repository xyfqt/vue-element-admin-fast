const { notEmpty } = require('../utils.js')

module.exports = {
  description: 'generate a view',
  prompts: [
    {
      type: 'input',
      name: 'dir',
      message: 'view dir please',
      validate: notEmpty('dir')
    },
    {
      type: 'input',
      name: 'name',
      message: 'view name please',
      validate: notEmpty('name')
    },
  {
    type: 'checkbox',
    name: 'blocks',
    message: 'Blocks:',
    choices: [{
      name: '<template>',
      value: 'template',
      checked: true
    },
    {
      name: '<script>',
      value: 'script',
      checked: true
    },
    {
      name: 'style',
      value: 'style',
      checked: true
    }
    ],
    validate(value) {
      if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
        return 'View require at least a <script> or <template> tag.'
      }
      return true
    }
  }
  ],
  actions: data => {
    const name = '{{name}}'
    const dir = '{{dir}}'
    const actions = [{
      type: 'add',
      path: `src/views/${dir}/{{ properCase name}}.vue`,
      templateFile: 'plop-templates/view/index.hbs',
      data: {
        name: name,
        dir:dir,
        template: data.blocks.includes('template'),
        script: data.blocks.includes('script'),
        style: data.blocks.includes('style')
      }
    },
    {
      type: 'add',
      path: `src/api/${dir}/${name}.js`,
      templateFile: 'plop-templates/view/api.hbs',
      data: {
        name: name,
      }
    }
    // {
    //   type: 'add',
    //   path: `src/router/modules/${name}.js`,
    //   templateFile: 'plop-templates/router/index.hbs',
    //   data: {
    //     name: name,
    //   }
    // }
    ]

    return actions
  }
}
