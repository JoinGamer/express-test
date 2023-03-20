function setSqlServiceConfig($_database) {
    return {
        port: 3000,
        db: {
            host: '120.78.199.26',
            port: 3306,
            user: 'root',
            password: 'Li@83374339',
            database: $_database
        }
    }
} 
module.exports = { setSqlServiceConfig };