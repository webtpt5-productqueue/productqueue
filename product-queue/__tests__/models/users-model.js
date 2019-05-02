const db = require('../../data/dbConfig.js');
const Users = require('../../models/users.js');

describe('users model', () => {
    beforeEach(async () => { 
        return await db.raw(
          'TRUNCATE "organizations", users, projects, comments RESTART IDENTITY CASCADE'
        );
    });

    describe('newOrg', () => {
        it.skip('should add the new organization', async () => {
          await Users.newOrg({ name: 'Company' })
          const users = await db('organizations')
          expect(users).toHaveLength(1)
        })
    
        it.skip('should not add a new organization if it already exists', async () => {
          await Users.newOrg({ name: 'test org' })
          await Users.newOrg({ name: 'test org' })
          const users = await db('organizations')
          expect(users).toHaveLength(1)
        })
    
        it.skip('should return company id of existing', async () => {
          await Users.newOrg({ name: 'test org' });
          const [org] = await Users.newOrg({ name: 'test org' });
          expect(org).toBe(1)
        })
    
        it.skip('should return company id of new', async () => {
          const [org] = await Users.newOrg({ name: 'test org' })
          expect(org).toBe(1)
        })
    })

    describe('newUser', () => {
        it.skip('should insert a user', async () => {
            const [org] = await Users.newOrg({ name: "test org" });
            
            await Users.newUser({
                first_name: "Kevin",
                last_name: "Smith",
                org_id: org,
                email: "thisisanewemail@newemailforsure.com",
                password: "password"
            });

            const users = await db('users');
            expect(users).toHaveLength(1);
        });

        it.skip('should return user of new', async () => {
            const [org] = await Users.newOrg({ name: "test org" });
            
            const targetUser = await Users.newUser({
                first_name: "Kevin",
                last_name: "Smith",
                org_id: org,
                email: "thisisanewemail@newemailforsure.com",
                password: "password"
            });

            expect(targetUser.last_name).toBe('Smith');
        })
    });

    describe('getUser', () => {
        it.skip('should get a user by email', async () => {
          const [org] = await Users.newOrg({ name: "test org" });

          const targetUser = await Users.newUser({
                first_name: "Kevin",
                last_name: "Smith",
                org_id: org,
                email: "thisisanewemail@newemailforsure.com",
                password: "password"
          });

          const user = await Users.getUser(targetUser.email);
          expect(user.first_name).toBe('Kevin');
        });
    });

    describe('getUserById', () => {
        it.skip('should get a user by id', async () => {
          const [org] = await Users.newOrg({ name: "test org" });

          const targetUser = await Users.newUser({
                first_name: "Kevin",
                last_name: "Smith",
                org_id: org,
                email: "thisisanewemail@newemailforsure.com",
                password: "password"
          });
          console.log(targetUser)
          const user = await Users.getUserById(targetUser.id);
          expect(user.first_name).toBe('Kevin');
        });
    });
 
    describe('updateUser', () => {
        // ????????????????????????? this test doesn't work for some reason. it fails with the error: 'error: column "updated_at" of relation "users" does not exist'. Removing the updated_at line from the updateUser fcn in users models makes this test pass.
        it.skip('should update a user', async () => {

          const [org] = await Users.newOrg({ name: "test org" });
          
          const targetUser = await Users.newUser({
            first_name: "Kevin",
            last_name: "Smith",
            org_id: org,
            email: "thisisanewemail@newemailforsure.com",
            password: "password"
          });
          
          const userChanges = {
            first_name: "Matt",
            last_name: "Rothstein",
            updated_at: db.fn.now()
          };
          
          const updatedUser = await Users.updateUser(targetUser.id, userChanges);
          // console.log(updatedUser);
          expect (updatedUser.first_name).toBe('Matt');
        });
    })

    describe('getCompanyName', () => {
        it.skip('should get a company/organization by id', async () => {
          const [org] = await Users.newOrg({ name: "testy org" });
          const company = await Users.getCompanyName(org);

          expect(company.name).toBe('testy org')
        });
    });
  }); 