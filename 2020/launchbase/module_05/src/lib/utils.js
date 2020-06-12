module.exports = {
    age(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || (month == 0 && today.getDate() <= birthDate.getDate())) {
            age = age - 1
        }
        console.log(month)
        console.log(today.getDate()) 
        console.log(birthDate.getDate())
        console.log(age)
        return age

    },

    date(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`,
            day,
            month,
            year
        }
    },

    blood(text) {

        let blood = ""

        switch (text) {
            case "A0": blood = "A+"
                break;
            case "A1": blood = "A-"
                break;
            case "B0": blood = "B+"
                break;
            case "B1": blood = "B-"
                break;
            case "AB0": blood = "AB+"
                break;
            case "AB1": blood = "AB-"
                break;
            case "O0": blood = "O+"
                break;
            case "O1": blood = "O-"
                break;
            default: ""
                break;
        }
        return blood
    }
}