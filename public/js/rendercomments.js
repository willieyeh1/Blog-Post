const commentIcon = document.querySelectorAll('.comment-bubble')
const commentBtns = document.querySelectorAll('#comments')
const commentFormBtns = document.querySelectorAll('#comment-form')


const commentDisplay = (e) => {
    const postId = e.target.getAttribute('post-id');
    const commentbtn = e.target
    console.log(commentbtn)
    const comment = commentbtn.closest('#comments')
    console.log('==================================')
    



}


commentIcon.forEach((btn) => {
	btn.addEventListener('click', commentDisplay);
});
