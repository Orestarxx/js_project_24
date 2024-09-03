const userDetails = new URL(location.href);
 const user = JSON.parse(userDetails.searchParams.get('data'));
 const url = new URL('https://jsonplaceholder.typicode.com/');
 let endPoints ={
     users: 'users',
     posts: 'posts'
 };
let {users,posts} = endPoints;
let section = document.getElementsByTagName('section')[0];
console.log(user);

 function userDetailsBuilder(object) {
     for (const objectKey in object) {
         if(typeof object[objectKey] === 'object'){
             userDetailsBuilder(object[objectKey]);
         }else{
             let divInfo = document.createElement('div');
             divInfo.innerHTML = `${objectKey}:<span class="userDetails">${object[objectKey]}</span>`;
            section.append(divInfo);
         }
     }
 }
 userDetailsBuilder(user);
 let postsButton = document.getElementById('postsButton');
 let postsHolder = document.getElementsByClassName('showPosts')[0];
   postsButton.onclick = function () {
       postsHolder.classList.toggle('hidePosts');
   }
 async function userPosts(userID) {
    let userPosts = await fetch(`${url}${users}/${userID}/${posts}`).then(response =>response.json());
     console.log(userPosts);
     for (const post of userPosts) {
         let postA = document.createElement('a');
         postA.href =`../postDetails/postDetails.html?data=${JSON.stringify(post)}`;
         postA.target = '_blank';
         let postDiv = document.createElement('div');
         postDiv.classList.add('postDiv');
         postDiv.classList.add('post');
         postDiv.innerText = post.title;
         postA.append(postDiv);
         postsHolder.append(postA);
     }
 }
userPosts(user.id);