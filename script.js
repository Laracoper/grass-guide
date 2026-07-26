document.addEventListener('DOMContentLoaded', function() {
    const copyBtn = document.getElementById('copy-btn');
    const referralText = document.getElementById('referral-text').innerText;
    const statusMsg = document.getElementById('copy-status');

    if (!copyBtn) return;

    copyBtn.addEventListener('click', () => {
        // Используем современный API браузера
        navigator.clipboard.writeText(referralText).then(() => {
            // Визуальная обратная связь
            copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2l-3.5-3.5a1 1 0 0 0-1.4 1.4l4 4a1 1 0 0 0 1.4 0l4-4a1 1 0 0 0-1.4-1.4L11 16.2V3a1 1 0 0 0-2 0v13.2z"/></svg> Готово!';
            statusMsg.textContent = 'Ссылка успешно скопирована в буфер обмена';
            statusMsg.classList.add('success');
            
            setTimeout(() => {
                copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-1.99.9-1.99 2L6 21c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V7l-4-4z"/><path d="M14 3v4h4V3h-4zm-6 0v4h4V3H8z"/></svg> Скопировать';
                statusMsg.textContent = '';
                statusMsg.classList.remove('success');
            }, 2000); // Через 2 секунды возвращаем всё как было
        }).catch(err => {
            // Если браузер заблокировал копирование (старые браузеры)
            fallbackCopyTextToClipboard(referralText);
        });
    });

    // Фоллбек для старых браузеров
    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        
        // Avoid scrolling to bottom in MS Edge.
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            statusMsg.textContent = 'Ссылка скопирована (устаревший метод)';
            statusMsg.classList.add('success');
        } catch (err) {
            statusMsg.textContent = 'Ошибка: не удалось скопировать';
            statusMsg.classList.add('error');
        }

        document.body.removeChild(textArea);
    }
});