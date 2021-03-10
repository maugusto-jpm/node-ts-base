import fs from 'fs-extra'

const srcDirs = process.argv[2].split(' ')
const destDir = process.argv[3]

srcDirs.forEach(srcDir => {
  fs.copySync(srcDir, `${destDir}/${srcDir}`)
})
