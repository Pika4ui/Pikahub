var stor = "store";
var content = '';
var V_ = 'hide';
var an = 0;

var cdn_base = 'https://pika4ui.github.io/Pikahub/4/img/';
var cdn  = cdn_base;
var cdn2 = cdn_base; 

if (typeof Hisense != 'undefined') {
    // Выполняем запрос для чтения файла 'launcher/Appinfo.json'
    const current = Hisense.File.read("launcher/Appinfo.json", 1);
    
    // Если запрос успешен (current.ret истинно), парсим содержимое msg
    // Иначе создаём объект с пустым массивом AppInfo
    var installedapps = current ? JSON.parse(current.msg) : { AppInfo: [] }; // ← исправлено: current.msg
} else {
    // Если функция Hisense не определена, создаём объект с пустым AppInfo
    var installedapps = { AppInfo: [] };
}

document.addEventListener('DOMContentLoaded', function() {
    apps.forEach(function(val, ind) {
        Installed(val['url']);
        content += `
            <div tabindex="${ind}" class="cell" id="app_${ind}">
                <div class="btn" style="background-image: url('${cdn}anb_${val['appid']}.png')" onclick="AppPos(${ind})">
                    <div id="a_${ind}" class="V ${V_}"></div>
                </div>
                <div class="text">
                    <h1>${val['name']}</h1>
                    <b>${(ind + 1)}/${apps.length}</b><br>
                    ${val['text']}<br>
                    <h2 class="ok_${ind}">── нажмите ОК для установки ──</h2>
                </div>
            </div>`;
    });
    grid.innerHTML = content;
    var sizeCell = Math.round((document.documentElement.scrollWidth / 100) * 5.85);
    document.querySelector(':root').style.setProperty('--cell', sizeCell + 'px');
    scr_ = parseFloat(getComputedStyle(document.querySelector('#grid')).height) + 20;
});

function AppPos(pos) {
    var cells = document.getElementById("a_" + pos);
    var ok = document.querySelector('.ok_' + pos);
    if (cells.classList.contains('hide')) {
        const AppJson = {
            Id: apps[pos]['name'] + "_debug",
            AppName: apps[pos]['name'],
            Title: apps[pos]['name'],
            URL: apps[pos]['url'],
            StartCommand: apps[pos]['url'],
            IconURL: cdn2 + "anb_" + apps[pos]['appid'] + ".png",
            Icon_96: cdn2 + "anb_" + apps[pos]['appid'] + ".png",
            Image: cdn2 + "anb_" + apps[pos]['appid'] + ".png",
            Thumb: cdn2 + "anb_" + apps[pos]['appid'] + ".png",
            Type: "Browser",
            InstallTime: new Date().toISOString().split('T')[0],
            RunTimes: 0,
            StoreType: stor,
            PreInstall: false
        };

        cells.classList.remove("hide");
        ok.textContent = 'для завершения установки перезагрузите ТВ';
        install(AppJson);
    }
}

document.addEventListener("keydown", function(ev) {
    switch (ev.keyCode) {

        case 8: // VK_BACK_SPACE
            window.close();
            break;

        case 406: // VK_BLUE /406 || 32
            // if (!an) { aboutTV(); }
            if (an % 2 == 0) {
                stor = "hisense";
                document.body.insertAdjacentHTML('beforeend', "<h4>│ FHD │</h4>");
            }
            an++;
            break;

        default:
            // Здесь инструкции при отсутствии соответствующего значения
            break;
    }
    ev.preventDefault();
}, false);
