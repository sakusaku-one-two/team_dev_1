// 画像がクリックされている間だけ画像を切り替える関数
function setupClickEffect(selector, clickImg, defaultImg, hoverImg) { // hoverImg 引数を追加
    document.body.addEventListener('mousedown', function(event) {
        if (event.target.matches(selector)) {
            event.target.src = clickImg;
        }
    });

    document.body.addEventListener('mouseup', function(event) {
        if (event.target.matches(selector)) {
            // マウスがまだ要素の上にある場合は、ホバー画像に切り替える
            event.target.src = event.target.matches(':hover') ? hoverImg : defaultImg;
        }
    });

    // クリックが外れた場合にも元の画像に戻す
    document.body.addEventListener('mouseleave', function(event) {
        if (event.target.matches(selector)) {
            event.target.src = defaultImg;
        }
    });
}

// 画像のクリック効果を設定する関数をエクスポート
export function setupAllClicks() {
    setupClickEffect('.icon-settings', 'images/icon/settings_click.png', 'images/icon/settings.png', 'images/icon/settings_hover.png');
    setupClickEffect('.icon-search', 'images/icon/search_click.png', 'images/icon/search.png', 'images/icon/search_hover.png');
    setupClickEffect('.icon-sort', 'images/icon/sort_click.png', 'images/icon/sort.png', 'images/icon/sort_hover.png');
    setupClickEffect('.icon-edit', 'images/icon/edit_click.png', 'images/icon/edit.png', 'images/icon/edit_hover.png');
    setupClickEffect('.icon-check-box', 'images/icon/check_box_click.png', 'images/icon/check_box.png', 'images/icon/check_box_hover.png');
    setupClickEffect('.icon-btn-1', 'images/icon/btn_1_click.png', 'images/icon/btn_1.png', 'images/icon/btn_1_hover.png');
    setupClickEffect('.icon-btn-2', 'images/icon/btn_2_click.png', 'images/icon/btn_2.png', 'images/icon/btn_2_hover.png');
    setupClickEffect('.icon-btn-3', 'images/icon/btn_3_click.png', 'images/icon/btn_3.png', 'images/icon/btn_3_hover.png');
    setupClickEffect('.icon-create-edit-btn', 'images/icon/create_edit_btn_click.png', 'images/icon/create_edit_btn.png', 'images/icon/create_edit_btn_hover.png');
    setupClickEffect('.icon-refresh', 'images/icon/refresh_click.png', 'images/icon/refresh.png', 'images/icon/refresh_hover.png');
    setupClickEffect('.icon-trash', 'images/icon/trash_click.png', 'images/icon/trash.png', 'images/icon/trash_hover.png'); 
}