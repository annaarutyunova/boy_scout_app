import fs from 'fs'
import path from 'path'

export const post = async (ctx) => {
	const data = await ctx.request.json()

    fs.mkdirSync(path.join('static', 'data', data.id), {recursive: true})

    fs.writeFileSync(path.join('static', 'data', data.id, 'data.json'), JSON.stringify(data))

	return {
        headers: {'content-type': 'application/json'},
        body: data
    }
};
