// 画像のホバー効果を設定する一般化された関数
function setupHoverEffect(selector, hoverImg, defaultImg) {
    document.body.addEventListener('mouseover', function(event) {
        if (event.target.matches(selector)) {
            event.target.src = hoverImg;
        }
    });

    document.body.addEventListener('mouseout', function(event) {
        if (event.target.matches(selector)) {
            event.target.src = defaultImg;
        }
    });
}

// 画像のホバー効果を設定する関数をエクスポート
export function setupAllHovers() {
    setupHoverEffect('.icon-settings', 'images/icon/settings_hover.png', 'images/icon/settings.png');
    setupHoverEffect('.icon-search', 'images/icon/search_hover.png', 'images/icon/search.png');
    setupHoverEffect('.icon-sort', 'images/icon/sort_hover.png', 'images/icon/sort.png');
    setupHoverEffect('.icon-edit', 'images/icon/edit_hover.png', 'images/icon/edit.png');
    setupHoverEffect('.icon-check-box', 'images/icon/check_box_hover.png', 'images/icon/check_box.png');
    setupHoverEffect('.icon-btn-1', 'images/icon/btn_1_hover.png', 'images/icon/btn_1.png');
    setupHoverEffect('.icon-btn-2', 'images/icon/btn_2_hover.png', 'images/icon/btn_2.png');
    setupHoverEffect('.icon-btn-3', 'images/icon/btn_3_hover.png', 'images/icon/btn_3.png');
    setupHoverEffect('.icon-create-edit-btn', 'images/icon/create_edit_btn_hover.png', 'images/icon/create_edit_btn.png');
    setupHoverEffect('.icon-refresh', 'images/icon/refresh_hover.png', 'images/icon/refresh.png');
    setupHoverEffect('.icon-trash', 'images/icon/trash_hover.png', 'images/icon/trash.png');    
}