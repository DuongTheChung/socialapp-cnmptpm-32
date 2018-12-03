import ava1 from './assets/images/ava1.png';
import ava2 from './assets/images/ava2.jpg';
import ava3 from './assets/images/ava3.jpg';

const Users=[
    {
        id:1,
        name:'Chung',
        email:'chung@gmail.com',
        photo:ava1
    },
    {
        id:2,
        name:'Hung',
        email:'hung@gmail.com',
        photo:ava2,
    },
    {
        id:3,
        name:'Maria',
        email:'maria@gmail.com',
        photo:ava3,
    }

]

const now =new Date();
const Posts=[
    {
        text:'This is data test',
        photo:'home',
        likes:[
            {
                userId:1
            },
            {
                userId:2
            },
        ],
        comments:[
            {
                text:'Hi!',
                created:now,
                postedId:{
                    id:1,
                    name:'Chung',
                    email:'chung@gmail.com',
                    photo:ava1
                }
            },
            {
                text:'My nam is Jacson!',
                created:now,
                postedId:{
                    id:3,
                    name:'Maria',
                    email:'maria@gmail.com',
                    photo:ava3
                }
            }
        ],
        postedBy:{
            id:2,
            name:'Hung',
            email:'hung@gmail.com',
            photo:ava2,
        },
        created:now
    }
    
]

export {
    Users,
    Posts,
}
