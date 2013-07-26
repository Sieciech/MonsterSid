/*
isMobile from http://www.abeautifulsite.net/blog/2011/11/detecting-mobile-devices-with-javascript/
*/
isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    Mobile: function() {
        return navigator.userAgent.match(/Mobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows() || isMobile.Mobile());
    }
};
// MonsterSid from http://michal.freev.net/#framework/MonsterSid
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
  init: function()
  {
    
  },
};
