describe('GitHub workflows', ()=>{

    // 'As a guest (not logged-in), when I search github for the term "create-react-app" from the landing page search input, I see:
    //   - A count of matching results
    //   - The facebook/create-create-app project as the first result
    // - As a guest, when I click the "About" button in the landing page footer I am taken to the GitHub "About" page

    it('should navigate to Github', ()=>{
        cy.visit('https://www.github.com');
        cy.url().then($url =>{
            expect($url).to.eql('https://github.com/');
        })
    });

    it('should show the search bar and click on it', ()=>{
        cy.get('[data-test-selector="nav-search-input"]').should('exist').click();
    });

    it('should search for "create-react-app"', ()=>{
        cy.get('[data-test-selector="nav-search-input"]').type('create-react-app{enter}');
    });

    it('should show a list of results', ()=>{
        cy.get('ul.repo-list').should('exist');
        cy.get('ul.repo-list').within(()=>{
            cy.get('li').its('length').should('be.gte', 2);
        });
    });

    it('should show "facebook/create-create-app" as the first result', ()=>{
        cy.get('ul.repo-list').within(()=>{
            cy.get('li').eq(0).within(()=>{
                cy.get('.text-normal').invoke('text').then($text =>{
                    expect($text).to.contain('facebook/create-react-app');
                });
            });
        });
    });

    it('should navigate back to the Github landing page and scroll to the bottom', ()=>{
        cy.visit('https://www.github.com');
        cy.url().then($url =>{
            expect($url).to.eql('https://github.com/');
        })
        cy.get('.footer').scrollIntoView();
    });

    it.skip('should click on the "About" section', ()=>{

    });


});