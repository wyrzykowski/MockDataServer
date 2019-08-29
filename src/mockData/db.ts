const db = [
    {
        endpoint: 'GET/info/:id',
        options: {
            findBy: 'id',
            findByParam: ':id'
        },
        data: {
            items: [
                 {
                    id: 12,
                    message: 'example of id 12'
                },
                {
                    id: 14,
                    message: 'example of id 14'
                },
                {
                    id: 16,
                    message: 'example of id 16'
                }
            ]
        }
    },
    {
        endpoint: 'GET/info',
        data: {
            items: [
                 {
                    id: 12,
                    message: 'example of id 12'
                },
                {
                    id: 14,
                    message: 'example of id 14'
                },
                {
                    id: 16,
                    message: 'example of id 16'
                }
            ]
        }
    },
    {
        endpoint: 'POST/info2',
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
