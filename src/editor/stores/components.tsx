/*
 * @Author: stephenHe
 * @Date: 2025-01-15 16:45:19
 * @LastEditors: stephenHe
 * @LastEditTime: 2025-01-15 18:12:14
 * @Description: 保存全局的组件json数据
 * @FilePath: /lowcode-editor/src/editor/stores/components.tsx
 */

import { create } from "zustand";

export interface Component {
  id: number;
  name: string;
  props: any;
  children?: Component[];
  parentId?: number;
}

interface State {
  components: Component[];
}

interface Action {
  addComponent: (component: Component, parentId?: number) => void;
  deleteComponent: (componentId: number) => void;
  updateComponentProps: (componentId: number, props: any) => void;
}

export const useComponentsStore = create<State & Action>((set, get) => ({
  // 保存全局的组件json数据
  components: [
    {
      id: 1,
      name: "Page",
      props: {},
      desc: "页面",
      children: [
        {
          id: 222,
          name: "Container",
          props: {},
          children: [],
          parentId: 1,
        },
      ],
    },
  ],
  // 新增的时候必须要传入一个组件对象，和他的父组件id
  // 1：通过parentId找到父组件，然后把当前组件添加到父组件的children中
  // 2：如果没有parentId，直接把组件添加到components中
  addComponent: (component, parentId) =>
    set((state) => {
      if (parentId) {
        const parentComponent = getComponentById(parentId, state.components);

        if (parentComponent) {
          if (parentComponent.children) {
            // 如果有children，就放在children的最后
            parentComponent.children.push(component);
          } else {
            // 如果没有children，就创建一个children，就是传入的component
            parentComponent.children = [component];
          }
        }

        // 将传入的组件的parentId设置为传入的parentId，必须要有这个操作，否则无法找到父组件
        component.parentId = parentId;
        return { components: [...state.components] };
      }
      return { components: [...state.components, component] };
    }),
  deleteComponent: (componentId) => {
    if (!componentId) return;

    const component = getComponentById(componentId, get().components);
    if (component?.parentId) {
      const parentComponent = getComponentById(
        component.parentId,
        get().components
      );

      if (parentComponent) {
        // 删除掉当前组件，通过componentId
        parentComponent.children = parentComponent?.children?.filter(
          (item) => item.id !== +componentId
        );

        set({ components: [...get().components] });
      }
    }
  },
  updateComponentProps: (componentId, props) =>
    set((state) => {
      const component = getComponentById(componentId, state.components);
      if (component) {
        component.props = { ...component.props, ...props };

        return { components: [...state.components] };
      }

      return { components: [...state.components] };
    }),
}));

// 递归，通过id查找组件 组件是个树形结构 也就是上面的Component
export function getComponentById(
  id: number | null,
  components: Component[]
): Component | null {
  if (!id) return null;

  for (const component of components) {
    if (component.id == id) return component;
    if (component.children && component.children.length > 0) {
      const result = getComponentById(id, component.children);
      if (result !== null) return result;
    }
  }
  return null;
}
