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

    async createRecipeFiles({file_id, recipe_id}) {
        
        try{
            
            const query = `
                INSERT INTO recipe_files(
                    file_id,
                    recipe_id)
                VALUES($1, $2)
                RETURNING id
            `

            const values = [
                file_id,
                recipe_id
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


            await this.deleteRecipeFiles(id)

            return db.query(`delete from files where id = $1`, [id])

        } catch (err) {
            console.error(err)
        }

    },

    async deleteRecipeFiles(id){

        try {

            return db.query(`delete from recipe_files rf where rf.file_id = $1`, [id])

        } catch (err) {
            console.error(err)
        }

    }
}