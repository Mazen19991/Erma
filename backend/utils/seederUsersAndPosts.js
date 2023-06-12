const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Tag = require('../models/tagsModel');
const Post = require('../models/postModel');

module.exports = async () => {
  try {
    // print directory name
    await User.deleteMany();
    await Tag.deleteMany();
    await Post.deleteMany();

    const names2 = [
      'Mohammad Oliver',
      'Ruby Noland',
      'Jadyn Suarez',
      'Debra Deutsch',
      'Blanca Palmer',
      'Fletcher Villalobos',
      'Isidro Roth',
      'Brodie Koch',
      'Charles Tyree',
      'Stefanie Kwon',
      'India Enriquez',
      'Mariela Switzer',
      'Kenton Noll',
      'Dion Faber',
      'Landon McCloud',
      'Bailey Beckett',
      'Tara Breen',
      'Taniya Meade',
      'Wyatt Choate',
      'Eboni Castellano',
      'Kaili Clark',
      'Braden Holguin',
      'Ayden Minter',
      'Francesca McCauley',
      'Moriah Crump',
    ];
    const names1 = [
      'Admin',
      'Everett Spears',
      'Nathan Amaral',
      'Chester Flowers',
      'Mackenzi Marx',
      'Carl Priest',
      'Naomi Stubbs',
      'Rubi Roland',
      'Citlalli Adams',
      'Arden Sowell',
      'Margo Batista',
      'Karyme Hamrick',
      'Matthew Cornwell',
      'Simran Padgett',
      'Annaliese Jarrett',
      'Emerson Valdez',
      'Sage Crowell',
      'Serenity Willard',
      'Gunnar Street',
      'Armand Vinson',
      'Adriel Leon',
      'Meaghan Brand',
      'Ervin Benavides',
      'Tre Hanna',
      'Johnpaul Yarbrough',
    ];

    const usernames1 = [
      'admin',
      'everettspears1',
      'nathanamaral2',
      'chesterflowers3',
      'mackenzimarx4',
      'carlpriest5',
      'naomistubbs6',
      'rubiroland7',
      'citlalliadams8',
      'ardensowell9',
      'margobatista10',
      'karymehamrick11',
      'matthewcornwell12',
      'simranpadgett13',
      'annaliesejarrett14',
      'emersonvaldez15',
      'sagecrowell16',
      'serenitywillard17',
      'gunnarstreet18',
      'armandvinson19',
      'adrielleon20',
      'meaghanbrand21',
      'ervinbenavides22',
      'trehanna23',
      'johnpaulyarbrough24',
    ];
    const usernames2 = [
      'mohammadoliver25',
      'rubynoland26',
      'jadynsuarez27',
      'debradeutsch28',
      'blancapalmer29',
      'fletchervillalobos30',
      'isidroroth31',
      'brodiekoch32',
      'charlestyree33',
      'stefaniekwon34',
      'indiaenriquez35',
      'marielaswitzer36',
      'kentonnoll37',
      'dionfaber38',
      'landonmccloud39',
      'baileybeckett40',
      'tarabreen41',
      'taniyameade42',
      'wyattchoate43',
      'ebonicastellano44',
      'kailiclark45',
      'bradenholguin46',
      'aydenminter47',
      'francescamccauley48',
      'moriahcrump49',
    ];
    const cats1 = [
      'cat1',
      'cat2',
      'cat3',
      'cat4',
      'cat5',
      'cat6',
      'cat7',
      'cat8',
      'cat9',
      'cat10',
      'cat11',
      'cat12',
      'cat13',
      'cat14',
      'cat15',
      'cat16',
      'cat17',
      'cat18',
      'cat19',
      'cat20',
      'cat21',
      'cat22',
      'cat23',
      'cat24',
      'cat25',
    ];
    const cats2 = [
      'cat26',
      'cat27',
      'cat28',
      'cat29',
      'cat30',
      'cat31',
      'cat32',
      'cat33',
      'cat34',
      'cat35',
      'cat36',
      'cat37',
      'cat38',
      'cat39',
      'cat40',
      'cat41',
      'cat42',
      'cat43',
      'cat44',
      'cat45',
      'cat46',
      'cat47',
      'cat48',
      'cat49',
      'cat50',
    ];
    const cats3 = [
      'cat51',
      'cat52',
      'cat53',
      'cat54',
      'cat55',
      'cat56',
      'cat57',
      'cat58',
      'cat59',
      'cat60',
      'cat61',
      'cat62',
      'cat63',
      'cat64',
      'cat65',
      'cat66',
      'cat67',
      'cat68',
      'cat69',
      'cat70',
      'cat71',
      'cat72',
      'cat73',
      'cat74',
      'cat75',
    ];
    const cats4 = [
      'cat76',
      'cat77',
      'cat78',
      'cat79',
      'cat80',
      'cat81',
      'cat82',
      'cat83',
      'cat84',
      'cat85',
      'cat86',
      'cat87',
      'cat88',
      'cat89',
      'cat90',
      'cat91',
      'cat92',
      'cat93',
      'cat94',
      'cat95',
      'cat96',
      'cat97',
      'cat98',
      'cat99',
      'cat100',
    ];

    const dogs1 = [
      'dog1',
      'dog2',
      'dog3',
      'dog4',
      'dog5',
      'dog6',
      'dog7',
      'dog8',
      'dog9',
      'dog10',
      'dog11',
      'dog12',
      'dog13',
      'dog14',
      'dog15',
      'dog16',
      'dog17',
      'dog18',
      'dog19',
      'dog20',
      'dog21',
      'dog22',
      'dog23',
      'dog24',
      'dog25',
    ];
    const dogs2 = [
      'dog26',
      'dog27',
      'dog28',
      'dog29',
      'dog30',
      'dog31',
      'dog32',
      'dog33',
      'dog34',
      'dog35',
      'dog36',
      'dog37',
      'dog38',
      'dog39',
      'dog40',
      'dog41',
      'dog42',
      'dog43',
      'dog44',
      'dog45',
      'dog46',
      'dog47',
      'dog48',
      'dog49',
      'dog50',
    ];
    const dogs3 = [
      'dog51',
      'dog52',
      'dog53',
      'dog54',
      'dog55',
      'dog56',
      'dog57',
      'dog58',
      'dog59',
      'dog60',
      'dog61',
      'dog62',
      'dog63',
      'dog64',
      'dog65',
      'dog66',
      'dog67',
      'dog68',
      'dog69',
      'dog70',
      'dog71',
      'dog72',
      'dog73',
      'dog74',
      'dog75',
    ];
    const dogs4 = [
      'dog76',
      'dog77',
      'dog78',
      'dog79',
      'dog80',
      'dog81',
      'dog82',
      'dog83',
      'dog84',
      'dog85',
      'dog86',
      'dog87',
      'dog88',
      'dog89',
      'dog90',
      'dog91',
      'dog92',
      'dog93',
      'dog94',
      'dog95',
      'dog96',
      'dog97',
      'dog98',
      'dog99',
      'dog100',
    ];

    const avatars1 = [
      'avatar1',
      'avatar2',
      'avatar3',
      'avatar4',
      'avatar5',
      'avatar6',
      'avatar7',
      'avatar8',
      'avatar9',
      'avatar10',
      'avatar11',
      'avatar12',
      'avatar13',
      'avatar14',
      'avatar15',
      'avatar16',
      'avatar17',
      'avatar18',
      'avatar19',
      'avatar20',
      'avatar21',
      'avatar22',
      'avatar23',
      'avatar24',
      'avatar25',
    ];
    const avatars2 = [
      'avatar26',
      'avatar27',
      'avatar28',
      'avatar29',
      'avatar30',
      'avatar31',
      'avatar32',
      'avatar33',
      'avatar34',
      'avatar35',
      'avatar36',
      'avatar37',
      'avatar38',
      'avatar39',
      'avatar40',
      'avatar41',
      'avatar42',
      'avatar43',
      'avatar44',
      'avatar45',
      'avatar46',
      'avatar47',
      'avatar48',
      'avatar49',
      'avatar50',
    ];
    const tags = [
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
    ];

    const users = [];
    for (let i = 0; i < 25; i++) {
      const dogUser = {
        name: names1[i],
        Ownername: names1[i],
        email: names1[i].toLowerCase().split(' ')[0] + '@gmail.com',
        username: usernames1[i],
        password: '123456',
        avatar: avatars1[i] + '.jpeg',
        bio: `I am a dog lover ${i + 1}`,
        posts: [
          {
            caption: 'Hello my fellow creature 1',
            image: dogs1[i] + '.jpeg',
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
            caption: 'Hello my fellow creature 1',
            image: dogs2[i] + '.jpeg',
            postedBy: '',
            likes: [],
            savedBy: [],
            comments: [],
            tags: [
              {
                name: 'Lost and Found',
                value: 'Lost and Found',
                isAvailable: true,
              },
            ],
          },
          {
            caption: 'Hello my fellow creature 1',
            image: dogs3[i] + '.jpeg',
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
          {
            caption: 'Hello my fellow creature 1',
            image: dogs4[i] + '.jpeg',
            postedBy: '',
            likes: [],
            savedBy: [],
            comments: [],
            tags: [],
          },
        ],
        followers: [],
        following: [],
        species: 'Dog',
      };
      const catUser = {
        name: names2[i],
        Ownername: names2[i],
        email: names2[i].toLowerCase().split(' ')[0] + '@gmail.com',
        username: usernames2[i],
        password: '123456',
        avatar: avatars2[i] + '.jpeg',
        bio: `I am a cat lover ${i + 1}`,
        posts: [
          {
            caption: `Hello my fellow creature ${i + 1}`,
            image: cats1[i] + '.jpeg',
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
          {
            caption: `Hello my fellow creature ${i + 1}`,
            image: cats2[i] + '.jpeg',
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
            caption: `Hello my fellow creature ${i + 1}`,
            image: cats3[i] + '.jpeg',
            postedBy: '',
            likes: [],
            savedBy: [],
            comments: [],
            tags: [
              {
                name: 'Lost and Found',
                value: 'Lost and Found',
                isAvailable: true,
              },
            ],
          },
          {
            caption: `Hello my fellow creature ${i + 1}`,
            image: cats4[i] + '.jpeg',
            postedBy: '',
            likes: [],
            savedBy: [],
            comments: [],
            tags: [],
          },
        ],
        followers: [],
        following: [],
        species: 'Cat',
      };
      users.push(dogUser, catUser);
    }

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
