const db = require('../../data/dbConfig.js');
const Links = require('../../models/links.js');
const Users = require('../../models/users.js');
const Projects = require('../../models/projects.js');

describe('links model', () => {
    beforeEach(async () => { 
        return await db.raw(
          'TRUNCATE "organizations", users, projects, comments RESTART IDENTITY CASCADE'
        );
    });

    describe('addLink & getLinksByProject', () => {
        it.skip('should insert and get a link', async () => {
            const [org] = await Users.newOrg({
                name: "get links test company"
            });
            
            const user = await Users.newUser({
                first_name: "Kevin",
                last_name: "Smith",
                org_id: org,
                email: "random@random.com",
                password: "password"
            });
            
            const project = await Projects.newProject({ 
                user_id: user.id,
                name: 'projects tester',
                description: 'this project is for a test',
                status: 'pending',
            });

            await Links.addLink({
                user_id: user.id,
                project_id: project.id,
                link_type: "GitHub Repo",
                link_href: 'https://github.com/build-415-productqueue/backend',
            })

            const links = await Links.getLinksByProject(project.id);
            expect(links.length).toBe(1);
        });     
    });

    describe('removeLink', () => {
        it.skip('should delete a link', async () => {
            const [org] = await Users.newOrg({
                name: "get links test company"
            });
            
            const user = await Users.newUser({
                first_name: "Kevin",
                last_name: "Smith",
                org_id: org,
                email: "random@random.com",
                password: "password"
            });
            
            const project = await Projects.newProject({ 
                user_id: user.id,
                name: 'projects tester',
                description: 'this project is for a test',
                status: 'pending',
            });

            const [link] = await Links.addLink({
                user_id: user.id,
                project_id: project.id,
                link_type: "GitHub Repo",
                link_href: 'https://github.com/build-415-productqueue/backend',
            })

            const removeLink = await Links.removeLink(link);
            expect(removeLink.length).toBeFalsy();

        });
    });
});