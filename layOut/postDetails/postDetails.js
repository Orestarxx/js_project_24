let postDetails = new URL(location.href);
let post = JSON.parse(postDetails.searchParams.get('data'))
console.log(post);
let url = new URL('https://jsonplaceholder.typicode.com');
let endpoints = {
    posts:'/posts',
    comments:'/comments'
};
let infoPost = document.getElementById('postInfo');
for (const postKey in post) {
let postDiv = document.createElement('div');
postDiv.innerText = `${postKey}:${post[postKey]}`;
infoPost.append(postDiv);
}

let {posts,comments} = endpoints;
async function printComments (postId) {
    let commentsOfPost = await fetch(`${url}${posts}/${postId}${comments}`).then(response =>response.json());
    console.log(commentsOfPost);
}
printComments(post.id)