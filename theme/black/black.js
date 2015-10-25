MonsterSid.run = function()
{
  var css = document.createElement('link');
  css.setAttribute('rel', 'stylesheet');
  css.setAttribute('href', MonsterSid.path+'theme/'+MonsterSid.theme+'/'+MonsterSid.theme+'.css');
  document.head.appendChild(css);
  var accepted = MonsterSid.cookies.get('MonsterSidAccepted');
  MonsterSid.log(MonsterSid.translate('LanguageSet'));
  if(!accepted && !MonsterSid.acceptAll)
  {
    var mdesc = document.createElement('div');
    mdesc.innerHTML = MonsterSid.translate('PolicyDesc');
    with(mdesc.style)
    {
      display = 'table-cell';
      verticalAlign = 'middle';
      textAlign = 'left';
      padding = '2px 6px';
      fontSize = '12px';
    }
    var maccept = document.createElement('div');
    maccept.innerHTML = MonsterSid.translate('PolicyAccept');
    maccept.className = 'monstersid-button'+(MSIE?' monstersid-msie':'');
    /*
    with(maccept.style)
    {
      if(!MSIE)
        display = 'table-cell';
      width = '75px';
      textAlign = 'left';
      fontSize = '14px';
      border = '1px solid #888';
      background = '#eee';
      padding = '2px 6px';
      textAlign = 'center';
      cursor = 'pointer';
      borderRadius = '4px';
      textShadow = '0px 0px 2px #fff';
      verticalAlign = 'middle';
    }
    * /
    maccept.onmouseover = function()
    {
      this.style.background = '#888';
      this.style.color = '#fff';
      this.style.textShadow = '0px 0px 6px #444';
    };
    maccept.onmouseout = function()
    {
      this.style.background = '#eee';
      this.style.color = '#000';
      this.style.textShadow = '0px 0px 2px #fff';
    };
    */
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
      if(!MSIE)
        display = 'table-cell';
      cursor = 'pointer';
      width = '100px';
      whiteSpace = 'nowrap';
      textAlign = 'left';
      padding = '2px 6px';
      fontSize = '12px';
      textAlign = 'right';
      verticalAlign = 'middle';
    }
    mmore.onclick = MonsterSid.showMore;

    var container = document.createElement('div');
    container.id = 'MonsterSidContainer';
    with(container.style)
    {
      if(!MSIE)
        display = 'block';
      position = 'fixed';
      zIndex = '100000000000';
      bottom = '0px';
      left = '0px';
      width = '100%';
      color = '#fff';
      fontSize = '14px';
    }
    
    var tr = document.createElement('div');
    tr.id = 'MonsterSidHeader';
    with(tr.style)
    {
      if(!MSIE)
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
};
MonsterSid.check();
