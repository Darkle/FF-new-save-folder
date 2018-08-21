const path = require('path')

const { exec: execPkg } = require('pkg')

const basePath = path.resolve(__dirname, '..')
const inputJSfile = path.join(basePath, 'appMain-compiled.js')
const pkgBuildFile = path.join(basePath, 'FF-Generate-New-Download-Folder')

const pkgParams = [
  '--config',
  'package.json',
  inputJSfile,
  '--target',
  'node8',
  '--output',
  pkgBuildFile
]

execPkg(pkgParams)
