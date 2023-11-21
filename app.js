document.addEventListener('DOMContentLoaded', function () {
    // funcionalidade adicional: carregar o perfil inicial sem a necessidade de buscar
    getProfile('joseolinda');

    const btnBuscar = document.querySelector('#buscar-github');
    btnBuscar.addEventListener('click', function() {
    // carregando busca de profile
        getProfile(document.querySelector('#usuario-github').value);
    });

    function getProfile(usuario) {
    // resetando informacoes
        document.querySelector('#avatar').innerHTML = '';

        fetch(`https://api.github.com/users/${usuario}`)
            .then(response => response.json())
            .then(userGit => {
                const { avatar_url, login, followers, public_repos, public_gists } = userGit;

                const avatar = document.createElement('img');
                avatar.src = avatar_url;

                const li = document.createElement('li');
                li.appendChild(avatar);

                document.querySelector('.github-card h1').innerText = login;
                document.querySelector('.status li:nth-child(1) a').href = `https://github.com/${login}?tab=repositories`;
                document.querySelector('.status li:nth-child(1) strong').innerText = `${public_repos} Repositórios`;
                document.querySelector('.status li:nth-child(2) a').href = `https://gist.github.com/${login}`;
                document.querySelector('.status li:nth-child(2) strong').innerText = `${public_gists} Gists`;
                document.querySelector('.status li:nth-child(3) a').href = `https://github.com/${login}/followers`;
                document.querySelector('.status li:nth-child(3) strong').innerText = `${followers} Seguidores`;
                //obtendo infrmacoes necessarias
                document.querySelector('#avatar').appendChild(li);
            })
            .catch(error => {
                console.error('Erro', error);
                alert('Erro');
            });
    }
});
