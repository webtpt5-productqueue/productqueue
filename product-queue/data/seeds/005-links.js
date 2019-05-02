exports.seed = function(knex) {
  return knex('links').insert([
    {
      user_id: 1,
      project_id: 1,
      link_type: 'GitHub Repo',
      link_href: 'https://github.com/build-415-productqueue/backend'
    },
    {
      user_id: 1,
      project_id: 1,
      link_type: 'Figma',
      link_href:
        'https://www.figma.com/file/Zhfyx72UtRCxSKTw43YvAWFS/Untitled?node-id=0%3A1'
    },
    {
      user_id: 1,
      project_id: 1,
      link_type: 'Deployed App',
      link_href: 'https://productqueue.netlify.com/'
    }
  ])
}
