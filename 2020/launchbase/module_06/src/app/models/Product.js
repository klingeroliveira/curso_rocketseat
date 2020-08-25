const db = require('../../config/db')
const { date } = require('../../lib/utils')
const { DateTimeFormat } = require('intl')

module.exports = {
    create(data){

        const query = `
            INSERT INTO products(
                category_id,
                user_id,
                name,
                description,
                old_price,
                price,
                quantity,
                status
                )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `
        
        const values = [
            data.category_id,
            data.user_id || 1,
            data.name,
            data.description,
            data.old_price || data.price,
            data.price,
            data.quantity,
            data.status
        ]

        return db.query(query, values)

    },

    find(id){
        
        return db.query(`
            SELECT * FROM products where id = $1
        `,[id])

    },
    
    update(data){
        const query = `
            update products set
                category_id = ($2),
                user_id = ($3),
                name = ($4),
                description = ($5),
                old_price = ($6),
                price = ($7),
                quantity = ($8),
                status = ($9),
                updated_at = ($10)
            where id = ($1)
        `

        const values = [
            data.id,
            data.category_id,
            data.user_id,
            data.name,
            data.description,
            data.old_price,
            data.price,
            data.quantity,
            data.status,
            date(Date.now()).iso
        ]

        return db.query(query,values)
    },

    delete(id){
        
        return db.query(`
            Delete FROM products where id = $1
        `,[id])

    }
}