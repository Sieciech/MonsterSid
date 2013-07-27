/*
  isMobile from http://www.abeautifulsite.net/blog/2011/11/detecting-mobile-devices-with-javascript/
*/
isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i)?true:false;
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i)?true:false;
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i)?true:false;
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i)?true:false;
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i)?true:false;
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows() || isMobile.Mobile());
    },
    
};
/*
  isMobile.Mobile from Sieciech (michal.freev.net)
*/
isMobile.Mobile = function()
{
  return navigator.userAgent.match(/Mobile/i)?true:false;
};
isMobile.Chromium = function()
{
  return navigator.userAgent.match(/(Chrome|Chromium)/i)?true:false;
};
isMobile.Firefox = function()
{
  return navigator.userAgent.match(/Firefox/i)?true:false;
};
isMobile.Opera = function()
{
  return navigator.userAgent.match(/Opera\//i)?true:false;
};
isMobile.Safari = function()
{
  return navigator.userAgent.match(/Safari/i)?true:false;
};
isMobile.MSIE = function()
{
  return navigator.userAgent.match(/MSIE/i)?true:false;
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
    },
  },
  /*
  translates: {
    pl: {

    },
    en: {
      PolicyTitle: 'Cookies policy',
      PolicyDesc: 'We use cookies to facilitate your use of our website. Staying on the site, you agree to the use of cookies.',
      LanguegeSet: 'Set english language',
      CookiesPolicyAccepted: 'Cookies policy is accepted',
    },
  },
  */
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
  debugMode: true,
  init: function()
  {
    if(!document || !document.body)
      return setTimeout(MonsterSid.init, 200);

    MonsterSid.lang = navigator.language || navigator.userLanguage;
    var script = document.createElement('script');
    script.src = '//rawgithub.com/Sieciech/Monstersid/master/lang..'+MonsterSid.lang+'.js';
    script.onload = MonsterSid.run;
    script.onerror = function()
    {
      var script = document.createElement('script');
      MonsterSid.lang = 'en';
      script.src = '//rawgithub.com/Sieciech/Monstersid/master/lang.en.js';
      script.onload = MonsterSid.run;
      document.head.appendChild(script);
    };
    document.head.appendChild(script);
  },
  run: function()
  {
    var accepted = MonsterSid.cookies.get('MonsterSidAccepted');
    accepted = false;
    MonsterSid.log(MonsterSid.translate('LanguegeSet'));
    if(!accepted)
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

      document.body.appendChild(container);
    }
    else
    {
      console.log(MonsterSid.translate('CookiesPolicyAccepted'));
    }
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
        case isMobile.Chromium():
          var browserName = 'Chromium / Google Chrome';
          var browserText = 'DisableChromium';
        break;

        case isMobile.Firefox():
          var browserName = 'Mozilla Firefox';
          var browserText = 'DisableFirefox';
        break;

        case isMobile.Opera():
          var browserName = 'Opera';
          var browserText = 'DisableOpera';
        break;

        case isMobile.Safari():
          var browserName = 'Safari';
          var browserText = 'DisableSafari';
        break;

        case isMobile.MSIE():
          var browserName = 'Microsoft Internet Explorer';
          var browserText = 'DisableMSIE';
        break;

        case isMobile.any():
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
      pdesc.innerHTML = MonsterSid.translate('DisablePluginDesc').replace('${pluginLink}', '<a href="https://github.com/Sieciech/MonsterSid/wiki/Install" style="color:#008;text-decoradion:underline;" target="_blank">'+MonsterSid.translate('DisableClickHere')+'</a>');
      var more = document.createElement('div');
      more.id = 'MonsterSidMoreContainer';
      with(more.style)
      {
        padding = '10px';
        borderTop = '1px solid #000';
        background = '#fff url(\'http://michal.freev.net/source/sid.jpg\') bottom right no-repeat';
      }
      more.appendChild(title);
      more.appendChild(desc);
      more.appendChild(btitle);
      more.appendChild(bdesc);
      more.appendChild(ptitle);
      more.appendChild(pdesc);
      document.getElementById('MonsterSidContainer').appendChild(more);
    }
  }
};
MonsterSid.init();
