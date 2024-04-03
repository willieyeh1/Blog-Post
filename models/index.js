const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment')

Post.hasMany(Comment, {
    onDelete: "CASCADE"
})

Comment.belongsTo(Post)

Comment.belongsTo(User)

Post.belongsTo(User)

User.hasMany(Post)

User.hasMany(Comment)

User.belongsToMany(Post, {
    through: "UserLikes",
    as: "likes"
})

Post.belongsToMany(User, {
    through: "UserLikes",
    as: "likes"
})

User.belongsToMany(Post, {
    through: "UserSaves",
    as: "saves"
})

Post.belongsToMany(User, {
    through: "UserSaves",
    as: "saves"
})



module.exports = { User, Post, Comment};
