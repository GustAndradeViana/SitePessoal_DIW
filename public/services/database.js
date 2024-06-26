export class Database {
    constructor() {
        this.urlConteudoSugerido = "http://localhost:3000/conteudoSugerido";
        this.urlColegasDeTrabalho = "http://localhost:3000/colegasDeTrabalho";
        this.urlLinks = "http://localhost:3000/links";
    }

    async getConteudoSugerido() {
        try {
            const resposta = await fetch(this.urlConteudoSugerido);
            if (!resposta.ok) {
                throw new Error('Erro ao obter quizzes');
            }
            return resposta.json();
        } catch (error) {
            console.error('Erro ao obter quizzes:', error);
            throw error;
        }
    }

    async getColegasDeTrabalho() {
        try {
            const resposta = await fetch(this.urlColegasDeTrabalho);
            if (!resposta.ok) {
                throw new Error('Erro ao obter quizzes');
            }
            return resposta.json();
        } catch (error) {
            console.error('Erro ao obter quizzes:', error);
            throw error;
        }
    }

    async getLinks() {
        try {
            const resposta = await fetch(this.urlLinks);
            if (!resposta.ok) {
                throw new Error('Erro ao obter quizzes');
            }
            return resposta.json();
        } catch (error) {
            console.error('Erro ao obter quizzes:', error);
            throw error;
        }
    }


}