// declaration of our custom element - <repos>
window.customElements.define('repos-custom', 
    class extends HTMLElement {
        constructor() {
            super();

            const userName = this.getAttribute('data-user');
            const dateAfter = new Date(`${this.getAttribute('data-update')}T00:00:00Z`);

            // div containing entire repo
            const repoDiv = document.createElement('div');
            // adding class to a repositorium div
            repoDiv.className = "repo";
            // appending a repo div to a custom <repos-custom> tag
            this.appendChild(repoDiv);

            // div containing a username
            const userDiv = document.createElement('div');
            // adding class to a username div
            userDiv.className = "repo__username";
            // appending a username div to a repo div
            repoDiv.appendChild(userDiv);
            // creating <p> tag
            const dataUserP = document.createElement('p');
            // annonymous method for fetching username that includes case of letters
            const fetchUserName = async () => {
                await fetch(`https://api.github.com/users/${userName}`).then(result => {
                    return result.json();
                }).then(result => {
                    // checking if account has a name. If not set a login as a name
                    let dataUserText;
                    if(result.name === null)
                        dataUserText = document.createTextNode(result.login);
                    else
                        dataUserText = document.createTextNode(result.name); 
                    // appending text to <p> tag
                    dataUserP.appendChild(dataUserText);
                    // appending <p> tag to <div> 
                    userDiv.appendChild(dataUserP);  
                })
            }
            fetchUserName();

            // printing available repos
            const fetchRepos = async () => {
                await fetch(`https://api.github.com/users/${userName}/repos`).then(result => {
                    return result.json();
                }).then(result => {
                    // div containing table with user's repos
                    const repoTableDiv = document.createElement('div');
                    // adding class to a table div
                    repoTableDiv.className = "repo__table";
                    // appending a table div to a repo div
                    repoDiv.appendChild(repoTableDiv);

                    result.map((element) => {
                        const updateDate = new Date(element.updated_at);

                        if(updateDate > dateAfter){
                            // creating table row
                            const tableRowName = document.createElement('div');
                            // adding class to a table row
                            tableRowName.className = "repo__table__row";
                            // appending a row to a table
                            repoTableDiv.appendChild(tableRowName);

                            // create text
                            const repoNameH5 = document.createElement('h5');
                            // h5 text
                            const repoNameText = document.createTextNode('Repositorium Name:');
                            // appending text to <h5> tag
                            repoNameH5.appendChild(repoNameText);
                            // appending <h5> tag to <div> 
                            tableRowName.appendChild(repoNameH5);

                            // create text
                            const repoNameFetchH5 = document.createElement('h5');
                            // h5 text
                            const repoNameFetchText = document.createTextNode(element.name);
                            // appending text to <h5> tag
                            repoNameFetchH5.appendChild(repoNameFetchText);
                            // appending <h5> tag to <div> 
                            tableRowName.appendChild(repoNameFetchH5);

                            // creating table row
                            const tableRowRepoDesc = document.createElement('div');
                            // adding class to a table row
                            tableRowRepoDesc.className = "repo__table__row"
                            // appending a row to a table
                            repoTableDiv.appendChild(tableRowRepoDesc);

                            // create text
                            const repoDescH5 = document.createElement('h5');
                            // h5 text
                            const repoDescText = document.createTextNode('Repositorium Description:');
                            // appending text to <h5> tag
                            repoDescH5.appendChild(repoDescText);
                            // appending <h5> tag to <div> 
                            tableRowRepoDesc.appendChild(repoDescH5);

                            // create text
                            const repoDescFetchH5 = document.createElement('h5');
                            // h5 text
                            const repoDescFetchText = document.createTextNode(element.description);
                            // appending text to <h5> tag
                            repoDescFetchH5.appendChild(repoDescFetchText);
                            // appending <h5> tag to <div> 
                            tableRowRepoDesc.appendChild(repoDescFetchH5);

                            // creating table row
                            const tableRowLastUpdate = document.createElement('div');
                            // adding class to a table row
                            tableRowLastUpdate.className = "repo__table__row"
                            // appending a row to a table
                            repoTableDiv.appendChild(tableRowLastUpdate);

                            // create text
                            const repoLastUpdateH5 = document.createElement('h5');
                            // h5 text
                            const repoLastUpdateText = document.createTextNode('Last Update:');
                            // appending text to <h5> tag
                            repoLastUpdateH5.appendChild(repoLastUpdateText);
                            // appending <h5> tag to <div> 
                            tableRowLastUpdate.appendChild(repoLastUpdateH5);

                            // create text
                            const repoLastUpdateFetchH5 = document.createElement('h5');
                            // h5 text
                            const repoLastUpdateFetchText = document.createTextNode(element.updated_at);
                            // appending text to <h5> tag
                            repoLastUpdateFetchH5.appendChild(repoLastUpdateFetchText);
                            // appending <h5> tag to <div> 
                            tableRowLastUpdate.appendChild(repoLastUpdateFetchH5);

                            // creating table row
                            const tableRowLink = document.createElement('div');
                            // adding class to a table row
                            tableRowLink.className = "repo__table__row"
                            // appending a row to a table
                            repoTableDiv.appendChild(tableRowLink);

                            // create text
                            const repoLinkH5 = document.createElement('h5');
                            // h5 text
                            const repoLinkText = document.createTextNode('Link:');
                            // appending text to <h5> tag
                            repoLinkH5.appendChild(repoLinkText);
                            // appending <h5> tag to <div> 
                            tableRowLink.appendChild(repoLinkH5);

                            // create text
                            const repoLinkFetcha = document.createElement('a');
                            // append href attribute to 'a'
                            repoLinkFetcha.setAttribute('href', element.html_url);
                            // a text
                            const repoLinkFetchText = document.createTextNode(element.html_url);
                            // appending text to <a> tag
                            repoLinkFetcha.appendChild(repoLinkFetchText);
                            // appending <a> tag to <div> 
                            tableRowLink.appendChild(repoLinkFetcha);
                        }
                    });
                })
            }
            fetchRepos();


        }
    }
);