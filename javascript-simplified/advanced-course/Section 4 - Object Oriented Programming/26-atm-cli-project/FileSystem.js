import { readFile, writeFile } from "fs/promises"
export default class FileSystem {
	static read(path) {
		return new Promise(async (resolve, reject) => {
			try {
				const data = await readFile(path)
				resolve(data)
			} catch (err) {
				reject(err)
			}
		})
	}

	static write(path, content) {
		return new Promise(async (resolve, reject) => {
			try {
				await writeFile(path, content.toString())
				resolve()
			} catch (err) {
				reject(err)
			}
		})
	}
}
