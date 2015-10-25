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
    mdesc.id = 'MonsterSidPolicyDesc';
    mdesc.innerHTML = MonsterSid.translate('PolicyDesc');
    var maccept = document.createElement('div');
    maccept.innerHTML = MonsterSid.translate('PolicyAccept');
    maccept.id = 'MonsterSidPolicyAccept';
    maccept.className = 'monstersid-button';
    if(MSIE)
      maccept.style.display = 'block';
    maccept.onclick = function()
    {
      var MonsterSidContainer = document.getElementById('MonsterSidContainer');
      MonsterSidContainer.parentNode.removeChild(MonsterSidContainer);
      MonsterSid.cookies.set('MonsterSidAccepted', new Date().getTime());
      
      var MonsterShadow = document.getElementById('MonsterShadow');
      MonsterShadow.parentNode.removeChild(MonsterShadow);
    };

    var mmore = document.createElement('div');
    mmore.id = 'MonsterSidMoreButton';
    mmore.innerHTML = MonsterSid.translate('PolicyMore');
    if(MSIE)
      mmore.style.display = 'block';
    mmore.onclick = MonsterSid.showMore;

    var container = document.createElement('div');
    container.id = 'MonsterSidContainer';
    if(MSIE)
      container.style.display = 'block';
    
    var tr = document.createElement('div');
    tr.id = 'MonsterSidHeader';
    if(MSIE)
      tr.style.display = 'block';
    tr.appendChild(mdesc);
    tr.appendChild(mmore);
    tr.appendChild(maccept);
    container.appendChild(tr);
    var body = document.body || document.getElementsByTagName('body')[0];
    body.insertBefore(container, body.children[0]);
    
    setTimeout(function()
    {
      var container = document.getElementById('MonsterSidContainer');
      var sh = document.createElement('div');
      sh.id = 'MonsterShadow';
      console.log(container.innerHeight);
      sh.style.height = (container.innerHeight)+'px';
      body.insertBefore(sh, body.children[0]);
    }, 100);
  }
  else
  {
    console.log(MonsterSid.translate('CookiesPolicyAccepted'));
  }
};
MonsterSid.insertMore = function(container, desc)
{
  return container.insertBefore(desc, container.children[0]);
};
MonsterSid.setDefaults = function()
{
  if(typeof(MonsterHeight) == 'undefined')
    MonsterHeight = false;
  else if(MonsterHeight == false)
    MonsterHeight = false;
  else if(MonsterHeight > 1)
    MonsterHeight = 1;
  else if(MonsterHeight < 0.05)
    MonsterHeight = 0.05;
};
MonsterSid.check();
