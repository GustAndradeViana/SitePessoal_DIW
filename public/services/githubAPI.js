export class githubAPI {

    async getPerfil(username) {
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar dados do GitHub');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar dados do GitHub:', error);
            return null;
        }
    }

    async getRepos(username) {
        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos`);
            if (!response.ok) {
                throw new Error('Erro ao buscar dados do GitHub');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar dados do GitHub:', error);
            return null;
        }
    }

    async getRepoDetails(id) {
        try {
            const response = await fetch(`https://api.github.com/repositories/${id}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar dados do GitHub');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar dados do GitHub:', error);
            return null;
        }
    }
}