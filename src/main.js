import api from './api';

class App {
  constructor() {
    this.repositories = [];

    this.formEl = document.getElementById('repo-form');
    this.listEl = document.getElementById('repo-list');
    this.inputEl = document.querySelector('input[name=repository');

    this.registerHandlers();
  }

  registerHandlers() {
    this.formEl.onsubmit = event => this.addRepository(event);
  }

  setLoading(loading = true) {
    if (loading === true) {
      let loadingEl = document.createElement('span');
      loadingEl.appendChild(document.createTextNode('Carregando...'));
      loadingEl.setAttribute('id', 'loading');
      loadingEl.setAttribute('class', 'btn btn-warning text-light ml-3')

      this.formEl.appendChild(loadingEl);
    } else {
      document.getElementById('loading').remove();
    }
  }

  async addRepository(event) {
    event.preventDefault();

    const repoInput = this.inputEl.value;

    if (repoInput.length === 0)
      return;

    this.setLoading();


    const response = await api.get(`/users/${repoInput}`);
    const { name, company, html_url, avatar_url } = response.data;

    console.log(response);
    this.repositories.push({
      name,
      company,
      avatar_url,
      html_url
    });

    this.inputEl.value = '';

    this.render();

    this.setLoading(false);
  }
  render() {
    this.listEl.innerHTML = '';

    this.repositories.forEach(repo => {
      let imgEl = document.createElement('img');
      imgEl.setAttribute('src', repo.avatar_url);
      imgEl.setAttribute('class', 'float-left mr-3');

      let titleEl = document.createElement('strong');
      titleEl.appendChild(document.createTextNode(repo.name));

      let companyEl = document.createElement('p');
      companyEl.appendChild(document.createTextNode(repo.company));

      let linkEl = document.createElement('a');
      linkEl.setAttribute('class', 'btn btn-outline-success')
      linkEl.setAttribute('target', '_blank');
      linkEl.setAttribute('href', repo.html_url);
      linkEl.appendChild(document.createTextNode('Acessar'));

      let listItemEl = document.createElement('li');
      listItemEl.setAttribute('class', 'list-group-item clearfix mt-4')
      listItemEl.appendChild(imgEl);
      listItemEl.appendChild(titleEl);
      listItemEl.appendChild(companyEl);
      listItemEl.appendChild(linkEl);

      this.listEl.appendChild(listItemEl);

    });
  }
}

new App();