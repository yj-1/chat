import { readdirSync,statSync } from 'fs'
import { resolve, extname, basename } from 'path'

const fix = (path:string):string => resolve(__dirname, path)
const splic = (path1:string, path2:string) => resolve(path1, path2)

// 1、判断文件类型

const getEntries = async (path:string = fix('../router'), filename?:string) => {
  const file = statSync(path)
  if(file?.isFile()) {
   const _file = await import(path)
   const routePath = _file?._path || filename
    const obj = {
      path: '/'+routePath,
      fn: _file?.default
    }
    return Promise.resolve(obj)
  } else if(file?.isDirectory()) {
    const dir = readdirSync(path)
    const data = []
    for(const ele of dir) {
      const ext = extname(ele)
      const filename = basename(ele, ext)
      if (/^.[tj]s/.test(ext)) {
        data.push(await getEntries(splic(path, ele), filename))
      }
    }
    return Promise.resolve(data)
  } else {
    return Promise.reject(new Error('未知错误！'))
  }
}

export default getEntries