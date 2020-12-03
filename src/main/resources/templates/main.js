(function() {
	const pesquisar = document.getElementById("pesquisar");
	const usuario = document.getElementById("usuario");
	//const url = "https://api.github.com/search/repositories?q=language:???&sort=stars&page=1"
	const url = "https://api.github.com/users";
	const client_id = "90837";
	const client_secret = "9be490c1cbed6af3dc276be6224972c951bad20e";
	const count = 6;
	const sort = "created: asc";
	
	async function getUser(user) {
		const usuarioResponse = await fetch(
		`${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`);

		const reposResponse = await fetch(
		`${url}/${user}/repos?per_page=${count}$sort=${sort}&client_id=${client_id}&client_secret=${client_secret}`);


		const usuario =  await usuarioResponse.json();
		const repos = await reposResponse.json();
		return {usuario, repos};
	}

// Essa função mostrarar o usuario em um grid com FOTO E NUMEROS DE REPOSITORIO, SEGUIDORES E SEGUINDO!!!

	function showUsuario(user) {
		console.log(user);
		usuario.innerHTML = ` <div class="row mt-3" >
	<div class="col-md-4">
		<div class="card" style="width:18em;">
		<img class="card-img-top" src="${user.avatar_url}"/>
		<ul class="list-group list-group-flush">
			<li class="list-group-item">Repositórios: <span class="badge bade-success">${user.public_repos}</span></li>
			<li class="list-group-item">Seguidores: <span class="badge bade-primary">${user.followers}</span></li>
			<li class="list-group-item">Seguindo <span class="badge bade-info"> ${user.following}</span></li>
		</ul>
			<div class="card-body">
			<a href="${user.html_url}" target="_blank" class="btn btn-dark btn-block"> Ver Perfil no GITHUB</a>
			</div>	
		</div>
	</div>
	
	<div class="col-md-8">
	 	<div id="repos"> </div> 
	 </div>
	 </div> `;

	}
	
	function mostrarRepositorio(repos){
	let output='';
	
	repos.forEach(repo =>{
	output += `<div class="card card-body mb-2">
		<div class="row">
			<div class="col-md-6">
				<a href="${repo.html_url}" target="_black">${repo.name}></a>
			</div>
			<div class="col-md-6">
				<span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
				<span class="badge badge-success"> watchs: ${repo.watchers_count}</span>
			    <span class="badge badge-warning">Forks: ${repo.forks_count}</span>
			</div>
		</div>
	</div>`
	});
	
	document.getElementById("repos").innerHTML = output; 
	
	}

	pesquisar.addEventListener("keyup", (e) => {
		const user = e.target.value;

		if (user.length > 0) {
			getUser(user).then(res => {
			 showUsuario(res.usuario)
			 mostrarRepositorio(res.repos)
			 });
		}
		
	
		
	})
})();