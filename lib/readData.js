import fs from 'fs'
import path from 'path'
import neatCsv from 'neat-csv'

const publicDir = path.join(process.cwd(), 'public')

export default function readData() {
  const filePath = path.join(publicDir, 'candidates.csv')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  return neatCsv(fileContents)
}
