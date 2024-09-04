const userDetails = new URL(location.href);
 const user = JSON.parse(userDetails.searchParams.get('data'));
 const url = new URL('https://jsonplaceholder.typicode.com/');
 let endPoints ={
     users: 'users',
     posts: 'posts'
 };
let {users,posts} = endPoints;
let section = document.getElementsByTagName('section')[0];
 function userDetailsBuilder(object) {
     for (const objectKey in object) {
         if(typeof object[objectKey] === 'object'){
             userDetailsBuilder(object[objectKey]);
         }else{
             let divInfo = document.createElement('div');
             divInfo.classList.add('divInfo');
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
       if (postsHolder.classList.value.includes('hidePosts')){
              this.innerText = 'Show Posts';
       }else{
              this.innerText = 'Hide Posts';
       }
   }
async function userPosts(userID) {
    let userPosts = await fetch(`${url}${users}/${userID}/${posts}`).then(response =>response.json());
     for (const post of userPosts) {
         let postA = document.createElement('a');
         postA.href =`../postDetails/postDetails.html?data=${JSON.stringify(post)}`;
         postA.target = '_blank';
         let postDiv = document.createElement('div');
         postDiv.classList.add('postDiv');
         postDiv.innerText = post.title;
         postA.append(postDiv);
         postsHolder.append(postA);
     }
 }
userPosts(user.id);