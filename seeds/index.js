require("dotenv").config();
const sequelize = require("../config/connection");
const {User, Post , Comment} = require("../models");

const userSeeds = [
  {
    username: "Eric",
    email: "e@gmail.com",
    password: "password"
  },
  {
    username: "Willie",
    email: "w@gmail.com",
    password: "password"
  },
  {
    username: "Kyle",
    email: "k@gmail.com",
    password: "password"
  },
  {
    username: "Jordan",
    email: "j@gmail.com",
    password: "password"
  },
];

const postSeeds = [
  {
    content: "Dogs can't operate MRI machines.",
    punchline: "But catscan.",
    userId: 1
  },
  {
    content: "I wondered why the frisbee kept getting bigger and bigger. Then it hit me.",
    userId: 2
  },
  {
    content: "Why did the coach go to the bank? To get his quarterback.",
    userId: 3
  },
  {
    content: "Singing in the shower is fun until you get soap in your mouth. Then it's a soap opera.",
    userId: 4
  },
  {
    content: "Where do fruits go on vacation? Pear-is.",
    userId: 3
  },
  {
    content: "Every time I take my dog to the park, the ducks try to bite him. That's what I get for buying a pure bread dog.",
    userId: 2
  },
  {
    content: "Why did the gym close down? It just didn't work out.",
    userId: 1
  },
  
];

const commentSeeds = [
  {
    content: "LOLOLOL That's hilarious",
    userId: 2,
    postId: 1,
  },
  {
    content: "HAHAHAHAH That's a good one.",
    userId: 3,
    postId: 1,
  },
  {
    content: "Funny!",
    userId: 4,
    postId: 2,
  },
  {
    content: "Funnnnny!",
    userId: 1,
    postId: 4,
  },
  {
    content: "Hilarious!",
    userId: 1,
    postId: 3,
  },
  {
    content: "Meanest joke ever!",
    userId: 1,
    postId: 2,
  },
  {
    content: "This is not funny",
    userId: 3,
    postId: 5,
  },
  {
    content: "This offends me!",
    userId: 2,
    postId: 6,
  },
  {
    content: "Meow Meow",
    userId: 3,
    postId: 7,
  },
 
];


//with promises
//   sequelize.sync({force:true}).then(()=>{
//     Tank.bulkCreate(tankSeeds).then(tankData=>{
//         console.log(tankData)
//         console.log('==============================')
//         Animal.bulkCreate(animalSeeds).then(aniData=>{
//             console.log(aniData)
//             process.exit(0);
//         }).catch(err=>{
//             console.log(err);
//         })
//     }).catch(err=>{
//         console.log(err);
//     })
//   }).catch(err=>{
//     console.log(err)
//   })

//with async/await
const seedMe = async () => {
  try {
    await sequelize.sync({ force: true });
    const userData = await User.bulkCreate(userSeeds,{
      individualHooks:true
    });
    const postData = await Post.bulkCreate(postSeeds);
    const commentData = await Comment.bulkCreate(commentSeeds);
    console.table(userData.map((ud) => ud.toJSON()));
    console.table(postData.map((pd) => pd.toJSON()));
    console.table(commentData.map((cd) => cd.toJSON()));
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(0);
  }
};

seedMe();
