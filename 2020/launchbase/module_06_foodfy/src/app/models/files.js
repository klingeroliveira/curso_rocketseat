const { query } = require('../../config/db')
const db = require('../../config/db')
const fs = require('fs')

module.exports = {
    create({ filename, path }) {

        const query = `
            INSERT INTO files(
                name,
                path
                )
            VALUES ($1, $2)
            RETURNING id
        `

        const values = [
            filename,
            path
        ]

        return db.query(query, values)

    },

    async createRecipesFiles({ filename, path, recipes_id }) {
        try{
            let query = `
                INSERT INTO files(
                    name,
                    path
                    )
                VALUES ($1, $2)
                RETURNING id
            `

            let values = [
                filename,
                path
            ]

            const result = await db.query(query, values)
            const fileID = result.rows[0].id

            query = `
                INSERT INTO recipe_files(
                    file_id,
                    recipe_id
                VALUES($1, $2)
                RETURNING id
                )
            `

            values = [
                fileID,
                recipes_id
            ]

            return db.query(query, values)
        }
        catch(err) {
            console.error(err)
        }
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