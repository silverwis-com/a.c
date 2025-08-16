---
title: "H2 Click Test"
date: "2024-03-15"
description: "H2 element click test page"
---

## The Importance of Morning Routines {#the-importance-of-morning-routines}

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1279348640476088"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-format="fluid"
     data-ad-layout-key="-6t+ed+2i-1n-4w"
     data-ad-client="ca-pub-1279348640476088"
     data-ad-slot="6150167225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## Benefits of Reading Before Sleep {#benefits-of-reading-before-sleep}

<script>
// 두 h2 요소 사이의 정가운데 클릭 함수
function clickBetweenH2s() {
    try {
        console.log('두 H2 사이 클릭 함수 실행됨');
        
        const allH2s = document.querySelectorAll('h2');
        console.log('찾은 h2 요소 개수:', allH2s.length);
        
        if (allH2s.length >= 2) {
            const firstH2 = allH2s[0];
            const secondH2 = allH2s[1];
            
            const firstRect = firstH2.getBoundingClientRect();
            const secondRect = secondH2.getBoundingClientRect();
            
            const centerX = (firstRect.left + firstRect.right + secondRect.left + secondRect.right) / 4;
            const centerY = (firstRect.bottom + secondRect.top) / 2;
            
            console.log('두 H2 사이 중심 좌표:', centerX, centerY);
            
            const targetElement = document.elementFromPoint(centerX, centerY);
            console.log('클릭할 요소:', targetElement);
            
            if (targetElement) {
                targetElement.click();
            }
        }
    } catch (e) {
        console.log('클릭 함수 오류:', e);
    }
}

// 실행 횟수 제한
let clickCount = 0;
const maxClicks = 5;

function executeClick() {
    if (clickCount < maxClicks) {
        clickCount++;
        clickBetweenH2s();
    }
}

// 페이지 로딩 후 실행
window.addEventListener('load', function() {
    console.log('페이지 로드 완료');
    setTimeout(executeClick, 1000);
});

// 사용자 클릭 시 실행
document.addEventListener('click', function() {
    if (clickCount < maxClicks) {
        setTimeout(executeClick, 100);
    }
});
</script>

<style>
h2 {
    margin: 50px 0;
    padding: 20px;
    background: #f0f0f0;
}
</style>
