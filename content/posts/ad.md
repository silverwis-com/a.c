---
title: "H2 Click Test"
date: "2024-03-15"
description: "H2 element click test page"
---

## The Importance of Morning Routines {#the-importance-of-morning-routines}

## Benefits of Reading Before Sleep {#benefits-of-reading-before-sleep}

<script>
// h2 요소의 정가운데 클릭 함수
function clickH2Centers() {
    // 첫 번째 h2 클릭
    const h2Morning = document.querySelector('h2#the-importance-of-morning-routines') || 
                      document.querySelector('h2:contains("The Importance of Morning Routines")') ||
                      document.querySelector('.post h2');
    
    if (h2Morning) {
        const rect = h2Morning.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: centerX,
            clientY: centerY,
            screenX: centerX,
            screenY: centerY
        });
        h2Morning.dispatchEvent(clickEvent);
        h2Morning.click();
    }
    
    // 두 번째 h2 클릭
    const h2Sleep = document.querySelector('h2#benefits-of-reading-before-sleep') ||
                    document.querySelector('h2:contains("Benefits of Reading Before Sleep")') ||
                    document.querySelectorAll('.post h2')[1];
    
    if (h2Sleep) {
        const rect = h2Sleep.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: centerX,
            clientY: centerY,
            screenX: centerX,
            screenY: centerY
        });
        h2Sleep.dispatchEvent(clickEvent);
        h2Sleep.click();
    }
}

// 페이지 로딩 후 자동 실행 - h2 클릭만
window.addEventListener('load', function() {
    // h2 요소들 클릭
    setTimeout(() => {
        clickH2Centers();
    }, 500);
    
    // 1초 후 다시 시도
    setTimeout(() => {
        clickH2Centers();
    }, 1000);
});
</script>

<style>
h2 {
    margin: 50px 0;
    padding: 20px;
    background: #f0f0f0;
}
</style>
