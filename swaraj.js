const gitHubForm = document.getElementById('SwarajForm');

gitHubForm.addEventListener('submit', (m) => 
{
	m.preventDefault(); 
    let input = document.getElementById('input');
    let username_repo = input.value;          
    request_repositories(username_repo);
})

function request_repositories(username)
{
    const xml_request = new XMLHttpRequest();
    const url = `https://api.github.com/users/${username}/repos?per_page=100`;
    xml_request.open('GET', url, true);
    xml_request.onload = function () 
	{
        const info = JSON.parse(this.response);
		for(let s in info)
		{
			let ul = document.getElementById('repositories');
			ul.innerHTML='';
		}
        for (let s in info) 
		{
            let ul = document.getElementById('repositories');
            let li = document.createElement('li');
            li.classList.add('list-group-item')
            li.innerHTML = (`
                <p><strong>Repo:</strong> ${info[s].name}</p>
                <p><strong>Description:</strong> ${info[s].description}</p>
                <p><strong>URL:</strong> <a href="${info[s].html_url}">${info[s].html_url}</a></p>
            `);
            ul.appendChild(li);       
        }
    }
    xml_request.send();
}