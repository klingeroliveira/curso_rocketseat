const { query } = require('../../config/db')
const db = require('../../config/db')
const fs = require('fs')

module.exports = {
    create({ filename, path, recipes_id }) {

        const query = `
            INSERT INTO files(
                name,
                path,
                recipes_id
                )
            VALUES ($1, $2, $3)
            RETURNING id
        `

        const values = [
            filename,
            path,
            recipes_id
        ]

        return db.query(query, values)

    },

    async delete(id) {

        try {
            const result = await db.query(`Select * from files where id = $1`, [id])
            const file = result.rows[0]

            fs.unlinkSync(file.path)


            return db.query(`delete from files where id = $1`, [id])

        } catch (err) {
            console.error(err)
        }

    }
}