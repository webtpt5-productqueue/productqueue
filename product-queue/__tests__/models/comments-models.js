const db = require('../../data/dbConfig.js');
const Comments = require('../../models/comments.js');
const Users = require('../../models/users.js');
const Projects = require('../../models/projects.js');

describe('comments model', () => {
    beforeEach(async () => { 
        return await db.raw(
          'TRUNCATE "organizations", users, projects, comments RESTART IDENTITY CASCADE'
        );
    });

    describe('addComment & getCommentsByProject', () => {
        it.skip('should add and get a comment', async () => {
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

            await Comments.addComment({
                user_id: user.id,
                project_id: project.id,
                comment: 'test comment'
            })

            const comments = await Comments.getCommentsByProject(project.id);
            expect(comments.length).toBe(1);

        });
    });

    describe('removeComment', () => {
        it.skip('should delete a comment', async () => {
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

            const comment = await Comments.addComment({
                user_id: user.id,
                project_id: project.id,
                comment: 'test comment'
            }) 

            const removeComment = await Comments.removeComment(comment.id);
            expect(removeComment.length).toBeFalsy();
        });
    });
});