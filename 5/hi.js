function Installed(url){
		for (var i = 0; i < installedapps.AppInfo.length; i++) {
			if (url == installedapps.AppInfo[i].URL) {V_=''; break}
			else{V_='hide';};
		}
}

function install(fun) {
    const index = installedapps.AppInfo.findIndex(a => a.Id === fun.Id);
    if (index >= 0) {
        installedapps.AppInfo[index] = fun;
    } else {
        installedapps.AppInfo.push(fun);
    }
    var writedata = JSON.stringify(installedapps);
    Hisense.File.write("launcher/Appinfo.json",writedata,1);
}
