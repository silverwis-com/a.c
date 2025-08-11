// 전역 변수
let isMenuOpen = false;

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// 앱 초기화
function initializeApp() {
    setupEventListeners();
    setupThemeToggle();
    setupSearch();
    setupMobileMenu();
    
    // 페이지 로드 애니메이션
    animateOnLoad();
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 모바일 메뉴 토글
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // 검색 폼 제출
    const searchForm = document.querySelector('.search');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }
    
    // 카테고리 호버 효과
    setupCategoryHover();
    
    // 스크롤 이벤트
    window.addEventListener('scroll', handleScroll);
    
    // 리사이즈 이벤트
    window.addEventListener('resize', handleResize);
}

// 테마 토글 설정
function setupThemeToggle() {
    // 시스템 테마 감지
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 초기 테마 설정
    updateTheme(prefersDark.matches);
    
    // 테마 변경 감지
    prefersDark.addListener((e) => {
        updateTheme(e.matches);
    });
}

// 테마 업데이트
function updateTheme(isDark) {
    const html = document.documentElement;
    
    if (isDark) {
        html.setAttribute('data-phocus-theme', 'dark');
    } else {
        html.setAttribute('data-phocus-theme', 'light');
    }
}

// 검색 기능 설정
function setupSearch() {
    const searchInput = document.getElementById('search');
    
    if (searchInput) {
        // 검색 입력 이벤트
        searchInput.addEventListener('input', debounce(handleSearchInput, 300));
        
        // 엔터 키 이벤트
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value);
            }
        });
    }
}

// 검색 입력 처리
function handleSearchInput(e) {
    const query = e.target.value.trim();
    
    if (query.length > 2) {
        // 검색 제안 표시 (실제 구현 시 API 호출)
        showSearchSuggestions(query);
    } else {
        hideSearchSuggestions();
    }
}

// 검색 실행
function performSearch(query) {
    if (!query.trim()) return;
    
    console.log('검색어:', query);
    // 실제 검색 로직 구현
    // 예: window.location.href = `/search?q=${encodeURIComponent(query)}`;
}

// 검색 폼 제출 처리
function handleSearch(e) {
    e.preventDefault();
    const searchInput = document.getElementById('search');
    if (searchInput) {
        performSearch(searchInput.value);
    }
}

// 검색 제안 표시
function showSearchSuggestions(query) {
    // 실제 구현 시 검색 제안 API 호출 후 UI 표시
    console.log('검색 제안 표시:', query);
}

// 검색 제안 숨김
function hideSearchSuggestions() {
    // 검색 제안 UI 숨김
    console.log('검색 제안 숨김');
}

// 모바일 메뉴 설정
function setupMobileMenu() {
    // 초기 상태 설정
    updateMobileMenuState();
}

// 모바일 메뉴 토글
function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    updateMobileMenuState();
}

// 모바일 메뉴 상태 업데이트
function updateMobileMenuState() {
    const menu = document.querySelector('.menu');
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    
    if (menu && mobileMenuBtn) {
        if (isMenuOpen) {
            menu.classList.add('menu-open');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
            mobileMenuBtn.innerHTML = '<span>닫기</span>';
        } else {
            menu.classList.remove('menu-open');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.innerHTML = '<span>메뉴</span>';
        }
    }
}

// 카테고리 호버 효과 설정
function setupCategoryHover() {
    const categoryItems = document.querySelectorAll('.tt_category > li');
    
    categoryItems.forEach(item => {
        const categoryList = item.querySelector('.category_list');
        
        if (categoryList) {
            item.addEventListener('mouseenter', () => {
                categoryList.style.display = 'block';
            });
            
            item.addEventListener('mouseleave', () => {
                categoryList.style.display = 'none';
            });
        }
    });
}

// 스크롤 처리
function handleScroll() {
    const header = document.getElementById('header');
    const scrollY = window.scrollY;
    
    if (header) {
        if (scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }
    
    // 스크롤 시 애니메이션 트리거
    animateOnScroll();
}

// 리사이즈 처리
function handleResize() {
    const width = window.innerWidth;
    
    // 데스크톱 크기일 때 모바일 메뉴 닫기
    if (width > 768 && isMenuOpen) {
        isMenuOpen = false;
        updateMobileMenuState();
    }
}

// 페이지 로드 애니메이션
function animateOnLoad() {
    const posts = document.querySelectorAll('.post-item');
    
    posts.forEach((post, index) => {
        setTimeout(() => {
            post.classList.add('animate-in');
        }, index * 100);
    });
}

// 스크롤 애니메이션
function animateOnScroll() {
    const elements = document.querySelectorAll('.post-item');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('in-view');
        }
    });
}

// 디바운스 함수
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 유틸리티 함수들
const Utils = {
    // 로컬 스토리지 관련
    storage: {
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                console.error('Local storage error:', error);
            }
        },
        
        get(key) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (error) {
                console.error('Local storage error:', error);
                return null;
            }
        },
        
        remove(key) {
            try {
                localStorage.removeItem(key);
            } catch (error) {
                console.error('Local storage error:', error);
            }
        }
    },
    
    // 날짜 포맷팅
    formatDate(date) {
        const options = { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit' 
        };
        return new Date(date).toLocaleDateString('ko-KR', options);
    },
    
    // 텍스트 트런케이션
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    }
};

// API 관련 함수들 (실제 구현 시 사용)
const API = {
    // 포스트 목록 가져오기
    async getPosts(page = 1, limit = 10) {
        try {
            // 실제 API 엔드포인트로 변경
            const response = await fetch(`/api/posts?page=${page}&limit=${limit}`);
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            return { posts: [], error: error.message };
        }
    },
    
    // 검색
    async search(query, page = 1) {
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&page=${page}`);
            return await response.json();
        } catch (error) {
            console.error('Search API Error:', error);
            return { posts: [], error: error.message };
        }
    }
};

// 전역으로 내보내기 (필요 시)
window.BlogApp = {
    Utils,
    API,
    toggleMobileMenu,
    performSearch
};