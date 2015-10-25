BrowserDetect = {
  Android: function()
  {
    return navigator.userAgent.match(/Android/i)?true:false;
  },
  BlackBerry: function()
  {
    return navigator.userAgent.match(/BlackBerry/i)?true:false;
  },
  iOS: function()
  {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i)?true:false;
  },
  Opera: function()
  {
    return navigator.userAgent.match(/Opera Mini/i)?true:false;
  },
  Windows: function()
  {
    return navigator.userAgent.match(/IEMobile/i)?true:false;
  },
  anyMobile: function()
  {
    return (BrowserDetect.Android() || BrowserDetect.BlackBerry() || BrowserDetect.iOS() || BrowserDetect.Opera() || BrowserDetect.Windows() || BrowserDetect.Mobile());
  }, 
  Mobile: function()
  {
    return navigator.userAgent.match(/Mobile/i)?true:false;
  },
  Chromium: function()
  {
    return navigator.userAgent.match(/(Chrome|Chromium)/i)?true:false;
  },
  Firefox: function()
  {
    return navigator.userAgent.match(/Firefox/i)?true:false;
  },
  Opera: function()
  {
    return navigator.userAgent.match(/Opera\//i)?true:false;
  },
  Safari: function()
  {
    return navigator.userAgent.match(/Safari/i)?true:false;
  },
  MSIE: function()
  {
    return navigator.userAgent.match(/MSIE/i)?true:false;
  }
};
var MSIE = BrowserDetect.MSIE();
/* 
  MonsterSid from http://michal.freev.net/#framework/MonsterSid
*/
MonsterSid = {
  path:  '//rawgithub.com/Sieciech/Monstersid/master/',
  theme: 'classic',
  cookies:{
    set: function(name, value, minuts)
    {
      if (minuts)
      {
        var date = new Date();
        date.setTime(date.getTime()+(minuts*60000));
        var expires = '; expires='+date.toGMTString();
      }
      else
      {
        var expires = '';
      }
      document.cookie = name+'='+escape(value)+expires;
    },
    get: function(name)
    {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i<ca.length;i++)
      {
        var c = ca[i];
        while (c.charAt(0)==' ')
        {
          c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0)
        {
          return unescape(c.substring(nameEQ.length,c.length));
        }
      }
      return null;
    },
    del: function(name)
    {
      page.cookies.set(name, '', -1);
    }
  },
  lang: 'en',
  translate: function(txt)
  {
    if(txt in MonsterSid.translates)
      return MonsterSid.translates[txt];
    else
      return 'Translation not found';
  },
  log: function(t)
  {
    if(!MonsterSid.debugMode) return;
    console.log('MonsterSid:', t);
  },
  debugMode: false,
  setDefaults: function()
  {
    if(typeof(MonsterHeight) == 'undefined')
      MonsterHeight = 0.3;
    else if(MonsterHeight == false)
      MonsterHeight = false;
    else if(MonsterHeight > 1)
      MonsterHeight = 1;
    else if(MonsterHeight < 0.05)
      MonsterHeight = 0.05;
  },
  init: function(theme)
  {
    if(theme)
      MonsterSid.theme = theme;
    if(!document || !document.body)
      return setTimeout(MonsterSid.init, 200);

    MonsterSid.lang = navigator.language || navigator.userLanguage;
    var script = document.createElement('script');
    script.src = MonsterSid.path+'lang/'+MonsterSid.lang+'.js';
    script.onerror = function()
    {
      MonsterSid.lang = 'en';
      var script = document.createElement('script');
      script.src = MonsterSid.path+'lang/en.js';
      document.getElementsByTagName('head')[0].appendChild(script);
    };
    document.getElementsByTagName('head')[0].appendChild(script);

    var script = document.createElement('script');
    script.src = MonsterSid.path+'theme/'+MonsterSid.theme+'/'+MonsterSid.theme+'.js';
    script.onerror = function()
    {
      var script = document.createElement('script');
      script.src = MonsterSid.path+'/old/old.js';
      document.getElementsByTagName('head')[0].appendChild(script);
    };
    document.getElementsByTagName('head')[0].appendChild(script);

    var script = document.createElement('script');
    script.src = '//michal.freev.net/MonsterSid/check.js';
    script.onerror = function()
    {
      MonsterSid.acceptAll = false;
    };
    document.getElementsByTagName('head')[0].appendChild(script);
  },
  loaded: 0,
  check: function()
  {
    MonsterSid.loaded++;
    if(MonsterSid.loaded == 3)
    {
      MonsterSid.setDefaults();
      MonsterSid.run();
    }
  },
  bccpet: function(t)
  {
    if(MonsterSid.acceptAll)
    {
      t.innerHTML = MonsterSid.translate('DisablePluginAccept');
      var url = '//michal.freev.net/MonsterSid/reject.js';
      MonsterSid.acceptAll = false;
    }
    else
    {
      t.innerHTML = MonsterSid.translate('DisablePluginReject');
      var url = '//michal.freev.net/MonsterSid/accept.js';
      MonsterSid.acceptAll = true;
    }
    var s = document.createElement('script');
    s.src = url;
    s.onerror = function()
    {
      alert(MonsterSid.translate('ErrorAcceptAll'));
    };
    document.head.appendChild(s);
  },
  showLess: function()
  {
    var um = document.getElementById('MonsterSidMoreButton');
    um.innerHTML = MonsterSid.translate('PolicyMore');
    um.onclick = MonsterSid.showLess;
    var more = document.getElementById('MonsterSidMoreContainer');
    if(more)
      more.style.display = 'none';
    um.onclick = MonsterSid.showMore;
  },
  insertMore: function(container, desc)
  {
    return container.appendChild(desc);
  },
  showMore: function()
  {
    var um = document.getElementById('MonsterSidMoreButton');
    um.innerHTML = MonsterSid.translate('HideText');
    um.onclick = MonsterSid.showLess;
    var more = document.getElementById('MonsterSidMoreContainer');
    if(more)
    {
      more.style.display = 'block';
    }
    else
    {
      switch(true)
      {
        case BrowserDetect.Chromium():
          var browserName = 'Chromium / Google Chrome';
          var browserText = 'DisableChromium';
        break;

        case BrowserDetect.Firefox():
          var browserName = 'Mozilla Firefox';
          var browserText = 'DisableFirefox';
        break;

        case BrowserDetect.Opera():
          var browserName = 'Opera';
          var browserText = 'DisableOpera';
        break;

        case BrowserDetect.Safari():
          var browserName = 'Safari';
          var browserText = 'DisableSafari';
        break;

        case BrowserDetect.MSIE():
          var browserName = 'Microsoft Internet Explorer';
          var browserText = 'DisableMSIE';
        break;

        case BrowserDetect.any():
          var browserName = 'mobilnej';
          var browserText = 'DisableMobile';
        break;

        default:
          var browserName = 'Chromium / Google Chrome';
          var browserText = 'DisableChromium';
        break;
      }

      var title = document.createElement('div');
      with(title.style)
      {
        fontSize = '20px';
        fontWeight = 'bold';
      }
      title.innerHTML = MonsterSid.translate('DisableTitle');

      var desc = document.createElement('div');
      with(desc.style)
      {
        fontSize = '12px';
        fontStyle = 'italic';
        padding = '0px 20px 20px 20px';
      }
      desc.innerHTML = MonsterSid.translate('DisableDesc');

      var btitle = document.createElement('div');
      with(btitle.style)
      {
        fontSize = '20px';
        fontWeight = 'bold';
      }
      btitle.innerHTML = MonsterSid.translate('DisableBrowser').replace('${browser}', browserName);

      var bdesc = document.createElement('div');
      with(bdesc.style)
      {
        fontSize = '12px';
        fontStyle = 'italic';
        padding = '0px 20px 20px 20px';
      }
      bdesc.innerHTML = MonsterSid.translate(browserText);
      
      var ptitle = document.createElement('div');
      with(ptitle.style)
      {
        fontSize = '20px';
        fontWeight = 'bold';
      }
      ptitle.innerHTML = MonsterSid.translate('DisablePluginTitle');

      var pdesc = document.createElement('div');
      with(pdesc.style)
      {
        fontSize = '12px';
        fontStyle = 'italic';
        padding = '0px 20px 20px 20px';
      }
      pdesc.innerHTML = MonsterSid.translate('DisablePluginDesc').replace('${accept}', MonsterSid.acceptAll?MonsterSid.translate('DisablePluginReject'):MonsterSid.translate('DisablePluginAccept'));
      var more = document.createElement('div');
      more.id = 'MonsterSidMoreContainer';
      with(more.style)
      {
        padding = '10px';
        borderTop = '1px solid #000';
        background = '#fff';
      }
      more.appendChild(title);
      more.appendChild(desc);
      more.appendChild(btitle);
      more.appendChild(bdesc);
      more.appendChild(ptitle);
      more.appendChild(pdesc);
      
      var plugindesc = document.createElement('div');
      with(plugindesc.style)
      {
        fontSize = '12px';
        fontStyle = 'italic';
        padding = '0px 20px 20px 20px';
      }
      plugindesc.innerHTML = MonsterSid.putText('${link}', 'https://github.com/Sieciech/MonsterSid', MonsterSid.translate('DisablePluginMore'));
      
      
      more.appendChild(plugindesc);
      MonsterSid.insertMore(document.getElementById('MonsterSidContainer'), more);
      //.appendChild(more);
    }
    more.style.overflow = 'auto';
    if(MonsterHeight !== false)
      more.style['max-height'] = Math.round(window.innerHeight*MonsterHeight)+'px';
  },
  putText: function(a,b,c)
  {
    while(c.indexOf(a) != -1)
    {
      c = c.replace(a,b);
    }
    return c;
  },
};
var theme = (typeof(MonsterTheme) == 'undefined')?'old':MonsterTheme;
switch(window.location.host)
{
  case 'fufle.net':
    var theme = 'fufel';
  break;
  
  case 'zspswiecie':
    var theme = 'zspworld-up';
  break;
}

MonsterSid.init(theme);
