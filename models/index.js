const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment')
const Tag = require('./Tag')

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

Post.belongsToMany(Tag, {
    through: "posttag",
    as: "PostTags"
})

Tag.belongsToMany(Post, {
    through: "posttag",
    as: "PostTags"
})



module.exports = { User, Post, Comment, Tag };
