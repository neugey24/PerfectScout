module.exports = {
  processTemplate: function (templateFile, templateData) {
    const fs = require('fs');
    const Handlebars = require('handlebars');
    var templateContents = fs.readFileSync(`templates/${templateFile}.hbs`);
    var compiled = Handlebars.compile(templateContents.toString());
    return compiled(templateData);
  }
};
