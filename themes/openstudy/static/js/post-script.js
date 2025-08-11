// 포스트 상세 페이지 전용 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializePostPage();
});

function initializePostPage() {
    setupPostActions();
    setupComments();
    setupReadingProgress();
    setupSocialShare();
    setupCopyLink();
    setupImageModal();
}

// 포스트 액션 설정
function setupPostActions() {
    const likeBtn = document.querySelector('.like-btn');
    const shareBtn = document.querySelector('.share-btn');
    
    if (likeBtn) {
        likeBtn.addEventListener('click', handleLike);
    }
    
    if (shareBtn) {
        shareBtn.addEventListener('click', handleShare);
    }
}

// 좋아요 처리
function handleLike(e) {
    e.preventDefault();
    const btn = e.currentTarget;
    const countElement = btn.querySelector('.count');
    const currentCount = parseInt(countElement.textContent) || 0;
    
    // 애니메이션 효과
    btn.classList.add('liked');
    setTimeout(() => {
        btn.classList.remove('liked');
    }, 300);
    
    // 카운트 업데이트 (실제로는 서버 API 호출)
    countElement.textContent = currentCount + 1;
    
    // 로컬 스토리지에 좋아요 상태 저장
    const postId = getPostId();
    Utils.storage.set(`liked_${postId}`, true);
}

// 공유 처리
function handleShare(e) {
    e.preventDefault();
    
    if (navigator.share) {
        // Web Share API 사용
        navigator.share({
            title: document.title,
            text: document.querySelector('meta[name="description"]').content,
            url: window.location.href
        });
    } else {
        // 폴백: 공유 모달 표시
        showShareModal();
    }
}

// 공유 모달 표시
function showShareModal() {
    const modal = createShareModal();
    document.body.appendChild(modal);
    
    // 모달 표시 애니메이션
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });
    
    // 모달 닫기
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('close-modal')) {
            closeModal(modal);
        }
    });
}

// 공유 모달 생성
function createShareModal() {
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>포스트 공유</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="share-options">
                    <button class="share-option" data-platform="twitter">
                        <i class="icon-twitter"></i>
                        트위터
                    </button>
                    <button class="share-option" data-platform="facebook">
                        <i class="icon-facebook"></i>
                        페이스북
                    </button>
                    <button class="share-option" data-platform="copy">
                        <i class="icon-link"></i>
                        링크 복사
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // 공유 옵션 이벤트 리스너
    modal.querySelectorAll('.share-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const platform = e.currentTarget.dataset.platform;
            handleSocialShare(platform);
        });
    });
    
    return modal;
}

// 소셜 공유 처리
function handleSocialShare(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const description = encodeURIComponent(document.querySelector('meta[name="description"]').content);
    
    let shareUrl = '';
    
    switch (platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'copy':
            copyToClipboard(window.location.href);
            showToast('링크가 복사되었습니다!');
            return;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// 댓글 기능 설정
function setupComments() {
    const commentForm = document.querySelector('.comment-form');
    const loadMoreBtn = document.querySelector('.load-more-comments');
    
    if (commentForm) {
        commentForm.addEventListener('submit', handleCommentSubmit);
    }
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreComments);
    }
    
    // 댓글 액션 설정
    setupCommentActions();
}

// 댓글 제출 처리
function handleCommentSubmit(e) {
    e.preventDefault();
    const textarea = e.target.querySelector('textarea');
    const content = textarea.value.trim();
    
    if (!content) {
        showToast('댓글 내용을 입력해주세요.');
        return;
    }
    
    // 실제로는 서버에 댓글 전송
    addComment({
        author: '익명',
        content: content,
        date: new Date().toISOString(),
        avatar: 'https://via.placeholder.com/40x40'
    });
    
    textarea.value = '';
    showToast('댓글이 등록되었습니다!');
}

// 댓글 추가
function addComment(comment) {
    const commentsList = document.querySelector('.comments-list');
    const commentElement = createCommentElement(comment);
    
    // 새 댓글을 맨 위에 추가
    commentsList.insertBefore(commentElement, commentsList.firstChild);
    
    // 애니메이션 효과
    commentElement.style.opacity = '0';
    commentElement.style.transform = 'translateY(-20px)';
    
    requestAnimationFrame(() => {
        commentElement.style.transition = 'all 0.3s ease';
        commentElement.style.opacity = '1';
        commentElement.style.transform = 'translateY(0)';
    });
}

// 댓글 요소 생성
function createCommentElement(comment) {
    const div = document.createElement('div');
    div.className = 'comment-item';
    div.innerHTML = `
        <div class="comment-avatar">
            <img src="${comment.avatar}" alt="${comment.author}">
        </div>
        <div class="comment-content">
            <div class="comment-header">
                <span class="comment-author">${comment.author}</span>
                <span class="comment-date">${Utils.formatDate(comment.date)}</span>
            </div>
            <p class="comment-text">${comment.content}</p>
            <div class="comment-actions">
                <button class="reply-btn">답글</button>
                <button class="like-btn">좋아요 0</button>
            </div>
        </div>
    `;
    
    return div;
}

