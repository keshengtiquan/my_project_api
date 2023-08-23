/**
 * 根据parentid 查找当前节点的所有父级节点
 * @param parentId 当前节点的parentid
 * @param uniqueId 根据那个字段来匹配
 * @param tree 当前的树数据
 * @returns
 */
export const getParentIds = (
  parentId: number,
  uniqueId: string,
  tree: any[],
) => {
  const deptMap = tree.reduce((map, item) => {
    if (!map[item[uniqueId]]) {
      map[item[uniqueId]] = item.parent_id;
    }
    return map;
  }, {});

  const parentIds: number[] = [];

  function findParents(parentId: number) {
    if (deptMap[parentId]) {
      parentIds.push(deptMap[parentId]);
      findParents(deptMap[parentId]);
    }
  }
  findParents(parentId);
  parentIds.push(parentId);
  return parentIds;
};

/**
 * @description 构造树型结构数据
 * @param data 数据源
 * @param id id字段 默认id
 * @param parentId 父节点字段，默认parentId
 * @param children 子节点字段，默认children
 * @returns 追加字段后的树
 */
export const handleTree = (
  data: any[],
  id?: string,
  parentId?: string,
  children?: string,
): any => {
  if (!Array.isArray(data)) {
    console.warn('data must be an array');
    return [];
  }
  const config = {
    id: id || 'id',
    parentId: parentId || 'parent_id',
    childrenList: children || 'children',
  };

  const childrenListMap: any = {};
  const nodeIds: any = {};
  const tree = [];

  for (const d of data) {
    const parentId = d[config.parentId];
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (const d of data) {
    const parentId = d[config.parentId];
    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }

  for (const t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o: Record<string, any>) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (const c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree;
};

export const buildMenuList = (data: any[]): any[] => {
  return data.map((item) => {
    const {
      path,
      children,
      redirect,
      component,
      name,
      roles,
      menu_name,
      icon,
      hidden,
      breadcrumb,
      affix,
      alwaysShow,
      activeMenu,
      keepAlive,
      menu_type,
    } = item;

    const obj: any = {
      path,
      children,
      redirect,
      component,
      name,
      meta: {
        roles: roles !== undefined ? roles : undefined,
        title: menu_name !== undefined ? menu_name : undefined,
        icon: icon !== undefined ? icon : undefined,
        hidden: hidden !== undefined ? hidden : undefined,
        hiddenBreadcrumb: breadcrumb !== undefined ? !breadcrumb : undefined,
        affix: affix !== undefined ? affix : undefined,
        alwaysShow: alwaysShow !== undefined ? alwaysShow : undefined,
        active: activeMenu !== undefined ? activeMenu : undefined,
        keepAlive: keepAlive !== undefined ? keepAlive : undefined,
        type: menu_type !== undefined ? menu_type : undefined,
      },
    };

    if (item.children && item.children.length > 0) {
      obj.children = buildMenuList(item.children);
    }

    return obj;
  });
}
