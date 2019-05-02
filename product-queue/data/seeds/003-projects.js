exports.seed = function(knex) {
  return knex('projects').insert([
    {
      user_id: 1,
      name: 'Product Queue',
      description:
        'As a labs instructor I need some place to store a list of product ideas that will be built during lambda labs. ',
      status: 'Pending'
    },
    {
      user_id: 1,
      name: 'TrainingBot',
      description:
        'This is a “build-on” project. You will take the existing application at https://trainingbot.netlify.com and build on top of it new features. Training Bot sends learning content to new employees. Today the app sends messages directly to the new employee. You will be adding new delivery options, like sending to the manager instead of the employee, and adding a Microsoft Teams bot.',
      status: 'Pending'
    },
    {
      user_id: 1,
      name: 'Chores',
      description:
        'Shared living means shared expenses. ShopTrak keeps track of everyone’s contributions. Now, you’ll add more than just shop tracking, but full shared-living tracking. New features allow you to create a chore list and then keep track of who did what and who is assigned what.',
      status: 'Pending'
    },
    {
      user_id: 1,
      name: 'Mom Caller',
      description:
        'Quentin’s Mom always bugs him saying, “How come you never call me?” Well, he’s had enough. A couple of his friends have told him he should sign up for Mom Caller so that’s what he did. Now, his monthly Mom caller subscription calls both him AND his mom at random times every week — no way for him to forget.',
      status: 'Pending'
    }
  ])
}
