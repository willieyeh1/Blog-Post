const commentIcon = document.querySelectorAll('.comment-bubble')

function getParentNode(element, level = 1) { // 1 - default value (if no 'level' parameter is passed to the function)
    while (level-- > 0) {
      element = element.parentNode;
      if (!element) return null; // to avoid a possible "TypeError: Cannot read property 'parentNode' of null" if the requested level is higher than document
    }
    return element;
}

const commentDisplay = (e) => {
    const commentbtn = e.target
    const parentComment = getParentNode(commentbtn, 7)
    const comment = parentComment.nextElementSibling
    const commentForm = comment.nextElementSibling

    if (comment.getAttribute('id') === 'comment-form' && comment.getAttribute('style') === 'color:aliceblue') {
        comment.setAttribute('style', 'display: none !important')
    } else if (comment.getAttribute('id') === 'comments' && comment.getAttribute('style') === 'color:aliceblue') {
        comment.setAttribute('style', 'display: none !important')
        commentForm.setAttribute('style', 'display: none !important')
    } else if (comment.getAttribute('id') === 'comment-form' && comment.getAttribute('style') === 'display: none !important') {
        comment.setAttribute('style', 'color:aliceblue')
    } else if (comment.getAttribute('id') === 'comments' && comment.getAttribute('style') === 'display: none !important') {
        comment.setAttribute('style', 'color:aliceblue')
        commentForm.setAttribute('style', 'color:aliceblue')
    }

}


commentIcon.forEach((btn) => {
	btn.addEventListener('click', commentDisplay);
});
