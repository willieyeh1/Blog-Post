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
    through: "likes",
    as: "UsersLikes"
})

Post.belongsToMany(User, {
    through: "likes",
    as: "UsersLikes"
})

User.belongsToMany(Post, {
    through: "saves",
    as: "UsersSaves"
})

Post.belongsToMany(User, {
    through: "saves",
    as: "UsersSaves"
})



module.exports = { User, Post, Comment};
