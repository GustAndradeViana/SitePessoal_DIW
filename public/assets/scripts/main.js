import { githubAPI } from "../../services/githubAPI.js";
import { Database } from "../../services/database.js";

const databaseService = new Database();
const gitHubAPI = new githubAPI();

async function carregarRepositorios(username) {
    const listaRepositorios = await gitHubAPI.getRepos(username);
    const reposContainer = document.getElementById('repositorios-list');
    reposContainer.innerHTML = '';

    if (Array.isArray(listaRepositorios)) {
        listaRepositorios.forEach(repo => {
            const repoCard = `
                    <div class="card col-2 mx-1 bg-dark bg-gradient" style="width: 18rem;">
                        <div class="card-body bg-dark bg-gradient">
                            <h5 class="card-title fw-bold text-white">${repo.name}</h5>
                            <p class="card-text text-white">${repo.description || 'Sem descrição'}</p>
                            <div style="display: flex;">
                                <i class="fa-solid fa-user text-white my-2 fs-2 mx-2" style="display: block;"></i>
                                <text class="text-white fs-2 mx-1">${repo.watchers_count}</text>
                                <i class="fa-solid fa-star text-white my-2 fs-2 mx-2"></i>
                                <text class="text-white fs-2 mx1">${repo.stargazers_count}</text>
                            </div>
                            <a href="repo.html?id=${repo.id}" class="btn btn-light my-4" style="display: block;">Informações</a>
                        </div>
                    </div>
                `;
            reposContainer.innerHTML += repoCard;
        });
    }
}

async function carregarConteudo() {
    const conteudoSugerido = await databaseService.getConteudoSugerido();
    const carouselIndicators = document.querySelector(".carousel-indicators");
    const carouselInner = document.querySelector(".carousel-inner");

    conteudoSugerido.forEach((item, index) => {
        const indicatorButton = document.createElement("button");
        indicatorButton.setAttribute("type", "button");
        indicatorButton.setAttribute("data-bs-target", "#carouselExampleIndicators");
        indicatorButton.setAttribute("data-bs-slide-to", index.toString());
        if (index === 0) {
            indicatorButton.classList.add("active");
            indicatorButton.setAttribute("aria-current", "true");
        }
        indicatorButton.setAttribute("aria-label", `Slide ${index + 1}`);
        carouselIndicators.appendChild(indicatorButton);

        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if (index === 0) {
            carouselItem.classList.add("active");
        }

        const img = document.createElement("img");
        img.classList.add("d-block", "w-100");
        img.setAttribute("src", item.urlImagem);
        img.setAttribute("alt", "...");
        img.setAttribute("style", "max-height: 500px;");
        carouselItem.appendChild(img);

        const itemCaption = document.createElement("div");
        itemCaption.classList.add("carousel-caption", "d-none", "d-md-block", "text-white", "bg-dark", "rounded");
        const title = document.createElement("h5");
        title.textContent = item.titulo;
        itemCaption.appendChild(title);
        const description = document.createElement("p");
        description.textContent = item.descricao;
        itemCaption.appendChild(description);

        const link = document.createElement("a");
        link.setAttribute("href", item.urlConteudo);
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
        link.appendChild(itemCaption);
        carouselItem.appendChild(link);

        carouselInner.appendChild(carouselItem);
    });
}

async function fillLinks(linksData) {
    linksData.forEach(link => {
        let socialLink;
        const divPy3 = document.querySelector('#sociais');
        
        if (link.nome.toLowerCase() === 'github') {
            socialLink = '<a href="https://github.com/GustAndradeViana" target="_blank"> <i class="fab fa-github text-white my-2 fs-2 mx-2"></i> </a>';
        } else if (link.nome.toLowerCase() === 'instagram') {
            socialLink = '<a href="https://www.instagram.com/gustavoo_aandrade/" target="_blank"> <i class="fab fa-square-instagram text-white my-2 fs-2 mx-2"></i> </a>';
        } else if (link.nome.toLowerCase() === 'linkedin') {
            socialLink = '<a href="https://www.linkedin.com/in/gustavo-andrade-viana-b0a36827b/" target="_blank"> <i class="fab fa-linkedin text-white my-2 fs-2 mx-2"></i> </a>';
        }

        if (socialLink) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = socialLink;
            divPy3.appendChild(tempDiv.firstChild);
        }
    });
}


async function carregarPerfil(username) {
    const links = await databaseService.getLinks();
    const dadosPerfil = await gitHubAPI.getPerfil(username);
    const profileContainer = document.getElementById('perfil');

    if (dadosPerfil) {
        const profileNameElement = profileContainer.querySelector('#profile-name');
        profileNameElement.textContent = dadosPerfil.name || username;

        const profileImgElement = profileContainer.querySelector('#profile-img');
        profileImgElement.src = dadosPerfil.avatar_url;

        const profileDescriptionElement = profileContainer.querySelector('#profile-description');
        profileDescriptionElement.textContent = dadosPerfil.bio || 'Sem descrição disponível';

        const profileLocationElement = profileContainer.querySelector('#profile-location');
        profileLocationElement.textContent = `Localização: ${dadosPerfil.location || 'Não informada'}`;

        fillLinks(links);
    }
}

async function carregarColegas() {
    const colegas = await databaseService.getColegasDeTrabalho();
    const colegasList = document.getElementById('colegas-list');

    colegas.forEach(colega => {
        const colDiv = document.createElement('div');
        colDiv.classList.add('col', 'mb-4');

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'border-0', 'shadow');

        const link = document.createElement('a');
        link.setAttribute('href', colega.urlGitHub);
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        link.classList.add('text-decoration-none');

        const overflowDiv = document.createElement('div');
        overflowDiv.classList.add('overflow-hidden', 'rounded-circle', 'border', 'border-dark');
        overflowDiv.style.maxHeight = '200px';
        overflowDiv.style.maxWidth = '200px';

        const img = document.createElement('img');
        img.classList.add('card-img-top', 'img-fluid', 'rounded-circle');
        img.setAttribute('src', colega.urlFoto);
        img.setAttribute('alt', `Foto de ${colega.nome}`);

        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.classList.add('card-body', 'text-center', 'py-2', 'bg-dark');

        const cardText = document.createElement('p');
        cardText.classList.add('card-text', 'fs-6', 'text-white', 'mb-0');
        cardText.textContent = colega.nome;

        cardBodyDiv.appendChild(cardText);
        overflowDiv.appendChild(img);
        link.appendChild(overflowDiv);
        link.appendChild(cardBodyDiv);
        cardDiv.appendChild(link);
        colDiv.appendChild(cardDiv);

        colegasList.appendChild(colDiv);
    });
}

window.onload = function () {
    const githubUsername = 'GustAndradeViana';
    carregarRepositorios(githubUsername);
    carregarConteudo();
    carregarPerfil(githubUsername);
    carregarColegas();
};