const { writeFile, getUrlToHtmlFile } = require('./utils')

const LIB_HTML_SEPARATOR = '\n    '

function prepareHtmlContent(libs) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Estimo Template</title>
  </head>
  <body>
    <h1>Estimo</h1>
    ${libs.map(lib => `<script src="${lib}"></script>`).join(LIB_HTML_SEPARATOR)}
  </body>
</html>
`
}

async function generateHtmlFile(filePath, libs) {
  const files = Array.isArray(libs) ? libs : [libs]
  try {
    await writeFile(filePath, prepareHtmlContent(files))
    return getUrlToHtmlFile(filePath)
  } catch (error) {
    console.error(error.stack)
    return process.exit(1)
  }
}

module.exports = { generateHtmlFile, prepareHtmlContent }
