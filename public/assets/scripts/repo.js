import { githubAPI } from "../../services/githubAPI.js";
const gitHubAPI = new githubAPI();
const urlParams = new URLSearchParams(window.location.search);
const repoId = urlParams.get('id');

if (repoId) {
    carregarRepositorio(repoId);
} else {
    console.error('ID do repositório não especificado na URL.');
}

async function carregarRepositorio(repoId) {
    const repo = await gitHubAPI.getRepoDetails(repoId);
    document.getElementById('repo-name').textContent = repo.name;
    document.getElementById('repo-description').textContent = repo.description;
    document.getElementById('repo-created-at').textContent = new Date(repo.created_at).toLocaleDateString('pt-BR');
    document.getElementById('repo-stars').textContent = repo.stargazers_count;
    document.getElementById('repo-watchers').textContent = repo.watchers_count;
    document.getElementById('repo-forks').textContent = repo.forks;
    document.getElementById('repo-language').textContent = repo.language;
    document.getElementById('repo-url').innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.html_url}</a>`;
    document.getElementById('repo-license').textContent = repo.license ? repo.license.name : 'Não especificada';

    const topicsContainer = document.getElementById('repo-topics');
    repo.topics.forEach(topic => {
        topicsContainer.innerHTML += `<span class="text-white fs-5 me-4 bg-dark bg-gradient rounded-pill">${topic}</span>`;
    });

    document.getElementById('owner-avatar').src = repo.owner.avatar_url;
    document.getElementById('owner-login').textContent = repo.owner.login;
}