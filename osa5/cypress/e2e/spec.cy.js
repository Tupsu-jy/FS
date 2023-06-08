describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    // create here a user to backend
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'testpassword',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', () => {
    cy.get('#login-component').should('contain', 'Login Form');
  });

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#login-username').type('testuser');
      cy.get('#login-password').type('testpassword');
      cy.get('#login-form').submit();
      cy.contains('Test User logged in');
    });

    it('fails with wrong credentials', () => {
      cy.get('#login-username').type('testuser');
      cy.get('#login-password').type('wrongpassword');
      cy.get('#login-form').submit();

      cy.get('.notification.failure').should('be.visible');

      cy.get('.notification.failure').should('contain', 'Error logging in');
    });
  });

  describe('When logged in', () => {
    beforeEach(() => {
      cy.get('#login-username').type('testuser');
      cy.get('#login-password').type('testpassword');
      cy.get('#login-form').submit();
      // Creating a blog for each test in the 'When logged in' block
      cy.contains('new blog').click();
      cy.get('#new-blog-title').type('New Blog Title');
      cy.get('#new-blog-author').type('New Blog Author');
      cy.get('#new-blog-url').type('https://newblog.com');
      cy.get('#new-blog-form').submit();
    });

    it('A blog can be created', () => {
      cy.contains('New Blog Title'); // this will check if new blog is listed
    });

    it('A blog can be liked', () => {
      cy.contains('New Blog Title').parent().find('#details-button').click();
      cy.contains('New Blog Title').parent().find('#blog-likes').should('contain', '0');
      cy.contains('New Blog Title').parent().find('#like-button').click();
      cy.contains('New Blog Title').parent().find('#blog-likes').should('contain', '1');
    });

    it('A blog can be deleted', () => {
      cy.contains('New Blog Title').parent().find('#details-button').click();
      cy.contains('New Blog Title').parent().find('#delete-button').click();

      // confirm the blog is no longer visible
      cy.contains('New Blog Title').should('not.exist');
    });
  });

  describe('When multiple blogs exist', () => {
    beforeEach(() => {
      // Create second user
      const user2 = {
        name: 'Another User',
        username: 'anotheruser',
        password: 'anotherpassword',
      };
      cy.request('POST', 'http://localhost:3003/api/users/', user2);

      // Login first user and create two blogs
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'testuser', password: 'testpassword',
      }).then(({ body }) => {
        const token = `bearer ${body.token}`;
        cy.request({
          method: 'POST',
          url: 'http://localhost:3003/api/blogs',
          body: { title: 'Blog 1', author: 'Author 1', url: 'http://blog1.com' },
          headers: { Authorization: token },
        });
        cy.request({
          method: 'POST',
          url: 'http://localhost:3003/api/blogs',
          body: { title: 'Blog 2', author: 'Author 2', url: 'http://blog2.com' },
          headers: { Authorization: token },
        });
      });

      // Login second user and create a blog
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'anotheruser', password: 'anotherpassword',
      }).then(({ body }) => {
        const token = `bearer ${body.token}`;
        cy.request({
          method: 'POST',
          url: 'http://localhost:3003/api/blogs',
          body: { title: 'Blog 3', author: 'Author 3', url: 'http://blog3.com' },
          headers: { Authorization: token },
        });
      });

      cy.visit('http://localhost:3000');
    });

    it('Blogs are ordered by likes', () => {
      cy.get('#login-username').type('testuser');
      cy.get('#login-password').type('testpassword');
      cy.get('#login-form').submit();

      cy.get('.blog') // assuming each blog has a class 'blog'
        .then((blogs) => {
          const blogsInDom = Array.from(blogs).map((el) => Cypress.$(el).text());
          const blogsInDomSortedByLikes = blogsInDom.slice().sort((a, b) => b.likes - a.likes);
          expect(blogsInDom).to.deep.eq(blogsInDomSortedByLikes);
        });
    });

    it('Only creator can delete the blog', () => {
      cy.get('#login-username').type('testuser');
      cy.get('#login-password').type('testpassword');
      cy.get('#login-form').submit();

      // Check delete button on first user's blogs
      cy.contains('Blog 1').find('#details-button').click();
      cy.contains('Blog 1').parent().should('contain', 'delete');

      cy.contains('Blog 2').find('#details-button').click();
      cy.contains('Blog 2').parent().should('contain', 'delete');

      // Check absence of delete button on second user's blog
      cy.contains('Blog 3').find('#details-button').click();
      cy.contains('Blog 3').parent().should('not.contain', 'delete');
    });
  });
});