// 댓글 액션 설정
function setupCommentActions() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('reply-btn')) {
            handleReply(e);
        } else if (e.target.classList.contains('like-btn') && e.target.closest('.comment-actions')) {
            handleCommentLike(e);
        }
    });
}

// 답글 처리
function handleReply(e) {
    const commentItem = e.target.closest('.comment-item');
    const author = commentItem.querySelector('.comment-author').textContent;
    
    // 댓글 입력창으로 포커스 이동
    const textarea = document.querySelector('.comment-form textarea');
    textarea.value = `@${author} `;
    textarea.focus();
}

// 댓글 좋아요 처리
function handleCommentLike(e) {
    const btn = e.target;
    const currentText = btn.textContent;
    const count = parseInt(currentText.match(/\d+/)[0]) || 0;
    
    btn.textContent = `좋아요 ${count + 1}`;
    btn.style.color = '#007bff';
}

// 더 많은 댓글 로드
function loadMoreComments() {
    // 실제로는 서버에서 댓글 데이터 가져옴
    const dummyComments = [
        {
            author: '사용자3',
            content: '추가로 로드된 댓글입니다.',
            date: new Date().toISOString(),
            avatar: 'https://via.placeholder.com/40x40'
        }
    ];
    
    dummyComments.forEach(comment => addComment(comment));
    
    showToast('댓글을 불러왔습니다.');
}

// 읽기 진행률 표시
function setupReadingProgress() {
    const progressBar = createProgressBar();
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', updateReadingProgress);
}

// 진행률 바 생성
function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    
    // CSS 스타일 추가
    const style = document.createElement('style');
    style.textContent = `
        .reading-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: rgba(0,0,0,0.1);
            z-index: 1000;
        }
        .progress-fill {
            height: 100%;
            background: #007bff;
            width: 0%;
            transition: width 0.1s ease;
        }
    `;
    document.head.appendChild(style);
    
    return progressBar;
}

// 읽기 진행률 업데이트
function updateReadingProgress() {
    const article = document.querySelector('.post-detail');
    if (!article) return;
    
    const articleRect = article.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const articleHeight = article.offsetHeight;
    
    let progress = 0;
    
    if (articleRect.top < 0) {
        const visibleHeight = Math.min(articleHeight + articleRect.top, windowHeight);
        progress = Math.max(0, visibleHeight / articleHeight);
    }
    
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = `${progress * 100}%`;
    }
}

// 이미지 모달 설정
function setupImageModal() {
    const images = document.querySelectorAll('.content-body img, .featured-image img');
    
    images.forEach(img => {
        img.addEventListener('click', () => {
            showImageModal(img.src, img.alt);
        });
        img.style.cursor = 'pointer';
    });
}

// 이미지 모달 표시
function showImageModal(src, alt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-backdrop">
            <div class="modal-content">
                <img src="${src}" alt="${alt}">
                <button class="close-modal">&times;</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 스타일 추가
    const style = document.createElement('style');
    style.textContent = `
        .image-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .image-modal.show {
            opacity: 1;
        }
        .image-modal .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        .image-modal img {
            max-width: 100%;
            max-height: 100%;
            border-radius: 8px;
        }
        .image-modal .close-modal {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 30px;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
    
    // 애니메이션
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });
    
    // 닫기 이벤트
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('close-modal')) {
            closeModal(modal);
        }
    });
}

// 모달 닫기
function closeModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.remove();
    }, 300);
}

// 링크 복사
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        // 폴백
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

// 토스트 메시지 표시
function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // 스타일 추가
    const style = document.createElement('style');
    style.textContent = `
        .toast {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #007bff;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 1000;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
        }
        .toast.show {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(toast);
    
    // 애니메이션
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });
    
    // 자동 제거
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}

// 포스트 ID 가져오기
function getPostId() {
    // URL이나 다른 방법으로 포스트 ID 추출
    const pathParts = window.location.pathname.split('/');
    return pathParams[pathParams.length - 1] || 'default';
}

// 소셜 공유 설정
function setupSocialShare() {
    // 실제 구현에서는 각 플랫폼별 SDK 로드 등 추가 작업 필요
}

// 링크 복사 설정
function setupCopyLink() {
    // Ctrl+C 또는 우클릭 등의 추가 복사 기능
}

// CSS 애니메이션 추가
const additionalStyles = `
    .liked {
        animation: likeAnimation 0.3s ease;
    }
    
    @keyframes likeAnimation {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// 스타일 시트에 추가
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);