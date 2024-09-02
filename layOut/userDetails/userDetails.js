const userDetails = new URL(location.href);
 const user = JSON.parse(userDetails.searchParams.get('data'));
 const url = new URL('https://jsonplaceholder.typicode.com/');
 let endPoints ={
     users: 'users',
     posts: 'posts'
 };
let {users,posts} = endPoints
console.log(user);

let section = document.getElementsByTagName('section')[0];
for (const key in user) {
 let userInfo = document.createElement('div');
 userInfo.innerHTML =`${key}:${user[key]}`

section.append(userInfo)
}
 let postsButton = document.getElementById('postsButton');
 let postsHolder = document.getElementsByClassName('showPosts')[0];
 let listOfPosts = document.getElementById('listOfPosts');

   postsButton.onclick = function () {
       postsHolder.classList.toggle('hidePosts')
   }
 async function userPosts(userID) {
    let userPosts = await fetch(`${url}${users}/${userID}/${posts}`).then(response =>response.json());
     console.log(userPosts);
     for (const post of userPosts) {
         let postA = document.createElement('a');
         postA.href =`../postDetails/postDetails.html?data=${JSON.stringify(post)}`;
         postA.target = '_blank';
         let postLi = document.createElement('li');
         postLi.innerText = post.title;
         postA.append(postLi);
         listOfPosts.append(postA);
     }


 }
userPosts(user.id)