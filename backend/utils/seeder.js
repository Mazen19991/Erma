const Tags = require('../models/tagsModel');
module.exports = async () => {
  try {
    const availableTags = [
      {
        name: 'Lost and Found',
        value: 'Lost and Found',
        isAvailable: true,
      },
      {
        name: 'Adoption',
        value: 'Adoption',
        isAvailable: true,
      },
    ];
    const fetchAvailableTags = await Tags.find({
      name: {
        $in: availableTags.map((element) => element.name),
      },
    });
    if (fetchAvailableTags.length === 0) {
      await Tags.insertMany(availableTags);
      console.log('Data seeded successfully');
      return;
    }
    const missingTags = availableTags.filter(
      (tag) => !fetchAvailableTags.some((tag2) => tag.name === tag2.name)
    );
    if (missingTags.length > 0) {
      await Tags.insertMany(missingTags);
      console.log('Data seeded successfully');
      return;
    }
  } catch (error) {
    console.log('An error occured while trying to seed data');
    console.log(`Error:${error.message}`);
    throw error;
  }
};
