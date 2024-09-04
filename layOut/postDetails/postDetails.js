let postDetails = new URL(location.href);
let post = JSON.parse(postDetails.searchParams.get('data'))
console.log(post);
let url = new URL('https://jsonplaceholder.typicode.com');
let endpoints = {
    posts:'/posts',
    comments:'/comments'
};

console.log(post.body);
let infoPost = document.getElementById('postInfoSection');
for (const postKey in post) {
    console.log(post);
let postDiv = document.createElement('div');
postDiv.innerHTML = `${postKey}:<span id="postInfo">${post[postKey]}</span>`;
infoPost.append(postDiv);
}

let {posts,comments} = endpoints;
let commentsPosts = document.getElementById('commentsOfPost');
async function printComments (postId) {
    let commentsOfPost = await fetch(`${url}${posts}/${postId}${comments}`).then(response =>response.json());
    for (const item of commentsOfPost) {
        let commentsHolder = document.createElement('div');
        commentsHolder.classList.add('comment');
        commentsPosts.append(commentsHolder)
        if(typeof item === 'object'){
            for (const itemKey in item) {
             let commentsInfo = document.createElement('div');
             commentsInfo.innerHTML = `${itemKey}:<span class="commentInfo">${item[itemKey]}</span>`;
             commentsHolder.append(commentsInfo);
            }
        }
    }
}
printComments(post.id);