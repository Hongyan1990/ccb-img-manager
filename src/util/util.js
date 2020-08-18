const menuMap = {
  '1': {
    'title': 'App启动页',
    'id': '0',
  },
  '2': {
    'title': '首页',
    'child': {
      '1': {
        'title': '对联区',
        'child': {
          '1': {'title': '第一屏', 'id': '2'},
          '2': {'title': '第二屏', 'id': '3'},
          '3': {'title': '第三屏', 'id': '4'},
        }
      },
      '2': {
        'title': '首页底部',
        'child': {
          '1': {'title': '第一屏', 'id': '5'},
          '2': {'title': '第二屏', 'id': '6'},
          '3': {'title': '第三屏', 'id': '7'},
        }
      }
    }
  },
  '3': {
    'title': '建行',
    'child': {
      '1': {'title': 'Banner', 'id': '8'}
    }
  },
  '4': {
    'title': '员工福利',
    'child': {
      '1': {'title': 'Banner', 'id': '9'}
    }
  },
  '5': {
    'title': '要览',
    'id': '10'
  },
};
export function handleMenuText(menuId) {
  const menuArr = menuId.split('_');
  let child;
  let menus = [];
  for(let i=0; i<menuArr.length; i++) {
    if(!child) {
      menus.push(menuMap[menuArr[i]].title);
      if(menuMap[menuArr[i]].child) {
        child = menuMap[menuArr[i]].child
      }
    } else {
      menus.push(child[menuArr[i]].title);
      if(child[menuArr[i]].child) {
        child = child[menuArr[i]].child
      }
    }
  }
  return menus;
}

export function getMenuId(menuId) {
  const menuArr = menuId.split('_');
  let child;
  let id = '';
  for(let i=0; i<menuArr.length; i++) {
    if(!child) {
      if(menuMap[menuArr[i]].child) {
        child = menuMap[menuArr[i]].child
      } else {
        id = menuMap[menuArr[i]].id || '';
      }
    } else {
      if(child[menuArr[i]].child) {
        child = child[menuArr[i]].child
      } else {
        id = child[menuArr[i]].id || '';
      }
    }
  }
  return id;
}