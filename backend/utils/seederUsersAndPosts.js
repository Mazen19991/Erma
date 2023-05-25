const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Tag = require('../models/tagsModel');
const Post = require('../models/postModel');
// read 2 images and upload to s3

module.exports = async () => {
  try {
    // print directory name
    await User.deleteMany();
    await Tag.deleteMany();
    await Post.deleteMany();
    
    const users = [
      {
        name: 'John Doe',
        Ownername: 'John Doe',
        email: 'john@gmail.com',
        username: 'john',
        password: '123456',
        avatar: 'man-2.jpeg',
        bio: 'I am a dog lover 1',
        posts: [
          {
            caption: 'Hello my fellow creature 1',
            image: 'dog1.jpeg',
            postedBy: '',
            likes: [],
            savedBy: [],
            comments: [],
            tags: [
              {
                name: 'Adoption',
                value: 'Adoption',
                isAvailable: true,
              },
            ],
          },
          {
            caption: 'Hello my fellow creature 2',
            image: 'dog2.jpeg',
            postedBy: '',
            likes: [],
            savedBy: [],
            comments: [],
            tags: [
              {
                name: 'Adoption',
                value: 'Adoption',
                isAvailable: true,
              },
              {
                name: 'Lost and Found',
                value: 'Lost and Found',
                isAvailable: true,
              },
            ],
          },
        ],
        followers: [],
        following: [],
        species: 'Dog',
      },
      {
        name: 'James Smith',
        Ownername: 'James Smith',
        email: 'james@gmail.com',
        username: 'james',
        password: '123456',
        avatar: 'man-3.jpeg',
        bio: 'I am a dog lover 2',
        posts: [
          {
            caption: 'Hello my fellow creature 3',
            image: 'dog4.jpeg',
            postedBy: '',
            likes: [],
            savedBy: [],
            comments: [],
            tags: [
              {
                name: 'Adoption',
                value: 'Adoption',
                isAvailable: true,
              },
            ],
          },
        ],
        followers: [],
        following: [],
        species: 'Dog',
      },
    ];
    console.log('seeding users and posts');
    // traverse over the users array and fetch all tags from each user's posts array and then get the unique tags depending on the name of the tag
    const tags = users
      .map((user) => user.posts.map((post) => post.tags))
      .flat(2);
    console.log('Finished Tags');
    const uniqueTags = [...new Set(tags.map((tag) => tag.name))].map((tag) => {
      return {
        name: tag,
        value: tag,
        isAvailable: true,
      };
    });
    //  step 1 insert unique tags into the database
    console.log('Inserting all tags');
    const allTags = await Tag.insertMany(uniqueTags);
    // step 2
    // insert all the users without their posts
    console.log('Finalizing users');
    const insertUsers = await Promise.all(
      users.map(async (user) => {
        const {
          name,
          Ownername,
          email,
          username,
          password,
          avatar,
          bio,
          species,
        } = user;
        return {
          name,
          Ownername,
          email,
          username,
          password: await bcrypt.hash(password, 10),
          avatar: `https://erma.s3.amazonaws.com/avatars/${avatar}`,
          bio,
          species,
          followers: [],
          following: [],
          posts: [],
        };
      })
    );
    console.log('Inserting all users');
    const allUsers = await User.insertMany(insertUsers);
    console.log('Finalizing posts');
    // step 3
    // insert all the posts and link them to the users by their _id and also link the tags to the posts by their _id
    console.log('Inserting all posts');
    const insertPosts = users.map((user) => {
      const { posts } = user;
      return posts.map((post) => {
        const { caption, image, tags } = post;
        return {
          caption,
          image: `https://erma.s3.amazonaws.com/posts/${image}`,
          postedBy: allUsers.find(
            (innerUser) => user.username === innerUser.username
          )._id,
          likes: [],
          savedBy: [],
          comments: [],
          tags: tags.map((tag) => {
            const { name } = tag;
            return allTags.find((tag) => tag.name === name)._id;
          }),
        };
      });
    });
    const allPosts = await Post.insertMany(insertPosts.flat(2));

    // step 4
    console.log('updating users');

    const updatePosts = allPosts.map((post) => {
      const { postedBy } = post;
      return {
        ...post,
        postedBy: allUsers.find(
          (user) => user._id.toString() === postedBy.toString()
        )._id,
      };
    });
    console.log('updating all users with their posts');
    // match from allPosts array and update the user with the posts
    const postsByUser = allPosts.reduce((acc, post) => {
      const { postedBy } = post;
      if (acc[postedBy]) {
        acc[postedBy].push(post._id);
      } else {
        acc[postedBy] = [post._id];
      }
      return acc;
    }, {});

    const usersWithPosts = Object.keys(postsByUser).map((userId) => {
      return {
        updateOne: {
          filter: { _id: userId },
          update: { posts: postsByUser[userId] },
        },
      };
    });
    User.bulkWrite(usersWithPosts);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
