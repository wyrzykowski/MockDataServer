const db = [
    {
        endpoint: 'GET/info',
        options: {
            findBy: 'id',
            findByParam: ':id'
        },
        data: {
            "example" : "hello"
        }
    },
    {
        endpoint: 'POST/info',
        data: {
            "example" : "helloPost"
        }
    },
    {
        endpoint: 'POST/example',
        data: {
            "example" : "example"
        }
    }
]

export default db;
