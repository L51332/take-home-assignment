describe('GitHub workflows', ()=>{

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

    it('should show a count of the results', ()=>{
        cy.get('div.codesearch-results').within(()=>{
            cy.get('h3').contains('repository results').should('exist');
        });
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

    it('should click on the "About" section and land on the about page', ()=>{
        cy.get('footer').within(()=>{
            cy.get('a').contains('About').click();
            cy.location('pathname', {timeout: 5000}).should('include', '/about');
        });
    });


});