const content = document.getElementById('content')
 
// const knowledge_id = document.getElementById('knowledge_id').value

document.addEventListener('DOMContentLoaded', function () {

    var p_table_items = document.getElementById("p_table_items"); // 目次を追加する先(table of contents)

    var div = document.createElement('div'); // 作成する目次のコンテナ要素
    // .entry-content配下のh2、h3要素を全て取得する
    var matches = document.querySelectorAll('.content h2,.content h3');
    // .entry-content配下のh2、h3要素を全て取得する
    // 取得した見出しタグ要素の数だけ以下の操作を繰り返す
    matches.forEach(function (value, i) {
        // 見出しタグ要素のidを取得し空の場合は内容をidにする
        var id = value.id;
        if (id === '') {
            id = value.textContent;
            value.id = id;
        }
        // 要素がh2タグの場合
        if (value.tagName === 'H2') {
            var ul = document.createElement('ul');
            var li = document.createElement('li');
            var a = document.createElement('a');
            // 追加する<ul><li><a>タイトル</a></li></ul>を準備する
            a.innerHTML = value.textContent;
            a.href = '#' + value.id;
            a.className = "h2 sidenav-close"
            li.appendChild(a)
            ul.appendChild(li);
            // コンテナ要素である<div>の中に要素を追加する
            div.appendChild(ul);
        }
        // 要素がh3タグの場合
        if (value.tagName === 'H3') {
            var ul = document.createElement('ul');
            var li = document.createElement('li');
            var a = document.createElement('a');
            // コンテナ要素である<div>の中から最後の<li>を取得する
            var lastUl = div.lastElementChild;
            var lastLi = lastUl.lastElementChild;
            // 追加する<ul><li><a>タイトル</a></li></ul>を準備する
            a.innerHTML = '&nbsp; ->' + value.textContent;
            a.href = '#' + value.id;
            a.className = "h3 sidenav-close"
            li.appendChild(a)
            ul.appendChild(li);
            // 最後の<li>の中に要素を追加する
            lastLi.appendChild(ul);
        }
    });

    p_table_items.appendChild(div);
   
    
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems,{draggable:true,edge:'right'});
    smoothScroll();
});

const smoothScroll = () =>{
    let links = document.querySelectorAll('.item_devise a[href^="#"]');
    const speed = 200;          // スクロールスピード   
    const divisor = 100;        // 分割数
    const tolerance = 5;        // 許容誤差
    const headerHeight = 40;     // 固定ヘッダーがある場合はその高さ分ずらす
    const interval = speed/divisor;
    for(let i = 0; i < links.length; i++){
      links[i].addEventListener('click',(e)=>{
        e.preventDefault();
        let nowY = window.pageYOffset;
        const href = e.currentTarget.getAttribute('href');   //href取得
        const splitHref = href.split('#');
        const targetID = splitHref[1];
        const target = document.getElementById(targetID);  
        if( target != null){
          const targetRectTop = target.getBoundingClientRect().top;
          const targetY = targetRectTop + nowY - headerHeight;
          const minY = Math.abs((targetY - nowY)/divisor);
          doScroll(minY,nowY,targetY,tolerance,interval);
        }
      });
    }
}
  
const doScroll = (minY,nowY,targetY,tolerance,interval) =>{
    let toY ;
    if( targetY < nowY ){
        toY = nowY - minY;
    }else{
        toY = nowY + minY;
    }
    window.scrollTo(0, toY);
    if( targetY - tolerance > toY || toY > targetY + tolerance){
    window.setTimeout(doScroll,interval,minY,toY,targetY,tolerance,interval);
    }else{
    return false;
    }
}
