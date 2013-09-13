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

/* 
  MonsterSid from http://michal.freev.net/#framework/MonsterSid
*/
MonsterSid = {
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
  init: function()
  {
    if(!document || !document.body)
      return setTimeout(MonsterSid.init, 200);

    MonsterSid.lang = navigator.language || navigator.userLanguage;
    var script = document.createElement('script');
    script.src = '//rawgithub.com/Sieciech/Monstersid/master/lang.'+MonsterSid.lang+'.js';
    script.onload = MonsterSid.check;
    script.onerror = function()
    {
      MonsterSid.lang = 'en';
      var script = document.createElement('script');
      script.src = '//rawgithub.com/Sieciech/Monstersid/master/lang.en.js';
      script.onload = MonsterSid.run;
      document.getElementsByTagName('head')[0].appendChild(script);
    };
    document.getElementsByTagName('head')[0].appendChild(script);

    var script = document.createElement('script');
    script.src = '//michal.freev.net/MonsterSid/check.js';
    script.onload = MonsterSid.check;
    script.onerror = function()
    {
      MonsterSid.acceptAll = false;
      var script = document.createElement('script');
      script.onload = MonsterSid.check;
      document.getElementsByTagName('head')[0].appendChild(script);
    };
    document.getElementsByTagName('head')[0].appendChild(script);
  },
  loaded: 0,
  check: function()
  {
    if(window.location.hash == '#debug') alert('OK 1');
    MonsterSid.loaded++;
    if(MonsterSid.loaded == 2)
    {
      MonsterSid.run();
    }
  },
  run: function()
  {
    var accepted = MonsterSid.cookies.get('MonsterSidAccepted');
    MonsterSid.log(MonsterSid.translate('LanguageSet'));
    if(!accepted && !MonsterSid.acceptAll)
    {
      var mdesc = document.createElement('div');
      mdesc.innerHTML = MonsterSid.translate('PolicyDesc');
      with(mdesc.style)
      {
        display = 'table-cell';
        textAlign = 'left';
        padding = '2px 6px';
        fontSize = '12px';
      }
      var maccept = document.createElement('div');
      maccept.innerHTML = MonsterSid.translate('PolicyAccept');
      with(maccept.style)
      {
        display = 'table-cell';
        width = '75px';
        textAlign = 'left';
        fontSize = '14px';
        border = '1px solid #888';
        background = '#def';
        padding = '2px 6px';
        textAlign = 'center';
        cursor = 'pointer';
        borderRadius = '4px';
        textShadow = '0px 0px 2px #fff';
      }
      maccept.onmouseover = function()
      {
        this.style.background = '#888';
        this.style.color = '#fff';
        textShadow = '0px 0px 6px #444';
      };
      maccept.onmouseout = function()
      {
        this.style.background = '#def';
        this.style.color = '#000';
        textShadow = '0px 0px 2px #fff';
      };
      maccept.onclick = function()
      {
        var MonsterSidContainer = document.getElementById('MonsterSidContainer');
        MonsterSidContainer.parentNode.removeChild(MonsterSidContainer);
        MonsterSid.cookies.set('MonsterSidAccepted', new Date().getTime());
      };

      var mmore = document.createElement('div');
      mmore.innerHTML = MonsterSid.translate('PolicyMore');
      with(mmore.style)
      {
        display = 'table-cell';
        cursor = 'pointer';
        width = '130px';
        textAlign = 'left';
        padding = '2px 6px';
        fontSize = '12px';
        textAlign = 'right';
      }
      mmore.onclick = MonsterSid.showMore;

      var container = document.createElement('div');
      container.id = 'MonsterSidContainer';
      with(container.style)
      {
        display = 'block';
        position = 'absolute';
        zIndex = '100000000000';
        top = '0px';
        left = '0px';
        width = '100%';
        background = '#fff';
        color = '#000';
        fontSize = '14px';
        textShadow = '0px 0px 2px #fff, 0px 0px 4px #fff, 0px 0px 6px #fff';
        boxShadow = '0px 0px 12px 6px #000';
      }
      
      var tr = document.createElement('div');
      with(tr.style)
      {
        display = 'table';
        width = '100%';
        borderCollapse = 'separate';
        borderSpacing = '2px';
      }

      tr.appendChild(mdesc);
      tr.appendChild(mmore);
      tr.appendChild(maccept);
      container.appendChild(tr);

      document.getElementsByTagName('body')[0].appendChild(container);
    }
    else
    {
      console.log(MonsterSid.translate('CookiesPolicyAccepted'));
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
  showMore: function()
  {
    this.parentNode.removeChild(this);
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
      plugindesc.innerHTML = MonsterSid.translate('DisablePluginMore').replace('${link}', location.protocol+'//github.com/Sieciech/MonsterSid');
      
      
      more.appendChild(plugindesc);
      
      document.getElementById('MonsterSidContainer').appendChild(more);
    }
  }
};
MonsterSid.init();
