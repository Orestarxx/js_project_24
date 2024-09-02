let url =  new URL('https://jsonplaceholder.typicode.com/');
 let navigation = document.getElementsByTagName('nav')[0];
console.log(navigation);

async function fetchUsers (pushedPlace) {
 const users = await fetch(`${url}users`).then(response => response.json())
    for (const user of users) {
     let userDiv = document.createElement('div');
     userDiv.classList.add('user');
     userDiv.innerHTML = `${user.id}-${user.name}`;
     let tegA = document.createElement('a');
     tegA.href = `../userDetails/userDetails.html?data=${JSON.stringify(user)}`;
     tegA.target = '_blank';
     let button = document.createElement('button');
     button.classList.add('detailsButton');
     button.innerText = 'details';
     tegA.append(button);
     userDiv.append(tegA);
     pushedPlace.append(userDiv);
    }
}

 fetchUsers(navigation);
